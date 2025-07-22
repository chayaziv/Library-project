using System.ComponentModel.DataAnnotations;

namespace DTO
{
    public class BooksDTO
    {
        [Key]
        public int BookCode { get; set; }
        public string BookName { get; set; }
        public int PointsPerDay { get; set; }
        public int PointsPerWeek { get; set; }
        
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        //public virtual Category Category { get; set; }

        //public List<CardRedemption> CardRedemptions { get; set; }
    }
}