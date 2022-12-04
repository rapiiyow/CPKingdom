using CPKINGDOM.Api.Models;
using System.Collections.Generic;

namespace CPKINGDOM.Api.Interfaces
{
    public interface IStaffSvc
    {
        List<Staff> GetStaffs();
        bool SaveNewStaff(Staff staff);
        bool UpdateStaff(Staff staff);
        List<Role> GetRoles();
        List<Staff> GetTechnicians();
    }
}
