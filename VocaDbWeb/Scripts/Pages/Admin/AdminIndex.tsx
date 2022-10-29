import { Layout } from '@/Components/Shared/Layout';
import { useVocaDbTitle } from '@/Components/useVocaDbTitle';
import { LoginManager } from '@/Models/LoginManager';
import React from 'react';
import { Link } from 'react-router-dom';

const loginManager = new LoginManager(vdb.values);

const AdminIndex = (): React.ReactElement => {
	const title = 'Site management'; /* TODO: localize */

	useVocaDbTitle(title, true);

	return (
		<Layout title={title}>
			<h3>Common tasks{/* TODO: localize */}</h3>

			<p>
				<Link to="/User">View users list{/* TODO: localize */}</Link>
			</p>

			<p>
				<Link to="/Comment">View recent comments{/* TODO: localize */}</Link>
			</p>

			{loginManager.canViewAuditLog && (
				<p>
					<Link to="/Admin/ViewAuditLog">
						View audit log{/* TODO: localize */}
					</Link>
				</p>
			)}

			{loginManager.canManageTagMappings && (
				<>
					<p>
						<Link to="/Admin/ManageTagMappings">
							Manage tag mappings{/* TODO: localize */}
						</Link>
					</p>
					<p>
						<Link to="/Admin/ManageEntryTagMappings">
							Manage entry type to tag mappings{/* TODO: localize */}
						</Link>
					</p>
				</>
			)}

			{loginManager.canManageEntryReports && (
				<p>
					<a href="/Admin/ViewEntryReports">
						Manage entry reports{/* TODO: localize */}
					</a>
				</p>
			)}

			{loginManager.canBulkDeletePVs && (
				<p>
					<a href="/Admin/PVsByAuthor">
						Delete PVs by author{/* TODO: localize */}
					</a>
				</p>
			)}

			{loginManager.canMoveToTrash && (
				<p>
					<Link to="/Album/Deleted">
						Manage deleted albums{/* TODO: localize */}
					</Link>
				</p>
			)}

			{loginManager.canManageIPRules && (
				<p>
					<Link to="/Admin/ManageIPRules">
						Manage IP rules{/* TODO: localize */}
					</Link>
				</p>
			)}

			{loginManager.canManageWebhooks && (
				<p>
					<Link to="/Admin/ManageWebhooks">
						Manage webhooks{/* TODO: localize */}
					</Link>
				</p>
			)}

			<br />

			{loginManager.canAdmin && (
				<>
					<h3>Database maintenance tasks{/* TODO: localize */}</h3>
					<p>
						<a href="/Admin/ActiveEdits">
							View active editors{/* TODO: localize */}
						</a>
					</p>
					<p>
						<a href="/Admin/CreateJsonDump">
							Create JSON dump{/* TODO: localize */}
						</a>
					</p>
					<p>
						<a href="/Admin/RefreshDbCache">
							Refresh NHibernate 2nd level cache{/* TODO: localize */}
						</a>
					</p>
					<p>
						<a href="/Admin/ClearCaches">
							Refresh .NET memory cache{/* TODO: localize */}
						</a>
					</p>
					<p>
						<a href="/Admin/ConvertToUtc">
							Convert to UTC{/* TODO: localize */}
						</a>
					</p>
				</>
			)}
		</Layout>
	);
};

export default AdminIndex;
