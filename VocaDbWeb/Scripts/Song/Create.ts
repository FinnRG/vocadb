import RepositoryFactory from '@Repositories/RepositoryFactory';
import { container } from '@Shared/inversify.config';
import SongCreateViewModel from '@ViewModels/SongCreateViewModel';
import $ from 'jquery';
import ko from 'knockout';

const SongCreate = (model: any): void => {
	$(document).ready(function () {
		ko.punches.enableAll();
		var repoFactory = container.get(RepositoryFactory);
		var repo = repoFactory.songRepository();
		var artistRepo = repoFactory.artistRepository();
		var tagRepo = repoFactory.tagRepository();
		var json = model;
		ko.applyBindings(new SongCreateViewModel(repo, artistRepo, tagRepo, json));

		$('#pvLoader')
			.ajaxStart(function (this: any) {
				$(this).show();
			})
			.ajaxStop(function (this: any) {
				$(this).hide();
			});
	});
};

export default SongCreate;
