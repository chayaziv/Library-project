using System;
using System.Linq.Expressions;
namespace BLL
{
    public  interface IRepository<T>
    {
        T GetById(int id);
        T GetBy(T entity);
        T Add(T entity);
        T Update(T entity);
        void Delete(T entity);
        List<T> GetAll(Expression<Func<T, bool>>? filter = null);
    }
}
