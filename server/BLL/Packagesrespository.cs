using DAL;
namespace BLL
{
    public class Packagesrespository : IRepository<Package>

    {
        private Dblibrary Dblibrary;

        public Packagesrespository(Dblibrary dblibrary)
        {
            Dblibrary = dblibrary;
        }

        public Package Add(Package entity)
        {
            Dblibrary.Packages.Add(entity);
            Dblibrary.SaveChanges();
            return entity;

        }

        public void Delete(Package entity)
        {
            Dblibrary.Packages.Remove(entity);
            Dblibrary.SaveChanges();

        }

        public Package GetBy(Package entity)
        {
            throw new NotImplementedException();
        }

        public Package GetById(int id)
        {
            return Dblibrary.Packages.Find(id);

        }

        public Package Update(Package entity)
        {
            Dblibrary.Packages.Update(entity);
            Dblibrary.SaveChanges();
            return entity;


        }
        public List<Package> GetAll()
        {
            return Dblibrary.Packages.ToList();
        }
    }
}