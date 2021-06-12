import SongRepository from '@Repositories/SongRepository';
import ui from '@Shared/MessagesTyped';
import vdb from '@Shared/VdbStatic';

import ReportEntryViewModel from '../ReportEntryViewModel';

export default class ArchivedSongViewModel {
	public constructor(
		songId: number,
		versionNumber: number,
		private repository: SongRepository,
	) {
		this.reportViewModel = new ReportEntryViewModel(
			null!,
			(reportType, notes) => {
				repository.createReport(songId, reportType, notes, versionNumber);

				ui.showSuccessMessage(vdb.resources.shared.reportSent);
			},
			{ notesRequired: true, id: 'Other', name: null! },
		);
	}

	public reportViewModel: ReportEntryViewModel;
}
