using MediatR;
using UserManagement.Application.Common.Interfaces;

namespace UserManagement.Application.Commands.User.Update
{
    public class ChangeUserPasswordCommand : IRequest<int>
    {
        public string UserName { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }

    }



    public class ChangeUserCommandHandler : IRequestHandler<ChangeUserPasswordCommand, int>
    {
        private readonly IIdentityService _identityService;

        public ChangeUserCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }
        public async Task<int> Handle(ChangeUserPasswordCommand request, CancellationToken cancellationToken)
        {
            var result = await _identityService.ChangePassword(request.UserName, request.CurrentPassword, request.NewPassword);
            return result ? 1 : 0;
        }
    }
}
