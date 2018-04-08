using System.Collections.Generic;
using System.Linq;
using Contract;
using Model;
using Repository;

namespace Business
{
    public class BookBusiness : IBookBusiness
    {
        private readonly IBookRepository _rep;

        public BookBusiness(IBookRepository bookRep)
        {
            _rep = bookRep;
        }

        public Book GetById(int id)
        {
            return _rep.GetById(id);
        }

        public IQueryable<Book> GetList()
        {
            return _rep.GetList().OrderBy(x => x.Title);
        }

        public dynamic Insert(Book entity)
        {
            return _rep.Insert(entity);
        }

        public bool Update(Book entity)
        {
            return _rep.Update(entity);
        }

        public bool Delete(int id)
        {
            return _rep.Delete(id);
        }
    }
}
