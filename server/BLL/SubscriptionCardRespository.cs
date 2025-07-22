
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class SubscriptionCardRespository
    {
        private Dblibrary Dblibrary;

        public SubscriptionCardRespository(Dblibrary dblibrary)
        {
            Dblibrary = dblibrary;
        }

        public SubscriptionCard Add(SubscriptionCard entity)
        {
            Dblibrary.SubscriptionCards.Add(entity);
            Dblibrary.SaveChanges();
            return entity;

        }

        public void Delete(SubscriptionCard entity)
        {
            Dblibrary.SubscriptionCards.Remove(entity);
            Dblibrary.SaveChanges();

        }

        public SubscriptionCard GetById(int id)
        {
            return Dblibrary.SubscriptionCards.Find(id);

        }

        public SubscriptionCard Update(SubscriptionCard entity)
        {
            Dblibrary.SubscriptionCards.Update(entity);
            Dblibrary.SaveChanges();
            return entity;


        }
        public List<SubscriptionCard> GetAll()
        {
            return Dblibrary.SubscriptionCards.ToList();
        }
    }
}

