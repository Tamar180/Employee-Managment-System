using Employees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> GetList();
        Task<Employee> Post(Employee employee);
        Task<Employee> GetById(int id);
        Task<Employee> Put(int id, Employee employee);
        Task Delete(int id);
    }
}
