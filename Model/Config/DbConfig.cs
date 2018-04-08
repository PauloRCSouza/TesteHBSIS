using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper.Contrib;

namespace Model.Config
{
    public class DbConfig
    {
        //private static string connectionString = ConfigurationManager.ConnectionStrings["DapperSampleConnection"].ToString();

        static string cs = "Data Source = LOCALHOST\\SQLEXPRESS; Initial Catalog = Entities.LibraryEntities;user id = teste; password = teste;Integrated Security=False";

        //private static SqlConnection sqlConnection = new SqlConnection("Data Source = LOCALHOST\\SQLEXPRESS; Initial Catalog = Teste_PauloSouza;Integrated Security=True;");


        static public SqlConnection GetSqlConnection
        {
            get {
                var conn = new SqlConnection(cs);
                return conn;
            }
        }

    }
}
