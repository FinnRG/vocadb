import { Layout } from '@/Components/Shared/Layout';
import { useVdbTitle } from '@/Components/useVdbTitle';
import JQueryUIButton from '@/JQueryUI/JQueryUIButton';
import { LoginManager } from '@/Models/LoginManager';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const loginManager = new LoginManager(vdb.values);

interface EventEventsByVenueLayoutProps {}

const EventEventsByVenueLayout = ({}: EventEventsByVenueLayoutProps): React.ReactElement => {
	const { t, ready } = useTranslation(['ViewRes']);

	const title = t('ViewRes:Shared.ReleaseEvents');

	useVdbTitle(title, ready);

	return (
		<Layout
			title={title}
			toolbar={
				<>
					<ul className="nav nav-pills">
						<li>
							<Link to="/Event">
								{t('ViewRes.Event:EventsBySeries.ViewList')}
							</Link>
						</li>
						<li>
							<Link to="/Event/EventsBySeries">
								{t('ViewRes.Event:EventsBySeries.ViewBySeries')}
							</Link>
						</li>
						<li className="active">
							<Link to="/Event/EventsByVenue">
								{t('ViewRes.Event:EventsBySeries.ViewByVenue')}
							</Link>
						</li>
						<li>
							<Link to="/Event/EventsByDate">
								{t('ViewRes.Event:EventsBySeries.ViewByDate')}
							</Link>
						</li>
					</ul>

					{loginManager.canManageDatabase && (
						<>
							<JQueryUIButton
								as={Link}
								to={`/Event/Edit`}
								icons={{ primary: 'ui-icon-plus' }}
							>
								{t('ViewRes.Event:EventsBySeries.CreateEvent')}
							</JQueryUIButton>{' '}
							<JQueryUIButton
								as={Link}
								to="/Event/EditSeries"
								icons={{ primary: 'ui-icon-plus' }}
							>
								{t('ViewRes.Event:EventsBySeries.CreateSeries')}
							</JQueryUIButton>{' '}
							<JQueryUIButton
								as={Link}
								to="/Venue/Edit"
								icons={{ primary: 'ui-icon-plus' }}
							>
								{t('ViewRes.Event:EventsBySeries.CreateVenue')}
							</JQueryUIButton>
						</>
					)}
				</>
			}
		>
			{/* TODO */}
		</Layout>
	);
};

const EventEventsByVenue = (): React.ReactElement => {
	return <EventEventsByVenueLayout />;
};

export default EventEventsByVenue;
