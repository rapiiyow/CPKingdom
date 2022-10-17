using CPKINGDOM.Core.Models;
using System.Collections.Generic;

namespace CPKINGDOM.Core.Interfaces
{
    public interface IStaffSvc
    {
        List<Staff> GetStaffs();
        bool SaveNewStaff(Staff staff);
        bool UpdateStaff(Staff staff);
        List<Role> GetRoles();
    }
}
