using System.Linq;

namespace Contract
{
    public interface IBaseRepository<TEntity>  where TEntity : class
    {

        IQueryable<TEntity> GetList();

        TEntity GetById(int id);

        bool Update(TEntity entity);

        dynamic Insert(TEntity entity);

        bool Delete(TEntity entity);
    }
}
