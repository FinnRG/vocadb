import ContentLanguagePreference from '../../Models/Globalization/ContentLanguagePreference';
import { EntryAutoCompleteParams } from '../../Shared/EntryAutoComplete';
import functions from '../../Shared/GlobalFunctions';
import { initEntrySearch } from '../../Shared/EntryAutoComplete';
import SongListContract from '../../DataContracts/Song/SongListContract';

declare global {
	interface KnockoutBindingHandlers {
		songListAutoComplete: KnockoutBindingHandler;
	}
}

// Tag autocomplete search box.
ko.bindingHandlers.songListAutoComplete = {
	init: (element: HTMLElement, valueAccessor: () => KnockoutObservable<SongListContract>, allBindingsAccessor: () => any) => {

		var allBindings = allBindingsAccessor();
		var category: string = allBindings.songListCategory;

		var queryParams = {
			nameMatchMode: 'Auto',
			lang: ContentLanguagePreference[vdb.values.languagePreference],
			preferAccurateMatches: true,
			maxResults: 20,
			sort: 'Name',
			featuredCategory: category
		};	

		var params: EntryAutoCompleteParams<SongListContract> = {
			acceptSelection: (id, term, itemType, item) => {
				valueAccessor()(item || { id: id, name: term, author: null, description: null, featuredCategory: null, status: null });
			},
			createOptionFirstRow: (item) => item.name,
			createNewItem: allBindingsAccessor().createNewItem,
			extraQueryParams: queryParams
		};

		initEntrySearch(element, functions.mapAbsoluteUrl("/api/songLists/featured"), params);

	}

}