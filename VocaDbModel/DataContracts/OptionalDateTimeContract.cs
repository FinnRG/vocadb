#nullable disable

using System.Runtime.Serialization;
using VocaDb.Model.Domain;

namespace VocaDb.Model.DataContracts
{
	[DataContract(Namespace = Schemas.VocaDb)]
	public class OptionalDateTimeContract : IOptionalDateTime
	{
		public OptionalDateTimeContract() { }

#nullable enable
		public OptionalDateTimeContract(OptionalDateTime dateTime)
		{
			ParamIs.NotNull(() => dateTime);

			Day = dateTime.Day;
			IsEmpty = dateTime.IsEmpty;
			Month = dateTime.Month;
			Year = dateTime.Year;
			Formatted = dateTime.ToString();
		}
#nullable disable

		[DataMember]
		public int? Day { get; init; }

		[DataMember]
		public string Formatted { get; set; }

		[DataMember]
		public bool IsEmpty { get; init; }

		[DataMember]
		public int? Month { get; init; }

		[DataMember]
		public int? Year { get; init; }
	}
}
