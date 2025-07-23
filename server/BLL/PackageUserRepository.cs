
using DAL;
using System.Linq.Expressions;

namespace BLL
    {
        public class PackageUserRespository : IRepository<PackageUser>

        {
            private readonly Dblibrary Dblibrary;

            public PackageUserRespository(Dblibrary dblibrary)
            {
                Dblibrary = dblibrary;
            }

            public PackageUser Add(PackageUser entity)
            {
                Dblibrary.PackageUser.Add(entity);
                Dblibrary.SaveChanges();
                return entity;

            }

            public void Delete(PackageUser entity)
            {
                Dblibrary.PackageUser.Remove(entity);
                Dblibrary.SaveChanges();

            }

            public PackageUser GetBy(PackageUser entity)
            {
                throw new NotImplementedException();
            }

            public PackageUser GetById(int id)
            {
                return Dblibrary.PackageUser.Find(id);

            }

            public PackageUser Update(PackageUser entity)
            {
                Dblibrary.PackageUser.Update(entity);
                Dblibrary.SaveChanges();
                return entity;
            }
            public List<PackageUser> GetAll()
            {
                return Dblibrary.PackageUser.ToList();
            }

            public List<PackageUser> GetAll(Expression<Func<PackageUser, bool>>? filter)
            {
                IQueryable<PackageUser> query = Dblibrary.PackageUser;

                if (filter != null)
                {
                    query = query.Where(filter);
                }

                return query.ToList();
            }
        }
    }

