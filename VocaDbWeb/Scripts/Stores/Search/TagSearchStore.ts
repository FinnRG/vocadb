import PagingProperties from '@DataContracts/PagingPropertiesContract';
import PartialFindResultContract from '@DataContracts/PartialFindResultContract';
import TagApiContract from '@DataContracts/Tag/TagApiContract';
import TagRepository from '@Repositories/TagRepository';
import GlobalValues from '@Shared/GlobalValues';
import { computed, makeObservable, observable } from 'mobx';

import { ICommonSearchStore } from './CommonSearchStore';
import SearchCategoryBaseStore from './SearchCategoryBaseStore';
import { SearchRouteParams, SearchType } from './SearchStore';

// Corresponds to the TagSortRule enum in C#.
export enum TagSortRule {
	Nothing = 'Nothing',
	Name = 'Name',
	AdditionDate = 'AdditionDate',
	UsageCount = 'UsageCount',
}

export interface TagSearchRouteParams {
	filter?: string;
	page?: number;
	pageSize?: number;
	searchType?: SearchType.Tag;
	sort?: TagSortRule;
}

export default class TagSearchStore extends SearchCategoryBaseStore<TagApiContract> {
	@observable public allowAliases = false;
	@observable public categoryName?: string;
	@observable public sort = TagSortRule.Name;

	public constructor(
		commonSearchStore: ICommonSearchStore,
		private readonly values: GlobalValues,
		private readonly tagRepo: TagRepository,
	) {
		super(commonSearchStore);

		makeObservable(this);
	}

	public loadResults = (
		pagingProperties: PagingProperties,
		searchTerm: string,
		tags: number[],
		childTags: boolean,
		status?: string,
	): Promise<PartialFindResultContract<TagApiContract>> => {
		return this.tagRepo.getList({
			queryParams: {
				start: pagingProperties.start,
				maxResults: pagingProperties.maxEntries,
				getTotalCount: pagingProperties.getTotalCount,
				lang: this.values.languagePreference,
				query: searchTerm,
				sort: this.sort,
				allowAliases: this.allowAliases,
				categoryName: this.categoryName,
				fields: 'AdditionalNames,MainPicture',
			},
		});
	};

	@computed public get routeParams(): SearchRouteParams {
		return {
			searchType: SearchType.Tag,
			filter: this.searchTerm || undefined,
			page: this.paging.page,
			pageSize: this.pageSize,
			sort: this.sort,
		};
	}
	public set routeParams(value: SearchRouteParams) {
		if (value.searchType !== SearchType.Tag) return;

		this.searchTerm = value.filter ?? '';
		this.paging.page = value.page ?? 1;
		this.pageSize = value.pageSize ?? 10;
		this.sort = value.sort ?? TagSortRule.Name;
	}

	public shouldClearResults = (value: SearchRouteParams): boolean => {
		if (value.searchType !== SearchType.Tag) return true;

		const routeParams = this.routeParams;
		if (routeParams.searchType !== SearchType.Tag) return true;

		// TODO: allowAliases
		// TODO: categoryName
		if (value.sort !== routeParams.sort) return true;

		return false;
	};
}
