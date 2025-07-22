using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace DAL
{
    //כרטיס מנוי
    public class SubscriptionCard
    {
        [Key]
        public int  PurchaseCode { get; set; }
        
        public DateTime PurchaseDate { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual List<Package> ?Packages{ get; set; }

        public int Subscriptions { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]

        public virtual Subscriptions Subscription { get; set; }



    }
}
