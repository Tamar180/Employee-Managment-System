using AutoMapper;
using Employees.API.Models;
using Employees.Core.DTOs;
using Employees.Core.Entities;
using Employees.Core.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Employees.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }
        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var list = await _employeeService.GetList();
            var listDto = _mapper.Map<IEnumerable<EmployeeDto>>(list);
            return Ok(listDto);
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var employee = await _employeeService.GetById(id);
            var employeeDto = _mapper.Map<EmployeeDto>(employee);
            return Ok(employeeDto);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {
            var res = await _employeeService.Post(_mapper.Map<Employee>(employee));
            return Ok(_mapper.Map<EmployeeDto>(res));
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            var res = await _employeeService.GetById(id);
            _mapper.Map(employee, res);
            return Ok(_mapper.Map<EmployeeDto>(await _employeeService.Put(id, _mapper.Map<Employee>(res))));
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _employeeService.Delete(id);
        }
    }
}
