using DAL;
using System.Linq.Expressions;
namespace BLL
{
    public class PackagesRespository : IRepository<Package>

    {
        private readonly Dblibrary Dblibrary;

        public PackagesRespository(Dblibrary dblibrary)
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

        public List<Package> GetAll(Expression<Func<Package, bool>>? filter = null)
        {
            return Dblibrary.Packages.ToList();
        }
    }
}