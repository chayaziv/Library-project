
using DAL;

using AutoMapper;
using BLL.cast;
using System.Linq.Expressions;

namespace BLL

{
    public class BooksRepository : IRepository<Book>

    {
        private Dblibrary Dblibrary;
        private IMapper mapper;

        public BooksRepository(Dblibrary dblibrary,IMapper mapper)
        {
            Dblibrary = dblibrary;
            this.mapper = mapper;
        }

        public Book Add(Book entity)
        {
            Dblibrary.Book.Add(entity);
            Dblibrary.SaveChanges();
            return entity;

        }

       

        public void Delete(Book entity)
        {
            Dblibrary.Book.Remove(entity);
            Dblibrary.SaveChanges();

        }

        public Book GetBy(Book entity)
        {
            throw new NotImplementedException();
        }

        public Book GetById(int id)
        {
            return Dblibrary.Book.Find(id);

        }

        public Book Update(Book entity)
        {
            Dblibrary.Book.Update(entity);
            Dblibrary.SaveChanges();
            return  entity;


        }
        

        public List<Book> GetAll(Expression<Func<Book, bool>>? filter = null)
        {
            return Dblibrary.Book.ToList();

        }
    }
}