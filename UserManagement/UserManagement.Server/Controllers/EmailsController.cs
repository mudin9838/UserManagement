using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using UserManagement.Application.Commands.Emails;
using UserManagement.Server.Extensions;

namespace UserManagement.Server.Controllers;
[EnableCors("CorsPolicy")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[Authorize(Policy = AuthorizationConsts.ManagementPolicy)]


public class EmailsController : BaseApiController
{
    private readonly IMediator _mediator;
    public EmailsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("Create")]
    [ProducesDefaultResponseType(typeof(int))]
    public async Task<ActionResult> SendEmail([FromForm] SendEmailCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }



}
