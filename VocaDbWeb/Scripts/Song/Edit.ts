import SongForEditContract from '@DataContracts/Song/SongForEditContract';
import TranslatedEnumField from '@DataContracts/TranslatedEnumField';
import RepositoryFactory from '@Repositories/RepositoryFactory';
import DialogService from '@Shared/DialogService';
import UrlMapper from '@Shared/UrlMapper';
import vdb from '@Shared/VdbStatic';
import { container } from '@Shared/inversify.config';
import SongEditViewModel from '@ViewModels/Song/SongEditViewModel';
import $ from 'jquery';
import ko from 'knockout';
import moment from 'moment';

const repoFactory = container.get(RepositoryFactory);

function initPage(): void {
	$('#tabs').tabs();
	$('#deleteLink').button({ icons: { primary: 'ui-icon-trash' } });
	$('#restoreLink').button({ icons: { primary: 'ui-icon-trash' } });
	$('#mergeLink').button();
	$('#pvLoader')
		.ajaxStart(function (this: any) {
			$(this).show();
		})
		.ajaxStop(function (this: any) {
			$(this).hide();
		});

	$('#artistsTableBody a.artistLink').vdbArtistToolTip();
}

const SongEdit = (
	addExtraArtist: string,
	artistRoleJson: { [key: string]: string },
	canBulkDeletePVs: boolean,
	languageNames: any,
	model: {
		editedSong: SongForEditContract;
		id: number;
		instrumentalTagId: number;
	},
	saveWarning: any,
	webLinkCategoryJson: TranslatedEnumField[],
): void => {
	$(document).ready(function () {
		moment.locale(vdb.values.culture);
		ko.punches.enableAll();

		vdb.resources.entryEdit = {
			saveWarning: saveWarning,
		};

		vdb.resources.song = {
			addExtraArtist: addExtraArtist,
		};

		var editedModel = model.editedSong;
		var rootPath = vdb.values.baseAddress;
		var urlMapper = new UrlMapper(rootPath);
		var songRepo = repoFactory.songRepository();
		var artistRepo = repoFactory.artistRepository();
		var pvRepo = repoFactory.pvRepository();
		var userRepo = repoFactory.userRepository();
		var instrumentalTagId = model.instrumentalTagId;
		var vm;

		if (editedModel) {
			vm = new SongEditViewModel(
				songRepo,
				artistRepo,
				pvRepo,
				userRepo,
				urlMapper,
				artistRoleJson,
				webLinkCategoryJson,
				editedModel,
				canBulkDeletePVs,
				new DialogService(),
				instrumentalTagId,
				languageNames,
			);
			ko.applyBindings(vm);
		} else {
			songRepo.getForEdit(model.id).then(function (model) {
				vm = new SongEditViewModel(
					songRepo,
					artistRepo,
					pvRepo,
					userRepo,
					urlMapper,
					artistRoleJson,
					webLinkCategoryJson,
					model,
					canBulkDeletePVs,
					new DialogService(),
					instrumentalTagId,
					languageNames,
				);
				ko.applyBindings(vm);
			});
		}

		initPage();
	});
};

export default SongEdit;
