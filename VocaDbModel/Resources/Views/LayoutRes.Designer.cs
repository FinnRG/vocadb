﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace VocaDb.Model.Resources.Views
{
	using System;


	/// <summary>
	///   A strongly-typed resource class, for looking up localized strings, etc.
	/// </summary>
	// This class was auto-generated by the StronglyTypedResourceBuilder
	// class via a tool like ResGen or Visual Studio.
	// To add or remove a member, edit your .ResX file then rerun ResGen
	// with the /str option, or rebuild your VS project.
	[global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "16.0.0.0")]
	[global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
	[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
	public class LayoutRes
	{
		private static global::System.Resources.ResourceManager resourceMan;

		private static global::System.Globalization.CultureInfo resourceCulture;

		[global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
		internal LayoutRes()
		{
		}

		/// <summary>
		///   Returns the cached ResourceManager instance used by this class.
		/// </summary>
		[global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
		public static global::System.Resources.ResourceManager ResourceManager
		{
			get
			{
				if (object.ReferenceEquals(resourceMan, null))
				{
					global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("VocaDb.Model.Resources.Views.LayoutRes", typeof(LayoutRes).Assembly);
					resourceMan = temp;
				}
				return resourceMan;
			}
		}

		/// <summary>
		///   Overrides the current thread's CurrentUICulture property for all
		///   resource lookups using this strongly typed resource class.
		/// </summary>
		[global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
		public static global::System.Globalization.CultureInfo Culture
		{
			get
			{
				return resourceCulture;
			}
			set
			{
				resourceCulture = value;
			}
		}

		/// <summary>
		///   Looks up a localized string similar to Vocaloid, VocaDB, Vocaloid database, Hatsune Miku, UTAU.
		/// </summary>
		public static string Keywords
		{
			get
			{
				return ResourceManager.GetString("Keywords", resourceCulture);
			}
		}

		/// <summary>
		///   Looks up a localized string similar to VocaDB is a non-profit project. All money will be used for further site development, hosting fees and software licenses..
		/// </summary>
		public static string PaypalDonateTitle
		{
			get
			{
				return ResourceManager.GetString("PaypalDonateTitle", resourceCulture);
			}
		}

		/// <summary>
		///   Looks up a localized string similar to VocaDB.
		/// </summary>
		public static string SiteName
		{
			get
			{
				return ResourceManager.GetString("SiteName", resourceCulture);
			}
		}

		/// <summary>
		///   Looks up a localized string similar to Vocaloid Database.
		/// </summary>
		public static string SiteTitle
		{
			get
			{
				return ResourceManager.GetString("SiteTitle", resourceCulture);
			}
		}
	}
}
