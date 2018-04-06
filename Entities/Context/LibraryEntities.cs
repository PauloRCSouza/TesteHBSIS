using Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class LibraryEntities : DbContext
    {
        public LibraryEntities()
        {
            Database.SetInitializer<LibraryEntities>(null);
        }

        public DbSet<Book> Book { get; set; }
    }
}
