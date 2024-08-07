import SafeAnchor from '@/Bootstrap/SafeAnchor';
import { MomentJsTimeAgo } from '@/Components/KnockoutExtensions/MomentJsTimeAgo';
import { FormatMarkdown } from '@/Components/Shared/Partials/Html/FormatMarkdown';
import { UserIconLink_UserForApiContract } from '@/Components/Shared/Partials/User/UserIconLink_UserForApiContract';
import { truncateWithEllipsis } from '@/Components/truncateWithEllipsis';
import { CommentContract } from '@/DataContracts/CommentContract';
import { useLoginManager } from '@/LoginManagerContext';
import { useMutedUsers } from '@/MutedUsersContext';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface PrintCommentProps {
	contract: CommentContract;
	allowDelete: boolean;
	alwaysAllowDelete?: boolean;
	maxLength?: number;
}

export const PrintComment = observer(
	({
		contract,
		allowDelete,
		alwaysAllowDelete = false,
		maxLength = 2147483647,
	}: PrintCommentProps): React.ReactElement => {
		const loginManager = useLoginManager();

		const { t } = useTranslation(['ViewRes']);

		const mutedUsers = useMutedUsers();
		if (mutedUsers.includes(contract.author.id)) return <></>;

		return (
			<div className="comment">
				<h3>
					{/* eslint-disable-next-line react/jsx-pascal-case */}
					<UserIconLink_UserForApiContract
						indicateUserGroup
						user={contract.author}
						size={25}
					/>

					{(alwaysAllowDelete ||
						(allowDelete && loginManager.canDeleteComment(contract))) && (
						<>
							-{' '}
							<SafeAnchor href="#" /* TODO */ className="deleteComment">
								{t('ViewRes:Shared.Delete')}
							</SafeAnchor>
						</>
					)}
					<MomentJsTimeAgo as="small" className="pull-right extraInfo">
						{contract.created}
					</MomentJsTimeAgo>
				</h3>
				<FormatMarkdown
					text={truncateWithEllipsis(contract.message, maxLength)}
				/>
			</div>
		);
	},
);
