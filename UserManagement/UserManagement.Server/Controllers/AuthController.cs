using MediatR;
using Microsoft.AspNetCore.Mvc;
using UserManagement.Application.Commands.Auth;
using UserManagement.Application.DTOs;
using UserManagement.Server.Routes;


namespace UserManagement.Server.Controllers;


public class AuthController : BaseApiController
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }


    [HttpPost(AuthRoutes.Login)]
    [ProducesDefaultResponseType(typeof(AuthResponseDTO))]
    public async Task<IActionResult> Login([FromBody] AuthCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
}
