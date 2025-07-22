
using DAL;
using DTO;
using AutoMapper;
using BLL.cast;

namespace BLL

{
    public class BooksRepository : IRepository<BooksDTO>

    {
        private Dblibrary Dblibrary;
        private IMapper mapper;

        public BooksRepository(Dblibrary dblibrary,IMapper mapper)
        {
            Dblibrary = dblibrary;
            this.mapper = mapper;
        }

        public BooksDTO Add(BooksDTO entity)
        {
            Dblibrary.Book.Add(mapper.Map<Books>(entity));
            Dblibrary.SaveChanges();
            return mapper.Map < BooksDTO > (entity);

        }

       

        public void Delete(BooksDTO entity)
        {
            Dblibrary.Book.Remove(mapper.Map<Books>(entity));
            Dblibrary.SaveChanges();

        }

        public BooksDTO GetBy(BooksDTO entity)
        {
            throw new NotImplementedException();
        }

        public BooksDTO GetById(int id)
        {
            return mapper.Map<BooksDTO>(Dblibrary.Book.Find(id));

        }

        public BooksDTO Update(BooksDTO entity)
        {
            Dblibrary.Book.Update(mapper.Map < Books> (entity));
            Dblibrary.SaveChanges();
            return mapper.Map < BooksDTO > (entity);


        }

        public  List<BooksDTO> GetAll()
        {
            return mapper.Map<List<BooksDTO>>(Dblibrary.Packages).ToList();
           
        }
    }
}