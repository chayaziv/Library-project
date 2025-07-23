using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DAL
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? Password { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }        
        public string?  Phone { get; set; }
        [JsonIgnore]
        public virtual List<PackageUser>? PackageUsers { get; set; }
        public virtual List<BookUser>? BooksUser { get; set; }

        public override string ToString()
        {
            return $"Id: {Id}, Name: {Name}, Email: {Email}, Phone: {Phone}, Password: {(string.IsNullOrEmpty(Password) ? "N/A" : "****")}, " +
                   $"PackageUsers: {(PackageUsers != null ? PackageUsers.Count : 0)}, BooksUser: {(BooksUser != null ? BooksUser.Count : 0)}";
        }

    }
}
