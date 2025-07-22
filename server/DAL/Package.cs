using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace DAL
{
    public class Package
    {
        [Key]
        public int PackageCodePackageCode { get; set; }
        public int PointCount { get; set; }

        public int Price { get; set; }
        public string Description { get; set; }

        
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual List<CardRedemption>? CardRedemptions { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual List <SubscriptionCard>? SubscriptionCards { get; set; }


     



    }
}
