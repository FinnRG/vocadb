import PVService from '@Models/PVs/PVService';
import $ from 'jquery';

import { IPVPlayer } from './PVPlayerViewModel';

export default class PVPlayerSoundCloud implements IPVPlayer {
	public constructor(
		private playerElementId: string,
		private wrapperElement: HTMLElement,
		public songFinishedCallback: () => void = null!,
	) {}

	public attach = (
		reset: boolean = false,
		readyCallback?: () => void,
	): void => {
		if (!reset && this.player) {
			if (readyCallback) readyCallback();
			return;
		}

		if (reset) {
			$(this.wrapperElement).empty();
			$(this.wrapperElement).append(
				$(
					"<div id='" +
						this.playerElementId +
						"' src='" +
						window.location.protocol +
						"//w.soundcloud.com/player/' />",
				),
			);
		}

		this.player = SC.Widget(this.playerElementId);
		this.player.bind(SC.Widget.Events.FINISH, () => {
			if (this.player && this.songFinishedCallback) this.songFinishedCallback();
		});

		this.player.bind(SC.Widget.Events.READY, () => {
			if (readyCallback) readyCallback();
		});

		this.player.bind(SC.Widget.Events.ERROR, () => {
			// Some delay, to let the user read the error message and to prevent infinite loop
			setTimeout(() => {
				if (this.player && this.songFinishedCallback)
					this.songFinishedCallback();
			}, 3000);
		});
	};

	public detach = (): void => {
		if (this.player) {
			this.player.unbind(SC.Widget.Events.FINISH);
		}

		this.player = null!;
	};

	private getUrlFromId = (pvId: string): string | null => {
		if (!pvId) return null;

		var parts = pvId.split(' ');
		var url = 'http://api.soundcloud.com/tracks/' + parts[0];
		return url;
	};

	private player: SC.SoundCloudWidget = null!;

	public play = (pvId?: string): void => {
		if (!this.player) this.attach(false);

		if (pvId) {
			this.player.load(this.getUrlFromId(pvId)!, { auto_play: true });
		} else {
			this.player.play();
		}
	};

	public service = PVService.SoundCloud;
}
