using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Entities
{
    public enum Gender { male = 0, female };
    public class Employee
    {
        public int? Id { get; set; }
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public List<Role> Roles { get; set; }
        public bool Status { get; set; }
    }
}
