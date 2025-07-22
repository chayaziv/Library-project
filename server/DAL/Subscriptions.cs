namespace DAL
{
    //מנויים
    public class Subscriptions
    {
        [key]
        public int UserCode { get; set; }
        public int Id { get; set; }

        public int Password { get; set; }
        public string Name { get; set; }

        public string? Email { get; set; }
        
        public int?  Phone { get; set; }
        

        //public virtual List<Subscriptions> Subscription { get; set; }
    }
}
