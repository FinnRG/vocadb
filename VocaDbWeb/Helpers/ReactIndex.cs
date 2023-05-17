using System.Text;
using VocaDb.Web.Code;

namespace VocaDb.Web.Helpers;

public static class ReactIndex
{
	public static byte[] ToHtmlBytes(IWebHostEnvironment environment, PagePropertiesData properties)
	{
		var file = File.ReadAllBytes("index.html");

		// Get the path of the index.html file in the wwwroot folder
		string wwwRootPath = environment.WebRootPath;
		string filePath = Path.Combine(wwwRootPath, "index.html");

		// Read the content of index.html file
		string content = System.IO.File.ReadAllText(filePath);
		content = content.Replace("{{title}}", properties.Title);

		return Encoding.UTF8.GetBytes(content);
	}
}
