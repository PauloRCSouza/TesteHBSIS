using Entities;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Contract
{
    public interface IBookBusiness
    {

        IQueryable<Book> GetList();

        Book GetById(int id);

        bool Update(Book entity);

        dynamic Insert(Book entity);

        bool Delete(Book entity);

    }
}
