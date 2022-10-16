import Alert from '@/Bootstrap/Alert';
import Button from '@/Bootstrap/Button';
import { Layout } from '@/Components/Shared/Layout';
import { useVdbTitle } from '@/Components/useVdbTitle';
import React from 'react';
import { useTranslation } from 'react-i18next';

const UserCreate = (): React.ReactElement => {
	const { t, ready } = useTranslation(['ViewRes.User']);

	const title = t('ViewRes.User:Create.Register');

	useVdbTitle(title, ready);

	return (
		<Layout title={title} /* TODO */>
			{false /* TODO */ ? (
				<Alert>
					Sorry - signups are disabled at the moment on this site.
					{/* LOCALIZE */}
				</Alert>
			) : (
				<form /* TODO */>
					<div className="row-fluid">
						<div className="span5 well well-transparent">
							<div className="editor-label">
								<label htmlFor="userName">
									{t('ViewRes.User:Create.Username')}
								</label>
							</div>
							<div className="editor-field">
								<input type="text" id="userName" size={40} maxLength={100} />
								{/* TODO: ValidationMessageFor */}
							</div>

							<div className="editor-label">
								<label htmlFor="password">
									{t('ViewRes.User:Create.Password')}
								</label>
							</div>
							<div className="editor-field">
								<input
									type="password"
									id="password"
									size={40}
									maxLength={100}
								/>
								{/* TODO: ValidationMessageFor */}
							</div>

							<div className="editor-label">
								<label htmlFor="email">{t('ViewRes.User:Create.Email')}</label>
							</div>
							<div className="editor-field">
								<input type="text" id="email" size={40} maxLength={50} />
								{/* TODO: ValidationMessageFor */}
							</div>

							<div className="editor-label">
								{t('ViewRes.User:Create.Captcha')}
							</div>
							<div className="editor-field">
								{/* TODO */}

								{/* TODO: ValidationMessageFor */}
							</div>

							<div className="editor-field" style={{ display: 'none' }}>
								<input type="text" id="extra" name="extra" />
							</div>

							<br />
							<br />
							<p>
								<Button type="submit" variant="primary">
									{t('ViewRes.User:Create.DoRegister')}
								</Button>
							</p>

							<hr />
							<a href="/User/LoginTwitter">
								<img
									src="/Content/Sign-in-with-Twitter-darker.png"
									alt={t('ViewRes.User:Create.LoginWithTwitter')}
								/>
							</a>

							<br />
							<br />
							<small>
								<a
									href="https://wiki.vocadb.net/wiki/50/privacy-and-cookie-policy"
									target="_blank"
									rel="noreferrer"
								>
									{t('ViewRes:Layout.PrivacyPolicy')}
								</a>
							</small>
						</div>

						<div className="span3">
							<Alert variant="info">
								{t('ViewRes.User:Create.UsernameNote', { 0: 8 })}
							</Alert>
							<Alert variant="info">{t('ViewRes.User:Create.EmailNote')}</Alert>
							<Alert variant="info">
								{t('ViewRes.User:Create.TwitterNote')}
							</Alert>
							<Alert variant="info">
								{t('ViewRes.User:Create.DuplicateUserWarning')}
							</Alert>
						</div>
					</div>
				</form>
			)}
		</Layout>
	);
};

export default UserCreate;
