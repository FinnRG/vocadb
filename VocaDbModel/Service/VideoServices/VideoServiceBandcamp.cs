using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NYoutubeDL;
using NYoutubeDL.Models;
using VocaDb.Model.Domain.PVs;

namespace VocaDb.Model.Service.VideoServices {
	public class VideoServiceBandcamp : VideoService {

		public static readonly RegexLinkMatcher[] Matchers =
		{
			new RegexLinkMatcher(".bandcamp.com/album/{0}", @".bandcamp.com/album/([\w\-]+)"),
			new RegexLinkMatcher(".bandcamp.com/track/{0}", @".bandcamp.com/track/([\w\-]+)")
		};

		public override async Task<VideoUrlParseResult> ParseByUrlAsync(string url, bool getTitle) {
			var youtubeDl = new YoutubeDL();
			var result = await youtubeDl.GetDownloadInfoAsync(url);
			var info = result as VideoDownloadInfo;
			DateTime? date = null;
			if (DateTime.TryParse(info.UploadDate, out var parsedDate)) {
				date = parsedDate;
			}
			var meta = VideoTitleParseResult.CreateSuccess(info.Title, info.Uploader, info.UploaderId, info.Thumbnail, info.Duration, uploadDate: date);
			return VideoUrlParseResult.CreateOk(url, PVService.Bandcamp, info.Id, meta);
		}

		public VideoServiceBandcamp() : base(PVService.Bandcamp, null, Matchers) {}

	}
}
