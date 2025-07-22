using System.ComponentModel.DataAnnotations;

namespace DAL
{
    //מנויים
    public class User
    {
        [Key]
        public int Id { get; set; }
        public int Password { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }        
        public int?  Phone { get; set; }  
        public virtual List<PackageUser>? PackageUsers { get; set; }
    }
}
