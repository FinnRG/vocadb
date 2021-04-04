#nullable disable

using System;
using System.Runtime.Serialization;
using VocaDb.Model.Domain;

namespace VocaDb.Model.DataContracts
{
	[DataContract(Namespace = Schemas.VocaDb)]
	public class ArchivedEntryPictureFileContract
	{
		public ArchivedEntryPictureFileContract() { }

#nullable enable
		public ArchivedEntryPictureFileContract(EntryPictureFile entryPictureFile)
		{
			ParamIs.NotNull(() => entryPictureFile);

			Author = new ObjectRefContract(entryPictureFile.Author);
			Created = entryPictureFile.Created;
			Id = entryPictureFile.Id;
			Mime = entryPictureFile.Mime;
			Name = entryPictureFile.Name;
		}
#nullable disable

		[DataMember]
		public ObjectRefContract Author { get; init; }

		[DataMember]
		public DateTime Created { get; init; }

		[DataMember]
		public int Id { get; init; }

		[DataMember]
		public string Mime { get; init; }

		[DataMember]
		public string Name { get; init; }
	}
}
