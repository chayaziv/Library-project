using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class PackageUser
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int PackageId { get; set; }
        public virtual Package Package { get; set; }
        public bool IsActive { get; set; }
        public int RemainingPoints { get; set; }
        public DateTime PurchaseDate { get; set; } = new DateTime();

    }
}
