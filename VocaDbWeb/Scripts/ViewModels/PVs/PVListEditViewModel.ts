import PVContract from '@DataContracts/PVs/PVContract';
import DateTimeHelper from '@Helpers/DateTimeHelper';
import PVServiceIcons from '@Models/PVServiceIcons';
import PVRepository from '@Repositories/PVRepository';
import { HttpClientError } from '@Shared/HttpClient';
import UrlMapper from '@Shared/UrlMapper';
import $ from 'jquery';
import ko, { ObservableArray } from 'knockout';
import _ from 'lodash';

import PVEditViewModel from './PVEditViewModel';

export default class PVListEditViewModel {
	public constructor(
		private readonly repo: PVRepository,
		public urlMapper: UrlMapper, // Used from the view to map to PV listing
		pvs: PVContract[],
		public canBulkDeletePVs: boolean,
		public showPublishDates: boolean,
		public allowDisabled: boolean,
	) {
		this.pvServiceIcons = new PVServiceIcons(urlMapper);
		this.pvs = ko.observableArray(_.map(pvs, (pv) => new PVEditViewModel(pv)));
	}

	public add = (): void => {
		var newPvUrl = this.newPvUrl();

		if (!newPvUrl) return;

		var pvType = this.newPvType();

		this.repo
			.getPVByUrl(newPvUrl, this.newPvType())
			.then((pv) => {
				this.newPvUrl('');
				this.isPossibleInstrumental(this.isPossibleInstrumentalPv(pv));
				this.pvs.push(new PVEditViewModel(pv, pvType));
			})
			.catch(({ response }: HttpClientError) => {
				const error = response?.data || response?.statusText;

				if (error) alert(error);
			});
	};

	public formatLength = (seconds: number): string => {
		return DateTimeHelper.formatFromSeconds(seconds);
	};

	public getPvServiceIcon = (service: string): string => {
		return this.pvServiceIcons.getIconUrl(service);
	};

	public isPossibleInstrumental = ko.observable(false);

	// Attempts to identify whether the PV could be instrumental
	private isPossibleInstrumentalPv = (pv: PVContract): boolean => {
		return (
			!!pv &&
			!!pv.name &&
			(pv.name.toLowerCase().indexOf('inst.') >= 0 ||
				pv.name.toLowerCase().indexOf('instrumental') >= 0 ||
				pv.name.indexOf('カラオケ') >= 0 ||
				pv.name.indexOf('オフボーカル') >= 0)
		);
	};

	public newPvType = ko.observable('Original');

	public newPvUrl = ko.observable('');

	public pvs: ObservableArray<PVEditViewModel>;

	public pvServiceIcons: PVServiceIcons;

	public remove = (pv: PVEditViewModel): void => {
		this.pvs.remove(pv);
	};

	public toContracts: () => PVContract[] = () => {
		return ko.toJS(this.pvs());
	};

	public uploadMedia = (): void => {
		var input: any = $('#uploadMedia')[0];
		var fd = new FormData();

		fd.append('file', input.files[0]);
		$.ajax({
			url: '/Song/PostMedia/',
			data: fd,
			processData: false,
			contentType: false,
			type: 'POST',
			success: (result) => {
				this.pvs.push(new PVEditViewModel(result, 'Original'));
			},
			error: (result) => {
				var text = result.status === 404 ? 'File too large' : result.statusText;
				alert('Unable to post file: ' + text);
			},
		});
	};
}
