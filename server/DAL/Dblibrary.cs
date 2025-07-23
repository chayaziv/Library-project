using Microsoft.EntityFrameworkCore;
namespace DAL
{
    public class Dblibrary : DbContext
    {
        public DbSet<Book> Book { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<PackageUser> PackageUser { get; set; }
        public DbSet<BookUser> BookUser { get; set; }
        public Dblibrary(DbContextOptions<Dblibrary> options) : base(options)
        {
        }

        
    }
}

