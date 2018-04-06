using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Book
    {
        public int Id { get; set; }

        public int? Year { get; set; }

        public string Author { get; set; }

        public string Edition { get; set; }

        public string Editor { get; set; }

        public string Title { get; set; }

        public string ISBN { get; set; }
    }
}
