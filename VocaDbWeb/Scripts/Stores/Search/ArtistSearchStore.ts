import ArtistContract from '@DataContracts/Artist/ArtistContract';
import PagingProperties from '@DataContracts/PagingPropertiesContract';
import PartialFindResultContract from '@DataContracts/PartialFindResultContract';
import ArtistHelper from '@Helpers/ArtistHelper';
import ArtistType from '@Models/Artists/ArtistType';
import ArtistRepository from '@Repositories/ArtistRepository';
import GlobalValues from '@Shared/GlobalValues';
import { computed, makeObservable, observable, reaction } from 'mobx';

import { ICommonSearchStore } from './CommonSearchStore';
import SearchCategoryBaseStore from './SearchCategoryBaseStore';
import SearchQueryParams from './SearchQueryParams';
import { SearchType } from './SearchStore';

// Corresponds to the ArtistSortRule enum in C#.
export enum ArtistSortRule {
	None = 'None',
	Name = 'Name',
	AdditionDate = 'AdditionDate',
	AdditionDateAsc = 'AdditionDateAsc',
	ReleaseDate = 'ReleaseDate',
	SongCount = 'SongCount',
	SongRating = 'SongRating',
	FollowerCount = 'FollowerCount',
}

export default class ArtistSearchStore extends SearchCategoryBaseStore<ArtistContract> {
	@observable public artistType = 'Unknown' /* TODO: enum */;
	@observable public onlyFollowedByMe = false;
	@observable public onlyRootVoicebanks = false;
	@observable public sort = ArtistSortRule.Name;

	public constructor(
		commonSearchStore: ICommonSearchStore,
		private readonly values: GlobalValues,
		private readonly artistRepo: ArtistRepository,
		artistType?: string,
	) {
		super(commonSearchStore);

		makeObservable(this);

		if (artistType) this.artistType = artistType;

		reaction(
			() => this.advancedFilters.filters.map((filter) => filter.description),
			this.updateResultsWithTotalCount,
		);
		reaction(() => this.sort, this.updateResultsWithTotalCount);
		reaction(() => this.artistType, this.updateResultsWithTotalCount);
		reaction(() => this.onlyFollowedByMe, this.updateResultsWithTotalCount);
		reaction(() => this.onlyRootVoicebanks, this.updateResultsWithTotalCount);
	}

	@computed public get queryParams(): SearchQueryParams {
		return {
			searchType: SearchType.Artist,
			filter: this.searchTerm,
			tagId: this.tagIds,
			sort: this.sort,
			childTags: this.childTags,
			artistType: this.artistType,
			pageSize: this.pageSize,
		};
	}
	public set queryParams(value: SearchQueryParams) {
		if (value.searchType !== SearchType.Artist) return;

		this.searchTerm = value.filter ?? '';
		this.tagIds = value.tagId ?? [];
		this.sort = value.sort ?? ArtistSortRule.Name;
		this.childTags = value.childTags ?? false;
		this.artistType = value.artistType ?? 'Unknown';
		this.pageSize = value.pageSize ?? 10;
	}

	@computed public get fields(): string {
		return this.showTags
			? 'AdditionalNames,MainPicture,Tags'
			: 'AdditionalNames,MainPicture';
	}

	public loadResults = (
		pagingProperties: PagingProperties,
		searchTerm: string,
		tags: number[],
		childTags: boolean,
		status?: string,
	): Promise<PartialFindResultContract<ArtistContract>> => {
		return this.artistRepo.getList({
			paging: pagingProperties,
			lang: this.values.languagePreference,
			query: searchTerm,
			sort: this.sort,
			artistTypes:
				this.artistType !== ArtistType[ArtistType.Unknown]
					? this.artistType
					: undefined,
			allowBaseVoicebanks: !this.onlyRootVoicebanks,
			tags: tags,
			childTags: childTags,
			followedByUserId: this.onlyFollowedByMe
				? this.values.loggedUserId
				: undefined,
			fields: this.fields,
			status: status,
			advancedFilters: this.advancedFilters.filters,
		});
	};

	@computed public get canHaveChildVoicebanks(): boolean {
		return ArtistHelper.canHaveChildVoicebanks(
			ArtistType[this.artistType as keyof typeof ArtistType],
		);
	}
}
