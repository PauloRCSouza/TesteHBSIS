using Dapper.Contrib.Extensions;
using Contract;
using System.Linq;
using Model.Config;

namespace Repository
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        public virtual bool Delete(TEntity entity)
        {
            using (var conn = DbConfig.GetSqlConnection())
            {
                return conn.Delete(entity);
            }
        }

        public virtual dynamic Insert(TEntity entity)
        {
            using (var conn = DbConfig.GetSqlConnection())
            {
                return conn.Insert(entity);
            }
        }

        public virtual bool Update(TEntity entity)
        {
            using (var conn = DbConfig.GetSqlConnection())
            {
                return conn.Update(entity);
            }
        }

        public virtual IQueryable<TEntity> GetList()
        {
            using (var conn = DbConfig.GetSqlConnection())
            {
                return conn.GetAll<TEntity>().AsQueryable();
            }
        }

        public TEntity GetById(int id)
        {
            using (var conn = DbConfig.GetSqlConnection())
            {
                return conn.Get<TEntity>(id);
            }
        }
    }
}
