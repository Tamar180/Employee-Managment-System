using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Entities
{
    public enum Roles
    {
        PrimeMinister,
        DeputyPrimeMinister,
        Minister,
        DeputyMinister,
        GovernmentSecretary,
        SecurityChief,
        Diplomat,
        RegionalDirector,
        CEO,
        Mayor,
        Judge,
    }
    public class Role
    {
        public int? Id { get; set; }
        public Roles RoleName { get; set; }
        public bool Managerial { get; set; }
        public DateTime StartDate { get; set; }
    }
}
