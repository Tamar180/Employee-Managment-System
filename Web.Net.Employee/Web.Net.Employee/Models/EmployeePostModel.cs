using Employees.Core.Entities;

namespace Employees.API.Models
{
    public class EmployeePostModel
    {
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
