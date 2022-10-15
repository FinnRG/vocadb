import { Layout } from '@/Components/Shared/Layout';
import { useVdbTitle } from '@/Components/useVdbTitle';
import { ReleaseEventContract } from '@/DataContracts/ReleaseEvents/ReleaseEventContract';
import { EntryType } from '@/Models/EntryType';
import { EntryUrlMapper } from '@/Shared/EntryUrlMapper';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface EventEventsByDateLayoutProps {
	model: ReleaseEventContract[];
}

const EventEventsByDateLayout = ({
	model,
}: EventEventsByDateLayoutProps): React.ReactElement => {
	const { t, ready } = useTranslation(['ViewRes']);

	const title = t('ViewRes:Shared.ReleaseEvents');

	useVdbTitle(title, ready);

	const byYear = React.useMemo(
		() =>
			_.chain(model)
				.filter((event) => !!event.date)
				.groupBy((event) => moment(event.date!).format('YYYY'))
				.value(),
		[model],
	);

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
						<li>
							<Link to="/Event/EventsByVenue">
								{t('ViewRes.Event:EventsBySeries.ViewByVenue')}
							</Link>
						</li>
						<li className="active">
							<Link to="/Event/EventsByDate">
								{t('ViewRes.Event:EventsBySeries.ViewByDate')}
							</Link>
						</li>
					</ul>
				</>
			}
		>
			<table>
				<tbody>
					{Object.entries(byYear).map(([year, events], index) => (
						<React.Fragment key={index}>
							<tr>
								<td className="alginTop" colSpan={2}>
									<h3>{year}</h3>
								</td>
							</tr>

							{events.map((event, index) => (
								<tr key={index}>
									<td>{/* TODO */}</td>
									<td>
										<Link
											to={EntryUrlMapper.details(
												EntryType.ReleaseEvent,
												event.id,
												event.urlSlug,
											)}
										>
											{event.name}
										</Link>
									</td>
								</tr>
							))}
						</React.Fragment>
					))}
				</tbody>
			</table>
		</Layout>
	);
};

const EventEventsByDate = (): React.ReactElement => {
	const [model, setModel] = React.useState<ReleaseEventContract[]>();

	return model ? <EventEventsByDateLayout model={model} /> : <></>;
};

export default EventEventsByDate;
