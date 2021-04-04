#nullable disable

using System;
using VocaDb.Model.Domain;
using VocaDb.Model.Domain.ReleaseEvents;
using VocaDb.Model.Service.Paging;
using VocaDb.Model.Service.QueryableExtensions;

namespace VocaDb.Model.Service.Search.Events
{
	public class EventQueryParams
	{
		public DateTime? AfterDate { get; set; }
		public DateTime? BeforeDate { get; set; }
		public EventCategory Category { get; set; }
		public bool ChildTags { get; set; }
		public PagingProperties Paging { get; set; }
		public int SeriesId { get; set; }
		public SortDirection? SortDirection { get; set; }
		public EventSortRule SortRule { get; set; }
		public EntryStatus? EntryStatus { get; set; }
#nullable enable
		public int[]? TagIds { get; set; }
#nullable disable
		public SearchTextQuery TextQuery { get; set; } = SearchTextQuery.Empty;
		public int UserId { get; set; }

		public EntryIdsCollection ArtistIds { get; set; }
		public bool ChildVoicebanks { get; set; }
		public bool IncludeMembers { get; set; }
	}
}
