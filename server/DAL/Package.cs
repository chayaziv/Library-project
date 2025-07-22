using System.ComponentModel.DataAnnotations;
namespace DAL
{
    public class Package
    {
        [Key]
        public int Id { get; set; }
        public int PointCount { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int CategoryId { get; set; }
        public virtual Category? Category { get; set; }

    }
}
