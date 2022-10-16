import Button from '@/Bootstrap/Button';
import { Layout } from '@/Components/Shared/Layout';
import { useVdbTitle } from '@/Components/useVdbTitle';
import React from 'react';
import { useTranslation } from 'react-i18next';

const UserForgotPassword = (): React.ReactElement => {
	const { t, ready } = useTranslation(['ViewRes', 'ViewRes.User']);

	const title = t('ViewRes.User:ForgotPassword.RequestPasswordReset');

	useVdbTitle(title, ready);

	return (
		<Layout title={title}>
			{/* TODO: ValidationSummaryPanel */}

			<form /* TODO */>
				<div className="editor-label">
					<label htmlFor="username">{t('ViewRes:Shared.Username')}</label>
				</div>
				<div className="editor-field">
					<input type="text" id="username" />
					{/* TODO: ValidationMessageFor */}
				</div>

				<div className="editor-label">
					<label htmlFor="email">{t('ViewRes:Shared.EmailAddress')}</label>
				</div>
				<div className="editor-field">
					<input type="text" id="email" />
					{/* TODO: ValidationMessageFor */}
				</div>

				<div className="editor-label">CAPTCHA</div>
				<div className="editor-field">
					{/* TODO */}

					{/* TODO: ValidationMessageFor */}
				</div>

				<br />
				<p>
					<Button type="submit" variant="primary">
						{t('ViewRes.User:ForgotPassword.SendRequest')}
					</Button>
				</p>
			</form>
		</Layout>
	);
};

export default UserForgotPassword;
