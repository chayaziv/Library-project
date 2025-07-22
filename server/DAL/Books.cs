using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace DAL
{
    public class Books
    {
        [Key]
        public int BookCode { get; set; }
        public string BookName { get; set; } 
        public int PointsPerDay { get; set; }
        public int PointsPerWeek { get; set; }
      
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual List<CardRedemption> ?CardRedemptions { get; set; }

       
    }
}
