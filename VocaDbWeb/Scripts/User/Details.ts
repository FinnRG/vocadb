import CommentContract from '@DataContracts/CommentContract';
import RepositoryFactory from '@Repositories/RepositoryFactory';
import HttpClient from '@Shared/HttpClient';
import UrlMapper from '@Shared/UrlMapper';
import VocaDbContext from '@Shared/VocaDbContext';
import { container } from '@Shared/inversify.config';
import PVPlayersFactory from '@ViewModels/PVs/PVPlayersFactory';
import AlbumCollectionViewModel from '@ViewModels/User/AlbumCollectionViewModel';
import FollowedArtistsViewModel from '@ViewModels/User/FollowedArtistsViewModel';
import RatedSongsSearchViewModel from '@ViewModels/User/RatedSongsSearchViewModel';
import UserDetailsViewModel from '@ViewModels/User/UserDetailsViewModel';
import $ from 'jquery';
import ko from 'knockout';
import moment from 'moment';

const vocaDbContext = container.get(VocaDbContext);
const repoFactory = container.get(RepositoryFactory);

function initPage(confirmDisableStr: string): void {
	$('#mySettingsLink').button({ icons: { primary: 'ui-icon-wrench' } });
	$('#messagesLink').button({ icons: { primary: 'ui-icon-mail-closed' } });
	$('#composeMessageLink').button({
		icons: { primary: 'ui-icon-mail-closed' },
	});
	$('#editUserLink').button({ icons: { primary: 'ui-icon-wrench' } });
	$('#disableUserLink').button({ icons: { primary: 'ui-icon-close' } });
	$('#reportUserLink').button({ icons: { primary: 'ui-icon-alert' } });
	$('#setToLimitedLink').button({ icons: { primary: 'ui-icon-close' } });
	$('#avatar').tooltip({ placement: 'bottom' } as any);

	$('#disableUserLink').click(function () {
		return window.confirm(confirmDisableStr);
	});

	$('#sfsCheckDialog').dialog({ autoOpen: false, model: true } as any);
	$('#favoriteAlbums img').vdbAlbumToolTip();
}

const UserDetails = (
	artistId: number,
	canDeleteComments: boolean,
	childVoicebanks: boolean,
	confirmDisableStr: string,
	lastLoginAddress: string,
	model: {
		id: number;
		latestComments: CommentContract[];
	},
	publicCollection: boolean,
): void => {
	ko.punches.enableAll();

	$(function () {
		moment.locale(vocaDbContext.culture);

		var userId = model.id;
		var loggedUserId = vocaDbContext.loggedUserId;
		const httpClient = new HttpClient();
		var rootPath = vocaDbContext.baseAddress;
		var urlMapper = new UrlMapper(rootPath);
		var adminRepo = repoFactory.adminRepository();
		var userRepo = repoFactory.userRepository();
		var artistRepo = repoFactory.artistRepository();
		var resourceRepo = repoFactory.resourceRepository();
		var songRepo = repoFactory.songRepository();
		var tagRepo = repoFactory.tagRepository();
		var pvPlayersFactory = new PVPlayersFactory($('#pv-player-wrapper')[0]);
		var latestComments = model.latestComments;

		var sort = 'RatingDate';
		var groupByRating = true;

		var followedArtistsViewModel = new FollowedArtistsViewModel(
			vocaDbContext,
			userRepo,
			resourceRepo,
			tagRepo,
			userId,
		);

		var albumCollectionViewModel = new AlbumCollectionViewModel(
			vocaDbContext,
			userRepo,
			artistRepo,
			resourceRepo,
			userId,
			publicCollection,
			false,
		);

		var ratedSongsViewModel = new RatedSongsSearchViewModel(
			vocaDbContext,
			urlMapper,
			userRepo,
			artistRepo,
			songRepo,
			resourceRepo,
			tagRepo,
			userId,
			sort,
			groupByRating,
			pvPlayersFactory,
			false,
			artistId,
			childVoicebanks,
		);

		var viewModel = new UserDetailsViewModel(
			vocaDbContext,
			userId,
			loggedUserId,
			lastLoginAddress,
			canDeleteComments,
			httpClient,
			urlMapper,
			userRepo,
			adminRepo,
			resourceRepo,
			tagRepo,
			followedArtistsViewModel,
			albumCollectionViewModel,
			ratedSongsViewModel,
			latestComments,
		);
		ko.applyBindings(viewModel);

		if (window.location.hash && window.location.hash.length >= 1) {
			viewModel.setView(window.location.hash.substr(1));
		}

		initPage(confirmDisableStr);
	});
};

export default UserDetails;
