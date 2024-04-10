using Microsoft.EntityFrameworkCore;
using Employees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Employee>? Employees { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=employee_db");
        }
    }
}
