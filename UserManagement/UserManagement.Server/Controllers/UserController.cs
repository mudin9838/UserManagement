using MediatR;
using Microsoft.AspNetCore.Mvc;
using UserManagement.Application.Commands.User.Create;
using UserManagement.Application.Commands.User.Delete;
using UserManagement.Application.Commands.User.Update;
using UserManagement.Application.DTOs;
using UserManagement.Application.Queries.User;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UserManagement.Server.Controllers;

[Route("api/[controller]")]
[ApiController]

//[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
//[Authorize(Roles = "Admin, Management")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("Create")]
    [ProducesDefaultResponseType(typeof(int))]
    public async Task<ActionResult> CreateUser(CreateUserCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpGet("GetAll")]
    [ProducesDefaultResponseType(typeof(List<UserResponseDTO>))]
    public async Task<IActionResult> GetAllUserAsync()
    {
        return Ok(await _mediator.Send(new GetUserQuery()));
    }

    [HttpDelete("Delete/{userId}")]
    [ProducesDefaultResponseType(typeof(int))]
    public async Task<IActionResult> DeleteUser(string userId)
    {
        var result = await _mediator.Send(new DeleteUserCommand() { Id = userId });
        return Ok(result);
    }

    [HttpGet("GetUserDetails/{userId}")]
    [ProducesDefaultResponseType(typeof(UserDetailsResponseDTO))]
    public async Task<IActionResult> GetUserDetails(string userId)
    {
        var result = await _mediator.Send(new GetUserDetailsQuery() { UserId = userId });
        return Ok(result);
    }

    [HttpGet("GetUserDetailsByUserName/{userName}")]
    [ProducesDefaultResponseType(typeof(UserDetailsResponseDTO))]
    public async Task<IActionResult> GetUserDetailsByUserName(string userName)
    {
        var result = await _mediator.Send(new GetUserDetailsByUserNameQuery() { UserName = userName });
        return Ok(result);
    }

    [HttpPost("AssignRoles")]
    [ProducesDefaultResponseType(typeof(int))]

    public async Task<ActionResult> AssignRoles(AssignUsersRoleCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpPut("EditUserRoles")]
    [ProducesDefaultResponseType(typeof(int))]

    public async Task<ActionResult> EditUserRoles(UpdateUserRolesCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpGet("GetAllUserDetails")]
    [ProducesDefaultResponseType(typeof(UserDetailsResponseDTO))]
    public async Task<IActionResult> GetAllUserDetails()
    {
        var result = await _mediator.Send(new GetAllUsersDetailsQuery());
        return Ok(result);
    }


    [HttpPut("EditUserProfile/{id}")]
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


    [HttpPut("ChangePassword/{userName}")]
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
