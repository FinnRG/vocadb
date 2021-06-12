import VenueRepository from '@Repositories/VenueRepository';
import ui from '@Shared/MessagesTyped';
import vdb from '@Shared/VdbStatic';

import { IEntryReportType } from '../ReportEntryViewModel';
import ReportEntryViewModel from '../ReportEntryViewModel';

export default class VenueDetailsViewModel {
	public constructor(
		repo: VenueRepository,
		reportTypes: IEntryReportType[],
		public loggedUserId: number,
		venueId: number,
	) {
		this.reportViewModel = new ReportEntryViewModel(
			reportTypes,
			(reportType, notes) => {
				repo.createReport(venueId, reportType, notes, null!);
				ui.showSuccessMessage(vdb.resources.shared.reportSent);
			},
		);
	}

	public reportViewModel: ReportEntryViewModel;
}
