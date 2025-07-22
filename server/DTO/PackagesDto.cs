using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class PackageUserDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PackageId { get; set; }
        public Package? Package { get; set; }
        public bool IsActive { get; set; }
        public int RemainingPoints { get; set; }
        public DateTime PurchaseDate { get; set; }
    }
   


}
