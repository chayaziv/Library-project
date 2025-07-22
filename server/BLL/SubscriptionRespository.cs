using DAL;
namespace BLL
{
    public class SubscriptionRespository : IRepository<Subscriptions>

    {
        private Dblibrary Dblibrary;

        public SubscriptionRespository(Dblibrary dblibrary)
        {
            Dblibrary = dblibrary;
        }

        public Subscriptions Add(Subscriptions entity)
        {
            Dblibrary.Subscription.Add(entity);
            Dblibrary.SaveChanges();
            return entity;
        }

        public void Delete(Subscriptions entity)
        {
            Dblibrary.Subscription.Remove(entity);
            Dblibrary.SaveChanges();

        }

        public Subscriptions GetById(int id)
        {
            
               return (from u in Dblibrary.Subscription where u.UserCode == id select u).FirstOrDefault();
  
        }
        public Subscriptions GetBy(Subscriptions s)
        {

            return (from u in Dblibrary.Subscription where u.UserCode == s.UserCode &&u.Name==s.Name &&u.Password==s.Password select u).FirstOrDefault();

        }


        public Subscriptions Update(Subscriptions entity)
        {
            Dblibrary.Subscription.Update(entity);
            Dblibrary.SaveChanges();
            return entity;


        }
        public List<Subscriptions> GetAll()
        {
            return Dblibrary.Subscription.ToList();
        }
    }
}