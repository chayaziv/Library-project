using System.Text.Json.Serialization;
namespace DAL
{
    public class Category
    {  
        public int Id { get; set; }  
        public string? Name { get; set; }
        [JsonIgnore]
        public virtual List<Book>? Books { get; set; }
    }
}
