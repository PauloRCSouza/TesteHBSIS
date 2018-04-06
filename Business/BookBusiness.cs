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
            throw new System.NotImplementedException();
        }

        public IQueryable<Book> GetList()
        {
            return _rep.GetList();
        }

        public dynamic Insert(Book entity)
        {
            throw new System.NotImplementedException();
        }

        public bool Update(Book entity)
        {
            throw new System.NotImplementedException();
        }

        public bool Delete(Book entity)
        {
            throw new System.NotImplementedException();
        }
    }
}
