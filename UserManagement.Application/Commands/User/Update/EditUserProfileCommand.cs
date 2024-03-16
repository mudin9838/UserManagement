using MediatR;
using Microsoft.AspNetCore.Http;
using UserManagement.Application.Common.Interfaces;

namespace UserManagement.Application.Commands.User.Update
{
    public class EditUserProfileCommand : IRequest<int>
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public IFormFile? Image { get; set; }
        public List<string> Roles { get; set; }
    }

    public class EditUserProfileCommandHandler : IRequestHandler<EditUserProfileCommand, int>
    {
        private readonly IIdentityService _identityService;

        public EditUserProfileCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }
        public async Task<int> Handle(EditUserProfileCommand request, CancellationToken cancellationToken)
        {

            var result = await _identityService.UpdateUserProfile(request.Id, request.FullName, request.Email, request.Roles, request.Image);
            return result ? 1 : 0;
        }
    }
}
