using Microsoft.AspNetCore.Http;

namespace UserManagement.Application.Common.Interfaces
{
    public interface IFileService
    {
        public Task<string> UploadImage(string Location, IFormFile file);
    }
}
