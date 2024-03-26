using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Http;
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

        public async Task<string> SendEmailAsync(string EmailToId, string EmailToName, string EmailSubject, string EmailBody, IFormFileCollection EmailAttachments)
        {

            try
            {
                using (MimeMessage emailMessage = new MimeMessage())
                {
                    MailboxAddress emailFrom = new MailboxAddress(_emailSettings.SenderName, _emailSettings.FromEmail);
                    emailMessage.From.Add(emailFrom);
                    MailboxAddress emailTo = new MailboxAddress(EmailToName, EmailToId);
                    emailMessage.To.Add(emailTo);
                    //to multiple reciepient
                    // var addresses = "firstemail@example.com;secondemail@example.com";
                    //foreach (var address in addresses.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
                    //{
                    //    emailMessage.To.Add(address);
                    //}
                    // we can add the CCs and BCCs here.
                    //emailMessage.Cc.Add(new MailboxAddress("Cc Receiver", "cc@example.com"));
                    //emailMessage.Bcc.Add(new MailboxAddress("Bcc Receiver", "bcc@example.com"));

                    emailMessage.Subject = EmailSubject;

                    BodyBuilder emailBodyBuilder = new BodyBuilder();
                    emailBodyBuilder.TextBody = EmailBody;

                    if (EmailAttachments != null)
                    {
                        foreach (var attachmentFile in EmailAttachments)
                        {
                            if (attachmentFile.Length == 0)
                            {
                                continue;
                            }

                            using (MemoryStream memoryStream = new MemoryStream())
                            {
                                attachmentFile.CopyTo(memoryStream);
                                var attachmentFileByteArray = memoryStream.ToArray();

                                emailBodyBuilder.Attachments.Add(attachmentFile.FileName, attachmentFileByteArray, ContentType.Parse(attachmentFile.ContentType));
                            }
                        }
                    }

                    emailMessage.Body = emailBodyBuilder.ToMessageBody();
                    //this is the SmtpClient from the Mailkit.Net.Smtp namespace, not the System.Net.Mail one
                    using (SmtpClient mailClient = new SmtpClient())
                    {
                        mailClient.Connect(_emailSettings.Host, _emailSettings.Port, true);
                        mailClient.Authenticate(_emailSettings.FromEmail, _emailSettings.Password);
                        mailClient.Send(emailMessage);
                        mailClient.Disconnect(true);
                    }
                }

                return "success";
            }
            catch (Exception)
            {
                // Exception Details
                return "unsuccessful";
            }
        }


    }


    #endregion
}

