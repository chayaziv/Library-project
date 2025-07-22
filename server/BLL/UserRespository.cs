using DAL;
using System.Linq.Expressions;
namespace BLL
{
    public class UserRespository : IRepository<User>

    {
        private Dblibrary Dblibrary;

        public UserRespository(Dblibrary dblibrary)
        {
            Dblibrary = dblibrary;
        }
        public User Add(User entity)
        {
            Dblibrary.Users.Add(entity);
            Dblibrary.SaveChanges();
            return entity;
        }
        public void Delete(User entity)
        {
            Dblibrary.Users.Remove(entity);
            Dblibrary.SaveChanges();

        }
        public User GetById(int id)
        {
            return (from u in Dblibrary.Users where u.Id == id select u).FirstOrDefault();
        }
        public User GetBy(User s)
        {
            return (from u in Dblibrary.Users where u.Email==s.Email &&u.Password==s.Password select u).FirstOrDefault();
        }
        public User Update(User entity)
        {
            Dblibrary.Users.Update(entity);
            Dblibrary.SaveChanges();
            return entity;


        }
        public List<User> GetAll()
        {
            return Dblibrary.Users.ToList();
        }
        public List<User> GetAll(Expression<Func<User, bool>>? filter = null)
        {
           return GetAll();
        }
    }
}