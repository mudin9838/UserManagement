namespace UserManagement.Infrastructure.Helpers
{
    public class EmailSettings
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string SenderName { get; set; }
        public string FromEmail { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
