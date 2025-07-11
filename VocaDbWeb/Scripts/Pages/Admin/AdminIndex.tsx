import { Layout } from '@/Components/Shared/Layout';
import { useLoginManager } from '@/LoginManagerContext';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminIndex = (): React.ReactElement => {
	const loginManager = useLoginManager();

	const title = 'Site management'; /* LOC */

	return (
		<Layout pageTitle={title} ready={true} title={title}>
			<h3>Common tasks{/* LOC */}</h3>

			<p>
				<Link to="/User">View users list{/* LOC */}</Link>
			</p>

			<p>
				<Link to="/Comment">View recent comments{/* LOC */}</Link>
			</p>

			<p>
				<Link to="/Tag/Deleted">View deleted tags {/* LOC */}</Link>
			</p>

			{loginManager.canViewAuditLog && (
				<p>
					<Link to="/Admin/ViewAuditLog">View audit log{/* LOC */}</Link>
				</p>
			)}

			{loginManager.canManageTagMappings && (
				<>
					<p>
						<Link to="/Admin/ManageTagMappings">
							Manage tag mappings{/* LOC */}
						</Link>
					</p>
					<p>
						<Link to="/Admin/ManageEntryTagMappings">
							Manage entry type to tag mappings{/* LOC */}
						</Link>
					</p>
				</>
			)}

			{loginManager.canManageEntryReports && (
				<p>
					<Link to="/Admin/ViewEntryReports">Manage entry reports</Link>
					{/* LOC */}
				</p>
			)}

			{loginManager.canBulkDeletePVs && (
				<p>
					<a href="/Admin/PVsByAuthor">Delete PVs by author{/* LOC */}</a>
				</p>
			)}

			{loginManager.canMoveToTrash && (
				<p>
					<Link to="/Album/Deleted">Manage deleted albums{/* LOC */}</Link>
				</p>
			)}

			{loginManager.canManageIPRules && (
				<p>
					<Link to="/Admin/ManageIPRules">Manage IP rules{/* LOC */}</Link>
				</p>
			)}

			{loginManager.canManageWebhooks && (
				<p>
					<Link to="/Admin/ManageWebhooks">Manage webhooks{/* LOC */}</Link>
				</p>
			)}

			{loginManager.canCreateDatabaseDump && (
				<p>
					<a href="/Admin/CreateJsonDump">Create JSON dump{/* LOC */}</a>
				</p>
			)}

			<br />

			{loginManager.canAdmin && (
				<>
					<h3>Database maintenance tasks{/* LOC */}</h3>
					<p>
						<Link to="/Admin/ActiveEdits">View active editors</Link>
						{/* LOC */}
					</p>
					<p>
						<a href="/Admin/RefreshDbCache">
							Refresh NHibernate 2nd level cache{/* LOC */}
						</a>
					</p>
					<p>
						<a href="/Admin/ClearCaches">
							Refresh .NET memory cache{/* LOC */}
						</a>
					</p>
				</>
			)}
		</Layout>
	);
};

export default AdminIndex;
