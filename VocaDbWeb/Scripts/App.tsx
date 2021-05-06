import GlobalSearchBox from '@Components/Shared/GlobalSearchBox';
import Footer from '@Components/Shared/Partials/Footer';
import LeftMenu from '@Components/Shared/Partials/LeftMenu';
import VocaDbPageContext, { VocaDbPage } from '@Components/VocaDbPageContext';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './i18n';

const ErrorNotFound = React.lazy(
	() => import('@Components/Error/ErrorNotFound'),
);

interface AppProps {
	initialPage: VocaDbPage;
}

const App = ({ initialPage }: AppProps): React.ReactElement => {
	return (
		<VocaDbPageContext.Provider value={initialPage}>
			<BrowserRouter>
				<div className="navbar navbar-inverse navbar-fixed-top">
					<div className="navbar-inner">
						<div id="topBar" className="container">
							<GlobalSearchBox /* TODO */ />
						</div>
					</div>
				</div>

				<div className="container-fluid">
					<div className="row-fluid">
						<LeftMenu />

						<div className="span10 rightFrame well">
							<React.Suspense fallback={null /* TODO */}>
								<Routes>
									<Route path="/*" element={<ErrorNotFound />} />
								</Routes>
							</React.Suspense>
						</div>
					</div>
				</div>

				<Footer />
			</BrowserRouter>
		</VocaDbPageContext.Provider>
	);
};

export default App;