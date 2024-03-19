using MailKit.Net.Smtp;
using MimeKit;
using UserManagement.Application.Common.Interfaces;

namespace UserManagement.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        #region Fields

        #endregion

        #region constructors
        public EmailService()
        {

        }

        #endregion

        #region Handle functions

        public async Task<string> SendEmailAsync(string email, string Message)
        {
            try
            {
                //sending the Message of passwordResetLink
                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync("smtp.gmail.com", 465, true);
                    client.Authenticate("mudinbest@gmail.com", "mmqw tlxo gijs ztvd");
                    var bodybuilder = new BodyBuilder
                    {
                        HtmlBody = $"{Message}",
                        TextBody = "wellcome",
                    };
                    var message = new MimeMessage
                    {
                        Body = bodybuilder.ToMessageBody()
                    };
                    message.From.Add(new MailboxAddress("Future Team", "mudinbest@gmail.com"));
                    message.To.Add(new MailboxAddress("testing", email));
                    message.Subject = "new contact submitted";
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

