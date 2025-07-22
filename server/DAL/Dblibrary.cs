using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Dblibrary : DbContext
    {
        public Dblibrary(DbContextOptions<Dblibrary> options) : base(options)
        {

        }
        public DbSet<Book> Book { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<PackageUser> PackageUser { get; set; }
    }
}

