using System.ComponentModel.DataAnnotations;

namespace DAL
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Password { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }        
        public string?  Phone { get; set; }  
        public virtual List<PackageUser>? PackageUsers { get; set; }
        public virtual List<BookUser>? BooksUser { get; set; }
    }
}
