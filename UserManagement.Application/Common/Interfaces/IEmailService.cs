namespace UserManagement.Application.Common.Interfaces
{
    public interface IEmailService
    {
        Task<string> SendEmailAsync(string email, string Message);
    }
}
