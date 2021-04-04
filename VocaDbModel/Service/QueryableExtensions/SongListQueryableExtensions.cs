using System;
using System.Linq;
using VocaDb.Model.Domain.Songs;
using VocaDb.Model.Service.Helpers;
using VocaDb.Model.Service.Search;

namespace VocaDb.Model.Service.QueryableExtensions
{
	public static class SongListQueryableExtensions
	{
		public static IQueryable<SongList> OrderBy(this IQueryable<SongList> query, SongListSortRule sortRule) => sortRule switch
		{
			SongListSortRule.Date => query.OrderByDate(SortDirection.Descending).ThenBy(r => r.Name),
			SongListSortRule.CreateDate => query.OrderByDescending(r => r.CreateDate),
			SongListSortRule.Name => query.OrderBy(r => r.Name),
			_ => query,
		};

		public static IOrderedQueryable<SongList> OrderByDate(this IQueryable<SongList> query, SortDirection direction)
		{
			return query.OrderBy(s => s.EventDate, direction);
		}

		public static IQueryable<SongList> WhereEventDateIsBetween(this IQueryable<SongList> query, DateTime? begin, DateTime? end)
		{
			if (begin.HasValue && end.HasValue)
				return query.Where(e => e.EventDate.DateTime != null && e.EventDate.DateTime >= begin && e.EventDate.DateTime < end);

			if (begin.HasValue)
				return query.Where(e => e.EventDate.DateTime != null && e.EventDate.DateTime >= begin);

			if (end.HasValue)
				return query.Where(e => e.EventDate.DateTime != null && e.EventDate.DateTime < end);

			return query;
		}

		public static IQueryable<SongList> WhereHasFeaturedCategory(this IQueryable<SongList> query, SongListFeaturedCategory? featuredCategory, bool allowNothing)
		{
			if (!featuredCategory.HasValue)
				return allowNothing ? query : query.Where(s => s.FeaturedCategory != SongListFeaturedCategory.Nothing);

			return query.Where(s => s.FeaturedCategory == featuredCategory.Value);
		}

		public static IQueryable<SongList> WhereHasName(this IQueryable<SongList> query, SearchTextQuery? textQuery)
		{
			if (textQuery == null || textQuery.IsEmpty)
				return query;

			return textQuery.MatchMode switch
			{
				NameMatchMode.StartsWith => query.Where(u => u.Name.StartsWith(textQuery.Query)),
				NameMatchMode.Partial => query.Where(u => u.Name.Contains(textQuery.Query)),
				NameMatchMode.Exact => query.Where(u => u.Name == textQuery.Query),
				NameMatchMode.Words => textQuery.Words.Take(FindHelpers.MaxSearchWords).Aggregate(query, (q, word) => q.Where(list => list.Name.Contains(word))),
				_ => query,
			};
		}
	}

	public enum SongListSortRule
	{
		None,

		Name,

		Date,

		CreateDate
	}
}
