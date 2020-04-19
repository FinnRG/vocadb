using System;
using System.Linq;
using System.ServiceModel;
using VocaDb.Model.Database.Queries;
using VocaDb.Model.DataContracts;
using VocaDb.Model.DataContracts.Albums;
using VocaDb.Model.DataContracts.Api;
using VocaDb.Model.DataContracts.Artists;
using VocaDb.Model.DataContracts.Songs;
using VocaDb.Model.DataContracts.Tags;
using VocaDb.Model.DataContracts.UseCases;
using VocaDb.Model.DataContracts.Users;
using VocaDb.Model.Domain.Albums;
using VocaDb.Model.Domain.Globalization;
using VocaDb.Model.Domain.PVs;
using VocaDb.Model.Domain.Security;
using VocaDb.Model.Domain.Songs;
using VocaDb.Model.Service;
using VocaDb.Model.Domain.Artists;
using VocaDb.Model.Service.Paging;
using VocaDb.Model.Service.Search;
using VocaDb.Model.Service.Search.Artists;
using VocaDb.Model.Service.Search.SongSearch;
using VocaDb.Model.Service.Search.Tags;
using VocaDb.Model.Service.Search.User;
using VocaDb.Model.Domain;

namespace VocaDb.Web.Services {

	// NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "QueryService" in code, svc and config file together.
	[ServiceContract(Namespace = Schemas.VocaDb)]
	public class QueryService {

		private readonly AlbumQueries albumQueries;
		private readonly AlbumService albumService;
		private readonly ArtistQueries artistQueries;
		private readonly ArtistService artistService;
		private readonly EntryQueries entryQueries;
		private readonly TagQueries tagQueries;
		private readonly IUserPermissionContext userPermissionContext;
		private readonly SongQueries songQueries;
		private readonly SongService songService;
		private readonly SongListQueries songListQueries;
		private readonly UserQueries userQueries;
		private readonly UserService userService;

		public QueryService(ArtistQueries artistQueries, TagQueries tagQueries, UserQueries userQueries, 
			AlbumService albumService, AlbumQueries albumQueries, ArtistService artistService, SongQueries songQueries, SongService songService, SongListQueries songListQueries, UserService userService, 
			EntryQueries entryQueries,
			IUserPermissionContext userPermissionContext) {

			this.artistQueries = artistQueries;
			this.tagQueries = tagQueries;
			this.userQueries = userQueries;
			this.albumService = albumService;
			this.albumQueries = albumQueries;
			this.artistService = artistService;
			this.songQueries = songQueries;
			this.entryQueries = entryQueries;
			this.songService = songService;
			this.songListQueries = songListQueries;
			this.userService = userService;
			this.userPermissionContext = userPermissionContext;

		}

		#region Common queries
		[OperationContract]
		public PartialFindResult<AlbumContract> FindAlbums(string term, int maxResults, 
			NameMatchMode nameMatchMode = NameMatchMode.Auto, AlbumSortRule sort = AlbumSortRule.NameThenReleaseDate) {

			return albumService.Find(SearchTextQuery.Create(term, nameMatchMode), DiscType.Unknown, 0, maxResults, true, moveExactToTop: true, sortRule: sort);

		}

		[OperationContract]
		public PartialFindResult<AlbumContract> FindAlbumsAdvanced(string term, int maxResults) {

			return albumService.FindAdvanced(term, new PagingProperties(0, maxResults, true), AlbumSortRule.Name);

		}

		[OperationContract]
		public PartialFindResult<EntryForApiContract> FindAll(string term, int maxResults, ContentLanguagePreference languagePreference) {

			return entryQueries.GetList(term, null, null, false, null, null, 0, maxResults, true, EntrySortRule.Name, 
				NameMatchMode.Auto, EntryOptionalFields.AdditionalNames, languagePreference, false);

		}

		[OperationContract]
		public PartialFindResult<ArtistContract> FindArtists(string term, int maxResults, NameMatchMode nameMatchMode = NameMatchMode.Auto) {

			return artistService.FindArtists(new ArtistQueryParams(ArtistSearchTextQuery.Create(term, nameMatchMode), new ArtistType[] {}, 0, maxResults, true, ArtistSortRule.Name, true));

		}

		[OperationContract]
		public NewSongCheckResultContract FindDuplicate(string[] names, string[] pvs, int[] artistIds, bool getPVInfo = false) {

			return songQueries.FindDuplicates(names, VocaDbUrl.External(pvs).ToArray(), artistIds, getPVInfo).Result;

		}

		[OperationContract]
		public PartialFindResult<SongWithAlbumAndPVsContract> FindSongs(string term, int maxResults, NameMatchMode nameMatchMode = NameMatchMode.Auto) {

			var sampleSize = Math.Min(maxResults * 2, 30);

			var results = songService.FindWithAlbum(new SongQueryParams(
				SearchTextQuery.Create(term, nameMatchMode), new SongType[] {}, 0, sampleSize, true, SongSortRule.Name, false, true, null), false);

			return new PartialFindResult<SongWithAlbumAndPVsContract>(results.Items.Take(maxResults).ToArray(), results.TotalCount, results.Term);

		}

		[OperationContract]
		public string[] FindTags(string term, int maxResults) {

			return tagQueries.FindNames(TagSearchTextQuery.Create(term), true, 10);

		}

		[OperationContract]
		public AlbumContract GetAlbumDetails(string term, AlbumSortRule sort = AlbumSortRule.NameThenReleaseDate) {

			var albums = albumService.Find(SearchTextQuery.Create(term), DiscType.Unknown, 0, 10, false, moveExactToTop: true, sortRule: sort);
			return albums.Items.FirstOrDefault();

		}

		[OperationContract]
		public AlbumDetailsContract GetAlbumById(int id) {

			var album = albumQueries.GetAlbumDetails(id, null);
			return album;

		}

		[OperationContract]
		public ArtistDetailsContract GetArtistDetails(string term) {

			var artists = artistService.FindArtists(new ArtistQueryParams(ArtistSearchTextQuery.Create(term), new ArtistType[] {}, 0, 10, 
				false, ArtistSortRule.Name, true));

			if (!artists.Items.Any())
				return null;

			return artistQueries.GetDetails(artists.Items[0].Id, null);

		}

		[OperationContract]
		public ArtistDetailsContract GetArtistById(int id) {

			var artist = artistQueries.GetDetails(id, null);
			return artist;

		}

		[OperationContract]
		public ArtistForApiContract[] GetArtistsWithYoutubeChannels(ContentLanguagePreference languagePreference = ContentLanguagePreference.Default) {

			return artistService.GetArtistsWithYoutubeChannels(languagePreference);

		}

		[OperationContract]
		public SongDetailsContract GetSongById(int id, ContentLanguagePreference? language) {

			var song = songQueries.GetSongDetails(id, 0, null, language, null);
			return song;

		}

		[OperationContract]
		public SongDetailsContract GetSongDetailsByNameArtistAndAlbum(string name, string artist, string album) {

			return songService.XGetSongByNameArtistAndAlbum(name, artist, album);

		}

		[OperationContract]
		public SongDetailsContract GetSongDetails(string term, ContentLanguagePreference? language = null, NameMatchMode matchMode = NameMatchMode.Auto) {

			if (language.HasValue)
				userPermissionContext.LanguagePreferenceSetting.OverrideRequestValue(language.Value);

			var song = songService.FindFirstDetails(SearchTextQuery.Create(term, matchMode));
			return song;

		}

		[OperationContract]
		public SongListContract GetSongListById(int id) {

			var list = songListQueries.GetSongList(id);
			return list;

		}

		[OperationContract]
		public TagContract GetTagById(int id, ContentLanguagePreference? language = null) {

			var tag = tagQueries.GetTag(id, t => new TagContract(t, language ?? userPermissionContext.LanguagePreference, true));
			return tag;

		}

		[OperationContract]
		public TagContract GetTagByName(string name) {

			var tag = tagQueries.Find(t => new TagContract(t, ContentLanguagePreference.Default, true), new TagQueryParams(new CommonSearchParams(TagSearchTextQuery.Create(name), false, true),
				new PagingProperties(0, 1, false))).Items.FirstOrDefault();

			return tag;

		}

		[OperationContract]
		public UserContract GetUserInfo(string name) {

			var queryParams = new UserQueryParams {
				Common = new CommonSearchParams(SearchTextQuery.Create(name, NameMatchMode.Exact), false, false),
				Paging = new PagingProperties(0, 1, false)
			};

			var users = userQueries.GetUsers(queryParams, u => new UserContract(u));
			return users.Items.FirstOrDefault();

		}

		#endregion

		#region MikuDB-specific queries (TODO: move elsewhere)
		[OperationContract]
		public AlbumContract GetAlbumByLinkUrl(string url) {
			return albumService.GetAlbumByLink(url);
		}

		[OperationContract]
		public LyricsForSongContract GetRandomSongLyrics(string query) {

			if (string.IsNullOrEmpty(query))
				return songService.GetRandomSongWithLyricsDetails();
			else
				return songService.GetRandomLyricsForSong(query);

		}

		[OperationContract]
		public SongWithAlbumContract GetSongWithPV(PVService service, string pvId) {
			return songService.GetSongWithPVAndAlbum(service, pvId);
		}

		[OperationContract]
		public UserContract GetUser(string name, string accessKey) {
			return userService.CheckAccessWithKey(name, accessKey, "localhost", true);
		}

		#endregion

	}
}
