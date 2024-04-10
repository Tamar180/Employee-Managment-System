using AutoMapper;
using Employees.API.Models;
using Employees.Core.Entities;

namespace Employees.API.Mapping
{
    public class ApiMappingProfile:Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>().ReverseMap();
        }
    }
}
