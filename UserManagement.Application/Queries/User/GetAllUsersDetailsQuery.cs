﻿using MediatR;
using UserManagement.Application.Common.Interfaces;
using UserManagement.Application.DTOs;

namespace UserManagement.Application.Queries.User
{
    public class GetAllUsersDetailsQuery : IRequest<List<UserDetailsResponseDTO>>
    {
        //public string UserId { get; set; }
    }

    public class GetAllUsersDetailsQueryHandler : IRequestHandler<GetAllUsersDetailsQuery, List<UserDetailsResponseDTO>>
    {
        private readonly IIdentityService _identityService;

        public GetAllUsersDetailsQueryHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<List<UserDetailsResponseDTO>> Handle(GetAllUsersDetailsQuery request, CancellationToken cancellationToken)
        {
            

            var users = await _identityService.GetAllUsersAsync();
            var userDetails = users.Select(x => new UserDetailsResponseDTO()
            {
                Id = x.id,
                Email = x.email,
                UserName = x.userName
                //Roles = (IList<string>)_identityService.GetUserRolesAsync(x.id) // Converstion problem
            }).ToList();

            foreach (var user in userDetails)
            {
                user.Roles = await _identityService.GetUserRolesAsync(user.Id);
            }
            return userDetails;
        }
    }
}
