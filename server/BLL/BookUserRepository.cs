using System.Linq.Expressions;
using DAL;


namespace BLL
{
    public class BookUserRepository : IRepository<BookUser>
    {
        private readonly Dblibrary Dblibrary;

        public BookUserRepository(Dblibrary dblibrary)
        {
            Dblibrary = dblibrary;
        }

        public BookUser Add(BookUser entity)
        {
            Dblibrary.BookUser.Add(entity);
            Dblibrary.SaveChanges();
            return entity;
        }

        public void Delete(BookUser entity)
        {
            Dblibrary.BookUser.Remove(entity);
            Dblibrary.SaveChanges();
        }

        public BookUser GetBy(BookUser entity)
        {
            throw new NotImplementedException();
        }

        public BookUser GetById(int id)
        {
            return Dblibrary.BookUser.Find(id);
        }

        public BookUser Update(BookUser entity)
        {
            Dblibrary.BookUser.Update(entity);
            Dblibrary.SaveChanges();
            return entity;
        }

        public List<BookUser> GetAll()
        {
            return Dblibrary.BookUser.ToList();
        }

        public List<BookUser> GetAll(Expression<Func<BookUser, bool>>? filter)
        {
            IQueryable<BookUser> query = Dblibrary.BookUser;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            return query.ToList();
        }
    }
}
