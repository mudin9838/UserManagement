﻿using MediatR;
using UserManagement.Application.Common.Interfaces;

namespace UserManagement.Application.Commands.Emails
{
    public class SendEmailCommand : IRequest<string>
    {
        public string Email { get; set; }
        public string Message { get; set; }
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
            var response = await _emailService.SendEmailAsync(request.Email, request.Message);
            return response == null ? "Failed due to" : response;
        }
    }
}
