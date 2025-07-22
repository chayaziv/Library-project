using DAL;
namespace BLL
{
    public class CategoryRepository : IRepository<Category>

    {
        private Dblibrary Dblibrary;

        public CategoryRepository(Dblibrary dblibrary)
        {
            Dblibrary = dblibrary;
        }

        public Category Add(Category entity)
        {
            Dblibrary.Categories.Add(entity);
            Dblibrary.SaveChanges();
            return entity;

        }

        public void Delete(Category entity)
        {
            Dblibrary.Categories.Remove(entity);
            Dblibrary.SaveChanges();

        }

        public Category GetBy(Category entity)
        {
            throw new NotImplementedException();
        }

        public Category GetById(int id)
        {
            return Dblibrary.Categories.Find(id);

        }

        public Category Update(Category entity)
        {
            Dblibrary.Categories.Update(entity);
            Dblibrary.SaveChanges();
            return entity;


        }
        public List<Category> GetAll()
        {
            return Dblibrary.Categories.ToList();
        }
    }
}