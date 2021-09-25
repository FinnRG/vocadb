import IStoreWithPaging from '@Stores/IStoreWithPaging';
import React from 'react';

import useStoreWithUpdateResults from './useStoreWithUpdateResults';

const useStoreWithPaging = <T>(store: IStoreWithPaging<T>): void => {
	const handleClearResults = React.useCallback(
		(popState) => {
			// Do not go to the first page when the back/forward buttons are clicked.
			if (!popState) store.paging.goToFirstPage();
		},
		[store],
	);

	useStoreWithUpdateResults(store, handleClearResults);
};

export default useStoreWithPaging;
