import { TagSelectionContract } from '@/DataContracts/Tag/TagSelectionContract';
import { TagUsageForApiContract } from '@/DataContracts/Tag/TagUsageForApiContract';
import { EntryType } from '@/Models/EntryType';
import { EventCategory } from '@/Models/Events/EventCategory';
import { UserRepository } from '@/Repositories/UserRepository';
import { TagListStore } from '@/Stores/Tag/TagListStore';
import { TagsEditStore } from '@/Stores/Tag/TagsEditStore';

export class EventSeriesDetailsStore {
	readonly tagsEditStore: TagsEditStore;
	readonly tagUsages: TagListStore;

	constructor(
		userRepo: UserRepository,
		private readonly seriesId: number,
		tagUsages: TagUsageForApiContract[],
		category: EventCategory,
	) {
		this.tagsEditStore = new TagsEditStore(
			{
				getTagSelections: (): Promise<TagSelectionContract[]> =>
					userRepo.getEventSeriesTagSelections({ seriesId: this.seriesId }),
				saveTagSelections: (tags): Promise<void> =>
					userRepo
						.updateEventSeriesTags({
							seriesId: this.seriesId,
							tags: tags,
						})
						.then(this.tagUsages.updateTagUsages),
			},
			EntryType.ReleaseEvent,
			category,
		);

		this.tagUsages = new TagListStore(tagUsages);
	}
}
