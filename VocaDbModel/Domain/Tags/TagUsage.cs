#nullable disable

using System;
using System.Linq;
using System.Collections.Generic;
using VocaDb.Model.Domain.Users;

namespace VocaDb.Model.Domain.Tags
{
	/// <summary>
	/// Tag attached to an entry (song, album, artist).
	/// Tag usage may have multiple votes (<see cref="TagVote"/>), at most one vote per user.
	/// </summary>
	public abstract class TagUsage : IEntryWithLongId, ITagLink
	{
		private Tag _tag;

		protected TagUsage()
		{
			Date = DateTime.Now;
		}

		protected TagUsage(Tag tag) : this()
		{
			Tag = tag;
		}

		/// <summary>
		/// Number of votes.
		/// </summary>
		public virtual int Count { get; set; }

		/// <summary>
		/// Date when this usage was first created.
		/// </summary>
		public virtual DateTime Date { get; set; }

		/// <summary>
		/// Attached entry. Cannot be null.
		/// </summary>
		public abstract IEntryBase EntryBase { get; }

		public virtual bool HasVotes => Count > 0;

		public virtual long Id { get; set; }

		public virtual Tag Tag
		{
			get => _tag;
			set
			{
				ParamIs.NotNull(() => value);
				_tag = value;
			}
		}

		/// <summary>
		/// List of individual votes by users. Cannot be null.
		/// </summary>
		public abstract IEnumerable<TagVote> VotesBase { get; }

		/// <summary>
		/// Adds a vote for a specific user.
		/// </summary>
		/// <param name="user">User voting for this tag usage.</param>
		/// <returns>Created tag vote, or null if the user has already voted.</returns>
		/// <remarks>
		/// It is safe to call this method multiple times for the same user: if the user has already voted for this same tag, this method will do nothing.
		/// </remarks>
		public abstract TagVote CreateVote(User user);

		/// <summary>
		/// Deletes tag usage and performs any necessary cleanup associated with that.
		/// </summary>
		/// <remarks>
		/// Derived methods must call this base implementation.
		/// </remarks>
		public virtual void Delete()
		{
			Count = 0;
			Tag.UsageCount--;
		}

		public virtual bool Equals(TagUsage another)
		{
			if (another == null)
				return false;

			if (ReferenceEquals(this, another))
				return true;

			if (Id == 0)
				return false;

			return Id == another.Id;
		}

		public override bool Equals(object obj)
		{
			return Equals(obj as TagUsage);
		}

		public override int GetHashCode()
		{
			var format = $"{Tag.Id}_{EntryBase.EntryType}{EntryBase.Id}";
			return format.GetHashCode();
		}

#nullable enable
		public virtual bool HasVoteByUser(User user)
		{
			ParamIs.NotNull(() => user);

			return VotesBase.Any(v => v.User.Equals(user));
		}
#nullable disable

		/// <summary>
		/// Moves this tag usage from one tag to another.
		/// </summary>
		/// <param name="target">Target tag. Cannot be null.</param>
		public abstract TagUsage Move(Tag target);

		public abstract TagVote RemoveVote(User user);

		public override string ToString()
		{
			return $"{Tag} for {EntryBase} [{Id}]";
		}
	}
}
