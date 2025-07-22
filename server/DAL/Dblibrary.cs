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

        

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        // optionsBuilder.UseSqlServer(@"Data Source=localhost;Initial Catalog=Library;Integrated Security=True;Trusted_Connection=True");
        //}


        public DbSet<Books> Book { get; set; }
        public DbSet<CardRedemption> CardRedemptions { get; set; }
        public DbSet<Package> Packages { get; set; }

        public DbSet<SubscriptionCard> SubscriptionCards { get; set; }

        public DbSet<Subscriptions> Subscription { get; set; }
        public DbSet<Category> Categories { get; set; }   

    }
}

