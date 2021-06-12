import PartialFindResultContract from '@DataContracts/PartialFindResultContract';
import ReleaseEventContract from '@DataContracts/ReleaseEvents/ReleaseEventContract';
import ResourcesContract from '@DataContracts/ResourcesContract';
import TagBaseContract from '@DataContracts/Tag/TagBaseContract';
import AlbumForUserForApiContract from '@DataContracts/User/AlbumForUserForApiContract';
import { ArtistAutoCompleteParams } from '@KnockoutExtensions/AutoCompleteParams';
import EntryType from '@Models/EntryType';
import ContentLanguagePreference from '@Models/Globalization/ContentLanguagePreference';
import ArtistRepository from '@Repositories/ArtistRepository';
import ResourceRepository from '@Repositories/ResourceRepository';
import UserRepository from '@Repositories/UserRepository';
import EntryUrlMapper from '@Shared/EntryUrlMapper';
import vdb from '@Shared/VdbStatic';
import ko from 'knockout';
import _ from 'lodash';

import BasicEntryLinkViewModel from '../BasicEntryLinkViewModel';
import AdvancedSearchFilters from '../Search/AdvancedSearchFilters';
import ServerSidePagingViewModel from '../ServerSidePagingViewModel';

export default class AlbumCollectionViewModel {
	public constructor(
		private userRepo: UserRepository,
		private artistRepo: ArtistRepository,
		private resourceRepo: ResourceRepository,
		private lang: ContentLanguagePreference,
		private loggedUserId: number,
		private cultureCode: string,
		public publicCollection: boolean,
		initialize = true,
	) {
		this.artistSearchParams = {
			acceptSelection: this.selectArtist,
		};

		this.advancedFilters.filters.subscribe(this.updateResultsWithTotalCount);
		this.albumType.subscribe(this.updateResultsWithTotalCount);
		this.artistId.subscribe(this.updateResultsWithTotalCount);
		this.collectionStatus.subscribe(this.updateResultsWithTotalCount);
		this.paging.page.subscribe(this.updateResultsWithoutTotalCount);
		this.paging.pageSize.subscribe(this.updateResultsWithTotalCount);
		this.releaseEvent.id.subscribe(this.updateResultsWithTotalCount);
		this.searchTerm.subscribe(this.updateResultsWithTotalCount);
		this.sort.subscribe(this.updateResultsWithoutTotalCount);
		this.tag.subscribe(this.updateResultsWithTotalCount);

		if (initialize) this.init();
	}

	public advancedFilters = new AdvancedSearchFilters();
	public albumType = ko.observable('Unknown');
	public artistId = ko.observable<number>(null!);
	public artistName = ko.observable('');
	public artistSearchParams: ArtistAutoCompleteParams;
	public collectionStatus = ko.observable('');
	public isInit = false;
	public loading = ko.observable(true); // Currently loading for data
	public page = ko.observableArray<AlbumForUserForApiContract>([]); // Current page of items
	public paging = new ServerSidePagingViewModel(20); // Paging view model
	public pauseNotifications = false;
	public releaseEvent = new BasicEntryLinkViewModel<ReleaseEventContract>(
		null!,
		null!,
	);
	public resources = ko.observable<ResourcesContract>();
	public searchTerm = ko
		.observable('')
		.extend({ rateLimit: { timeout: 300, method: 'notifyWhenChangesStop' } });
	public sort = ko.observable('Name');
	public sortName = ko.computed(() =>
		this.resources() != null
			? this.resources()!.albumSortRuleNames![this.sort()]
			: '',
	);
	public tag = ko.observable<TagBaseContract>(null!);
	public tagId = ko.computed(() => (this.tag() ? this.tag()!.id : null));
	public tagName = ko.computed(() => (this.tag() ? this.tag()!.name : null));
	public tagUrl = ko.computed(() =>
		EntryUrlMapper.details_tag_contract(this.tag()!),
	);
	public viewMode = ko.observable('Details');

	public releaseEventUrl = ko.computed(() => {
		return EntryUrlMapper.details(
			EntryType.ReleaseEvent,
			this.releaseEvent.id(),
		);
	});

	public init = (): void => {
		if (this.isInit) return;

		this.resourceRepo
			.getList(this.cultureCode, [
				'albumCollectionStatusNames',
				'albumMediaTypeNames',
				'albumSortRuleNames',
				'discTypeNames',
			])
			.then((resources) => {
				this.resources(resources);
				this.updateResultsWithTotalCount();
				this.isInit = true;
			});
	};

	public ratingStars = (userRating: number): { enabled: boolean }[] => {
		var ratings = _.map([1, 2, 3, 4, 5], (rating) => {
			return { enabled: Math.round(userRating) >= rating };
		});
		return ratings;
	};

	public selectArtist = (selectedArtistId?: number): void => {
		this.artistId(selectedArtistId!);
		this.artistRepo
			.getOne(selectedArtistId!, vdb.values.languagePreference)
			.then((artist) => this.artistName(artist.name));
	};

	public updateResultsWithTotalCount = (): void => this.updateResults(true);
	public updateResultsWithoutTotalCount = (): void => this.updateResults(false);

	public updateResults = (clearResults: boolean = true): void => {
		// Disable duplicate updates
		if (this.pauseNotifications) return;

		this.pauseNotifications = true;
		this.loading(true);

		if (clearResults) this.paging.page(1);

		var pagingProperties = this.paging.getPagingProperties(clearResults);

		this.userRepo
			.getAlbumCollectionList(
				this.loggedUserId,
				pagingProperties,
				this.lang,
				this.searchTerm(),
				this.tagId()!,
				this.albumType(),
				this.artistId()!,
				this.collectionStatus(),
				this.releaseEvent.id(),
				this.advancedFilters.filters(),
				this.sort(),
			)
			.then((result: PartialFindResultContract<AlbumForUserForApiContract>) => {
				this.pauseNotifications = false;

				if (pagingProperties.getTotalCount)
					this.paging.totalItems(result.totalCount);

				this.page(result.items);
				this.loading(false);
			});
	};
}
