using MailKit.Net.Smtp;
using MimeKit;
using UserManagement.Application.Common.Interfaces;
using UserManagement.Infrastructure.Helpers;

namespace UserManagement.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        #region Fields
        private readonly EmailSettings _emailSettings;

        public EmailService(EmailSettings emailSettings)
        {
            _emailSettings = emailSettings;
        }
        #endregion

        #region constructors


        #endregion

        #region Handle functions

        public async Task<string> SendEmailAsync(string email, string Message)
        {
            try
            {
                //sending the Message of passwordResetLink
                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync(_emailSettings.Host, _emailSettings.Port, true);
                    client.Authenticate(_emailSettings.FromEmail, _emailSettings.Password);
                    var bodybuilder = new BodyBuilder
                    {
                        HtmlBody = $"{Message}",
                        TextBody = "wellcome",
                    };
                    var message = new MimeMessage
                    {
                        Body = bodybuilder.ToMessageBody()
                    };
                    message.From.Add(new MailboxAddress("Info", _emailSettings.FromEmail));
                    message.To.Add(new MailboxAddress("testing", email));
                    message.Subject = "new feedback submitted";
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }
                //end of sending email
                return "Success";
            }
            catch (Exception)
            {
                return "Failed";
            }
        }


    }


    #endregion
}

