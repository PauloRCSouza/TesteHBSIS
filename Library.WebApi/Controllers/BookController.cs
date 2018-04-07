using System.Linq;
using Contract;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace Library.Web.Api.Controllers
{
    [Route("api/[controller]")]
    public class BookController : Controller
    {

        IBookBusiness _bus;

        public BookController(IBookBusiness bus)
        {
            _bus = bus;
        }

        // GET api/values
        [HttpGet("[action]")]
        public IQueryable<Book> GetList()
        {
            return _bus.GetList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Book Get(int id)
        {
            return _bus.GetById(id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Book value)
        {
            _bus.Insert(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Book value)
        {
            _bus.Update(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _bus.Delete(id);
        }
    }
}
