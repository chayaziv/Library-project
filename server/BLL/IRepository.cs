using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

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
