import NameMatchMode from '@Models/NameMatchMode';
import TagRepository from '@Repositories/TagRepository';
import EntryUrlMapper from '@Shared/EntryUrlMapper';
import ko from 'knockout';

export default class TagCreateViewModel {
	public constructor(private tagRepo: TagRepository) {
		this.newTagName.subscribe((val) => {
			if (!val) {
				this.duplicateName(false);
				return;
			}

			tagRepo
				.getList({
					start: 0,
					maxResults: 1,
					getTotalCount: false,
					query: val,
					nameMatchMode: NameMatchMode.Exact,
					allowAliases: true,
				})
				.then((result) => {
					this.duplicateName(result.items.length > 0);
				});
		});
	}

	public createTag = (): void => {
		this.tagRepo
			.create(this.newTagName())
			.then(
				(t) => (window.location.href = EntryUrlMapper.details_tag_contract(t)!),
			);
	};

	public dialogVisible = ko.observable(false);

	public duplicateName = ko.observable(false);

	public newTagName = ko
		.observable('')
		.extend({ rateLimit: { timeout: 100, method: 'notifyWhenChangesStop' } });

	public isValid = ko.computed(
		() => this.newTagName() && !this.duplicateName(),
	);
}
