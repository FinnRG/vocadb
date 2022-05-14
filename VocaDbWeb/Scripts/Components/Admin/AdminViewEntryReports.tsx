import Alert from '@Bootstrap/Alert';
import classNames from 'classnames';
import React from 'react';

import Layout from '../Shared/Layout';
import useVocaDbTitle from '../useVocaDbTitle';

// TODO
enum ReportStatus {
	Open = 'Open',
	Closed = 'Closed',
}

const AdminViewEntryReports = (): React.ReactElement => {
	const title = 'View entry reports'; /* TODO: localize */

	useVocaDbTitle(title, true);

	// TODO
	const status: any = ReportStatus.Open;

	return (
		<Layout title={title}>
			<ul className="nav nav-pills">
				<li className={classNames(status === ReportStatus.Open && 'active')}>
					<a href="#" /* TODO */>Open{/* TODO: localize */}</a>
				</li>
				<li className={classNames(status === ReportStatus.Closed && 'active')}>
					<a href="#" /* TODO */>Closed{/* TODO: localize */}</a>
				</li>
			</ul>

			<Alert variant="info">
				This list contains entries that have been reported for errors.
				<b>
					The list is shared between all trusted users and moderators, and
					anyone can take action based on these reported issues.
				</b>
				If you have time, please check that the reports are valid, and either
				notify the user who created the entry in the first place, or correct the
				errors yourself. After the issue has been resolved you can delete the
				report, but not before.{/* TODO: localize */}
			</Alert>

			<table className="table table-striped">
				<thead>
					<tr>
						<th>Time{/* TODO: localize */}</th>
						<th>Author{/* TODO: localize */}</th>
						<th>Entry{/* TODO: localize */}</th>
						<th>Type{/* TODO: localize */}</th>
						<th>Notes{/* TODO: localize */}</th>
						{status === ReportStatus.Open && (
							<th>Actions{/* TODO: localize */}</th>
						)}
						{status === ReportStatus.Closed && (
							<>
								<th>Closed by{/* TODO: localize */}</th>
								<th>Closed at{/* TODO: localize */}</th>
							</>
						)}
					</tr>
				</thead>
				<tbody>{/* TODO */}</tbody>
			</table>
		</Layout>
	);
};

export default AdminViewEntryReports;
