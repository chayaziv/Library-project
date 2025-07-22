using DAL;
namespace BLL
{
    public class CardRedemptionRepository : IRepository<CardRedemption>

    {
        private Dblibrary Dblibrary;

        public CardRedemptionRepository(Dblibrary dblibrary)
        {
            Dblibrary = dblibrary;
        }

        public CardRedemption Add(CardRedemption entity)
        {
            Dblibrary.CardRedemptions.Add(entity);
            Dblibrary.SaveChanges();
            return entity;

        }

        public void Delete(CardRedemption entity)
        {
            Dblibrary.CardRedemptions.Remove(entity);
            Dblibrary.SaveChanges();

        }

        public CardRedemption GetBy(CardRedemption entity)
        {
            throw new NotImplementedException();
        }

        public CardRedemption GetById(int id)
        {
            return Dblibrary.CardRedemptions.Find(id);

        }

        public CardRedemption Update(CardRedemption entity)
        {
            Dblibrary.CardRedemptions.Update(entity);
            Dblibrary.SaveChanges();
            return entity;


        }

        public List<CardRedemption> GetAll()
        {
            
                return Dblibrary.CardRedemptions.ToList();


        }
    }
}