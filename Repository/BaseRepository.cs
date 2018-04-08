using Dapper.Contrib.Extensions;
using Contract;
using System.Linq;
using Model.Config;
using Dapper;
using Dapper.Contrib;

namespace Repository
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        public virtual bool Delete(int id)
        {
            using (var conn = DbConfig.GetSqlConnection)
            {
                var e = conn.Get<TEntity>(id);
                return conn.Delete(e);
            }
        }

        public virtual dynamic Insert(TEntity entity)
        {
            using (var conn = DbConfig.GetSqlConnection)
            {
                return conn.Insert(entity);
            }
        }

        public virtual bool Update(TEntity entity)
        {
            using (var conn = DbConfig.GetSqlConnection)
            {
                return conn.Update(entity);
            }
        }

        public virtual IQueryable<TEntity> GetList()
        {
            using (var conn = DbConfig.GetSqlConnection)
            {
                return conn.GetAll<TEntity>().AsQueryable();
            }
        }

        public TEntity GetById(int id)
        {
            using (var conn = DbConfig.GetSqlConnection)
            {
                return conn.Get<TEntity>(id);
            }
        }
    }
}
