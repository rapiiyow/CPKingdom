namespace CPKINGDOM.Api.Models
{
    public class Staff
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string ContactNo { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string FullName { get; set; }
    }
}