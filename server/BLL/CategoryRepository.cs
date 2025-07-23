using DAL;
using System.Linq.Expressions;
namespace BLL
{
    public class CategoryRepository : IRepository<Category>

    {
        private readonly Dblibrary Dblibrary;

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

        public List<Category> GetAll(Expression<Func<Category, bool>>? filter = null)
        {
            return Dblibrary.Categories.ToList();
        }
    }
}