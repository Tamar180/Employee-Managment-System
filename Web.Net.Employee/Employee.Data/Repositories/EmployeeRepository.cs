using Employees.Core.Entities;
using Employees.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _dataContext;
        public EmployeeRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Employee>> GetList()
        {
            return await _dataContext.Employees.Include(e => e.Roles).ToListAsync();
        }

        public async Task<Employee> Post(Employee employee)
        {
            _dataContext.Employees.Add(employee);
            await _dataContext.SaveChangesAsync();
            return employee;

        }
                
        public async Task<Employee> Put(int id, Employee employee)
        {
            var res = _dataContext.Employees.Find(id);
            if (res == null)
                throw new Exception("404");
            _dataContext.Entry(res).CurrentValues.SetValues(employee);
            await _dataContext.SaveChangesAsync();
            return res;
        }
        public async Task Delete(Employee employee)
        {
            employee.Status = false;
            await _dataContext.SaveChangesAsync();
        }
    }
}
