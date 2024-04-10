using Employees.Core.Entities;
using Employees.Core.Repositories;
using Employees.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<IEnumerable<Employee>> GetList()
        {
            var list = await _employeeRepository.GetList();
            return list.ToList().Where(e => e.Status);
        }

        public async Task<Employee> GetById(int id)
        {
            var list = await _employeeRepository.GetList();
            Employee? res = list.ToList().Find(e => e.Id == id);
            if (res == null)
                throw new Exception("404");
            return res;
        }

        public async Task<Employee> Post(Employee employee)
        {
            return await _employeeRepository.Post(employee);
        }

        public async Task<Employee> Put(int id, Employee employee)
        {
            return await _employeeRepository.Put(id, employee);
        }
        public async Task Delete(int id)
        {
            var list = await _employeeRepository.GetList();
            Employee? res = list.ToList().Find(e => e.Id == id);
            if (res != null)
                await _employeeRepository.Delete(res);
        }

    }
}
