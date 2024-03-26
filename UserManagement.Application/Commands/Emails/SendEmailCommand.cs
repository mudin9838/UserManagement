using MediatR;
using Microsoft.AspNetCore.Http;
using UserManagement.Application.Common.Interfaces;

namespace UserManagement.Application.Commands.Emails;

public class SendEmailCommand : IRequest<string>
{
    public string EmailToId { get; set; }
    public string EmailToName { get; set; }
    public string EmailSubject { get; set; }
    public string EmailBody { get; set; }
    public IFormFileCollection EmailAttachments { get; set; }
}


public class SendEmailCommandHandler : IRequestHandler<SendEmailCommand, string>
{
    private readonly IEmailService _emailService;

    public SendEmailCommandHandler(IEmailService emailService)
    {
        _emailService = emailService;
    }
    public async Task<string> Handle(SendEmailCommand request, CancellationToken cancellationToken)
    {
        var response = await _emailService.SendEmailAsync(request.EmailToId, request.EmailToName, request.EmailSubject, request.EmailBody, request.EmailAttachments);
        return response == null ? "Failed due to" : response;
    }
}

