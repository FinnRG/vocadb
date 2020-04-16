using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VocaDb.Model.Domain;
using VocaDb.Model.Domain.PVs;
using VocaDb.Model.Domain.Security;

namespace VocaDb.Model.Service.VideoServices {

	public class VideoService : IVideoService {

		public static readonly VideoService Bandcamp = new VideoServiceBandcamp();

		public static readonly VideoService Bilibili = new VideoServiceBilibili();

		public static readonly VideoService NicoNicoDouga =
			new VideoServiceNND(PVService.NicoNicoDouga, new NicoParser(), new[] {
				new RegexLinkMatcher("www.nicovideo.jp/watch/{0}", @"nicovideo.jp/watch/([a-z]{2}\d{4,10})"),
				new RegexLinkMatcher("www.nicovideo.jp/watch/{0}", @"nicovideo.jp/watch/(\d{6,12})"),
				new RegexLinkMatcher("www.nicovideo.jp/watch/{0}", @"nico.ms/([a-z]{2}\d{4,10})"),
				new RegexLinkMatcher("www.nicovideo.jp/watch/{0}", @"nico.ms/(\d{6,12})")
			});

		public static readonly VideoService Piapro =
			new VideoServicePiapro(PVService.Piapro, null, new[] {
				new RegexLinkMatcher("piapro.jp/content/{0}", @"piapro.jp/t/([\w\-]+)"),
				new RegexLinkMatcher("piapro.jp/content/{0}", @"piapro.jp/content/([\w\-]+)"),
			});

		public static readonly VideoService SoundCloud =
			new VideoServiceSoundCloud(PVService.SoundCloud, null, new[] {
				new RegexLinkMatcher("soundcloud.com/{0}", @"soundcloud.com/(\S+)"),
			});

		public static readonly VideoService Youtube =
			new VideoServiceYoutube(PVService.Youtube, new YoutubeParser(), new[] {
				new RegexLinkMatcher("youtu.be/{0}", @"youtu.be/(\S{11})"),
				new RegexLinkMatcher("www.youtube.com/watch?v={0}", @"youtube.com/watch?\S*v=(\S{11})"),
			});

		public static readonly VideoService Vimeo =
			new VideoService(PVService.Vimeo, new VimeoParser(), new[] {
				new RegexLinkMatcher("vimeo.com/{0}", @"vimeo.com/(\d+)"),
			});

		public static readonly VideoService Creofuga =
			new VideoService(PVService.Creofuga, new CreofugaParser(), new[] {
				new RegexLinkMatcher("creofuga.net/audios/{0}", @"creofuga.net/audios/(\d+)"),
			});

		public static readonly VideoServiceFile File =
			new VideoServiceFile();

		public static readonly VideoServiceLocalFile LocalFile =
			new VideoServiceLocalFile();

		protected readonly RegexLinkMatcher[] linkMatchers;
		private readonly IVideoServiceParser parser;

		protected VideoService(PVService service, IVideoServiceParser parser, RegexLinkMatcher[] linkMatchers) {
			Service = service;
			this.parser = parser;
			this.linkMatchers = linkMatchers;
		}

		public PVService Service { get; private set; }

		public virtual string GetIdByUrl(VocaDbUrl url) {

			var matcher = linkMatchers.FirstOrDefault(m => m.IsMatch(url));

			if (matcher == null)
				return null;

			return matcher.GetId(url);

		}

		public virtual VocaDbUrl GetThumbUrlById(string id) => VocaDbUrl.Empty;

		public virtual VocaDbUrl GetMaxSizeThumbUrlById(string id) => GetThumbUrlById(id);

		public virtual VocaDbUrl GetUrlById(string id, PVExtendedMetadata extendedMetadata) {

			var matcher = linkMatchers.First();
			return VocaDbUrl.External(string.Format("http://{0}", matcher.MakeLinkFromId(id)));

		}

		public virtual IEnumerable<string> GetUserProfileUrls(string authorId) => Enumerable.Empty<string>();

		public virtual Task<VideoTitleParseResult> GetVideoTitleAsync(string id) => (parser != null ? parser.GetTitleAsync(id) : null);

		/// <summary>
		/// Tests whether the user has the required permissions to add PVs for this service.
		/// </summary>
		/// <param name="permissionContext">Permission context. Can be null (when no user is logged in).</param>
		/// <returns>True if the user authorized to add PVs for this service, otherwise false.</returns>
		public virtual bool IsAuthorized(IUserPermissionContext permissionContext) {
			return true;
		}

		public virtual bool IsValidFor(VocaDbUrl url) => linkMatchers.Any(m => m.IsMatch(url));

		public virtual Task<VideoUrlParseResult> ParseByUrlAsync(VocaDbUrl url, bool getTitle) {

			var id = GetIdByUrl(url);

			if (id == null) {
				return Task.FromResult(VideoUrlParseResult.CreateError(url, VideoUrlParseResultType.NoMatcher));
			}

			return ParseByIdAsync(id, url, getTitle);

		}

		protected virtual async Task<VideoUrlParseResult> ParseByIdAsync(string id, VocaDbUrl url, bool getMeta) {

			var meta = (getMeta ? await GetVideoTitleAsync(id) : VideoTitleParseResult.Empty) ?? VideoTitleParseResult.Empty;

			// Note that even if meta lookup failed, we're returning Ok here, because for example NND API doesn't support all PVs.

			return VideoUrlParseResult.CreateOk(url, Service, id, meta);

		}

	}

}
