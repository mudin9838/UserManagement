using Microsoft.AspNetCore.Http;

namespace UserManagement.Application.Common.Interfaces
{
    public interface IEmailService
    {
        Task<string> SendEmailAsync(string EmailToId, string EmailToName, string EmailSubject, string EmailBody, IFormFileCollection EmailAttachments);
    }
}
