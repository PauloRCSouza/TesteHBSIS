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
        private static string connectionString = ConfigurationManager.ConnectionStrings["DapperSampleConnection"].ToString();

        private static SqlConnection sqlConnection = new SqlConnection(connectionString);

        static public SqlConnection GetSqlConnection()
        {
            sqlConnection.Open();

            return sqlConnection;
        }


        public void DropSqlConnection()
        {
            sqlConnection.Close();
        }

    }
}
