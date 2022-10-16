import Button from '@/Bootstrap/Button';
import { Layout } from '@/Components/Shared/Layout';
import { useVdbTitle } from '@/Components/useVdbTitle';
import qs from 'qs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const UserLogin = (): React.ReactElement => {
	const { t, ready } = useTranslation(['ViewRes', 'ViewRes.User']);

	const title = t('ViewRes.User:Login.Login');

	useVdbTitle(title, ready);

	return (
		<Layout title={title}>
			{/* TODO: ValidationSummaryDiv */}
			<form /* TODO */>
				<div className="editor-label">
					<label htmlFor="userName">{t('ViewRes.User:Login.Username')}</label>
				</div>
				<div className="editor-field">
					<input type="text" id="userName" />
					{/* TODO: ValidationMessageFor */}
				</div>

				<div className="editor-label">
					<label htmlFor="password">{t('ViewRes.User:Login.Password')}</label>
				</div>
				<div className="editor-field">
					<input type="password" id="password" />
					{/* TODO: ValidationMessageFor */}
				</div>

				<br />
				<label className="checkbox">
					<input type="checkbox" /* TODO */ />
					{t('ViewRes.User:Login.KeepMeLoggedIn')}
				</label>
				<br />

				<p>
					<Button type="submit" variant="primary">
						{t('ViewRes.User:Login.DoLogin')}
					</Button>
				</p>
			</form>
			{t('ViewRes.User:Login.NoAccount')}{' '}
			<Link to="/User/Create">{t('ViewRes.User:Login.RegisterHere')}</Link>
			{t('ViewRes:Shared.Period')}
			<br />
			{t('ViewRes.User:Login.ForgotPassword')}{' '}
			<Link to="/User/ForgotPassword">{t('ViewRes.User:Login.ResetPass')}</Link>
			{t('ViewRes:Shared.Period')}
			<br />
			<hr />
			<a
				href={`/User/LoginTwitter?${qs.stringify({
					/* TODO */
				})}`}
			>
				<img
					src="/Content/Sign-in-with-Twitter-darker.png"
					alt={t('ViewRes.User:Login.LoginWithTwitter')}
				/>
			</a>
		</Layout>
	);
};

export default UserLogin;
