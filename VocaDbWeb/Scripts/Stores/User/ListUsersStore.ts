import { IStoreWithRouteParams } from '@Components/redial';
import UserApiContract from '@DataContracts/User/UserApiContract';
import UserGroup from '@Models/Users/UserGroup';
import UserRepository from '@Repositories/UserRepository';
import ServerSidePagingStore from '@Stores/ServerSidePagingStore';
import _ from 'lodash';
import { computed, makeObservable, observable, runInAction } from 'mobx';

// Corresponds to the UserSortRule enum in C#.
export enum UserSortRule {
	RegisterDate = 'RegisterDate',
	Name = 'Name',
	Group = 'Group',
}

export interface ListUsersRouteParams {
	disabledUsers?: boolean;
	filter?: string;
	groupId?: UserGroup;
	knowsLanguage?: string;
	onlyVerifiedArtists?: boolean;
	page?: number;
	pageSize?: number;
	sort?: UserSortRule;
}

const membersWithTotalCount: (keyof ListUsersRouteParams)[] = [
	'disabledUsers',
	'groupId',
	'knowsLanguage',
	'onlyVerifiedArtists',
	'pageSize',
	'filter',
];

export default class ListUsersStore
	implements IStoreWithRouteParams<ListUsersRouteParams> {
	@observable public disabledUsers = false;
	@observable public group = UserGroup.Nothing;
	@observable public loading = false;
	@observable public knowsLanguage = '';
	@observable public onlyVerifiedArtists = false;
	@observable public page: UserApiContract[] = []; // Current page of items
	@observable public paging = new ServerSidePagingStore(20); // Paging view model
	public pauseNotifications = false;
	@observable public searchTerm = '';
	@observable public sort = UserSortRule.RegisterDate;

	public constructor(private readonly userRepo: UserRepository) {
		makeObservable(this);
	}

	@computed public get routeParams(): ListUsersRouteParams {
		return {
			disabledUsers: this.disabledUsers || undefined,
			filter: this.searchTerm || undefined,
			groupId: this.group,
			knowsLanguage: this.knowsLanguage || undefined,
			onlyVerifiedArtists: this.onlyVerifiedArtists || undefined,
			page: this.paging.page,
			pageSize: this.paging.pageSize,
			sort: this.sort,
		};
	}
	public set routeParams(value: ListUsersRouteParams) {
		this.disabledUsers = value.disabledUsers ?? false;
		this.searchTerm = value.filter ?? '';
		this.group = value.groupId ?? UserGroup.Nothing;
		this.knowsLanguage = value.knowsLanguage ?? '';
		this.onlyVerifiedArtists = value.onlyVerifiedArtists ?? false;
		this.paging.page = value.page ?? 1;
		this.paging.pageSize = value.pageSize ?? 20;
		this.sort = value.sort ?? UserSortRule.RegisterDate;
	}

	public shouldClearResults(value: ListUsersRouteParams): boolean {
		return !_.isEqual(
			_.pick(value, membersWithTotalCount),
			_.pick(this.routeParams, membersWithTotalCount),
		);
	}

	public updateResults = (clearResults: boolean): void => {
		// Disable duplicate updates
		if (this.pauseNotifications) return;

		this.pauseNotifications = true;

		const pagingProperties = this.paging.getPagingProperties(clearResults);
		this.userRepo
			.getList({
				paging: pagingProperties,
				query: this.searchTerm,
				sort: this.sort,
				groups: this.group,
				includeDisabled: this.disabledUsers,
				onlyVerified: this.onlyVerifiedArtists,
				knowsLanguage: this.knowsLanguage,
				nameMatchMode: 'Auto' /* TODO: enum */,
				fields: 'MainPicture' /* TODO: enum */,
			})
			.then((result) => {
				this.pauseNotifications = false;

				runInAction(() => {
					this.page = result.items;

					if (pagingProperties.getTotalCount)
						this.paging.totalItems = result.totalCount;
				});
			});
	};

	public updateResultsWithTotalCount = (): void => this.updateResults(true);
	public updateResultsWithoutTotalCount = (): void => this.updateResults(false);
}
