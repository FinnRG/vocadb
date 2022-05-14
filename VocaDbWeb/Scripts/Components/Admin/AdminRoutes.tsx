import ErrorNotFound from '@Components/Error/ErrorNotFound';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AdminIndex = React.lazy(() => import('./AdminIndex'));
const AdminViewEntryReports = React.lazy(
	() => import('./AdminViewEntryReports'),
);

const AdminRoutes = (): React.ReactElement => {
	return (
		<Routes>
			<Route path="" element={<AdminIndex />} />
			<Route path="ViewEntryReports" element={<AdminViewEntryReports />} />
			<Route path="*" element={<ErrorNotFound />} />
		</Routes>
	);
};

export default AdminRoutes;
