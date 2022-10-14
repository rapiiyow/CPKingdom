namespace CPKINGDOM.Core.Models
{
    public class JResponse
    {

        public bool Success { get; set; } = true;
        public string Message { get; set; } = "";
        public string ErrorCode { get; set; } = "";
        public object Data { get; set; }
        public int Total { get; set; } = 0;
    }
}
