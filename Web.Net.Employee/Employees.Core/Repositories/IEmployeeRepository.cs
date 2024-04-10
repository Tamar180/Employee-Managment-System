using Employees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetList();
        Task<Employee> Post(Employee employee);
        Task<Employee> Put(int id, Employee employee);
        Task Delete(Employee employee);
    }
}
