using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserManagement.Application.Commands.User.Create;
using UserManagement.Application.Commands.User.Delete;
using UserManagement.Application.Commands.User.Update;
using UserManagement.Application.DTOs;
using UserManagement.Application.Queries.User;
using UserManagement.Server.Extensions;
using UserManagement.Server.Routes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UserManagement.Server.Controllers;

[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[Authorize]

public class UserController : BaseApiController
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }
    [Authorize(Policy = AuthorizationConsts.ManagementPolicy)]

    [HttpPost(CommonRoutes.Create)]
    [ProducesDefaultResponseType(typeof(int))]
    public async Task<ActionResult> CreateUser(CreateUserCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    [Authorize(Policy = AuthorizationConsts.ManagementPolicy)]

    [HttpGet(CommonRoutes.GetAll)]
    [ProducesDefaultResponseType(typeof(List<UserResponseDTO>))]
    public async Task<IActionResult> GetAllUserAsync()
    {
        return Ok(await _mediator.Send(new GetUserQuery()));
    }
    [Authorize(Policy = AuthorizationConsts.ManagementPolicy)]

    [HttpDelete(UserRoutes.DeleteByUserId)]
    [ProducesDefaultResponseType(typeof(int))]
    public async Task<IActionResult> DeleteUser(string userId)
    {
        var result = await _mediator.Send(new DeleteUserCommand() { Id = userId });
        return Ok(result);
    }
    [Authorize(Policy = AuthorizationConsts.UserPolicy)]

    [HttpGet(UserRoutes.GetUserDetailsByUserId)]
    [ProducesDefaultResponseType(typeof(UserDetailsResponseDTO))]
    public async Task<IActionResult> GetUserDetails(string userId)
    {
        var result = await _mediator.Send(new GetUserDetailsQuery() { UserId = userId });
        return Ok(result);
    }
    [Authorize(Policy = AuthorizationConsts.ManagementPolicy)]

    [HttpGet(UserRoutes.GetUserDetailsByUserName)]
    [ProducesDefaultResponseType(typeof(UserDetailsResponseDTO))]
    public async Task<IActionResult> GetUserDetailsByUserName(string userName)
    {
        var result = await _mediator.Send(new GetUserDetailsByUserNameQuery() { UserName = userName });
        return Ok(result);
    }
    [Authorize(Policy = AuthorizationConsts.ManagementPolicy)]

    [HttpPost(UserRoutes.AssignRoles)]
    [ProducesDefaultResponseType(typeof(int))]

    public async Task<ActionResult> AssignRoles(AssignUsersRoleCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }
    [Authorize(Policy = AuthorizationConsts.ManagementPolicy)]

    [HttpPut(UserRoutes.UpdateUserRoles)]
    [ProducesDefaultResponseType(typeof(int))]

    public async Task<ActionResult> EditUserRoles(UpdateUserRolesCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [Authorize(Policy = AuthorizationConsts.ManagementPolicy)]


    [HttpGet(UserRoutes.GetAllUserDetails)]
    [ProducesDefaultResponseType(typeof(UserDetailsResponseDTO))]
    public async Task<IActionResult> GetAllUserDetails()
    {
        var result = await _mediator.Send(new GetAllUsersDetailsQuery());
        return Ok(result);
    }

    [Authorize(Policy = AuthorizationConsts.UserPolicy)]

    [HttpPut(UserRoutes.UpdateUserProfileById)]
    [ProducesDefaultResponseType(typeof(int))]
    public async Task<ActionResult> EditUserProfile(string id, [FromForm] EditUserProfileCommand command)
    {
        if (id == command.Id)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }
        else
        {
            return BadRequest();
        }
    }
    [Authorize(Policy = AuthorizationConsts.UserPolicy)]


    [HttpPut(UserRoutes.UpdatePasswordByUserName)]
    [ProducesDefaultResponseType(typeof(int))]
    public async Task<ActionResult> ChangePsssword(string userName, [FromBody] ChangeUserPasswordCommand command)
    {
        if (userName == command.UserName)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }
        else
        {
            return BadRequest();
        }
    }

}
