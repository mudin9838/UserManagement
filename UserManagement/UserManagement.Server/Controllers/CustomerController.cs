using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using UserManagement.Application.Commands.Customers.Create;
using UserManagement.Application.Commands.Customers.Delete;
using UserManagement.Application.Commands.Customers.Update;
using UserManagement.Application.DTOs;
using UserManagement.Application.Queries.Customers;
using UserManagement.Core.Entities;
using UserManagement.Server.Extensions;
using UserManagement.Server.Routes;

namespace UserManagement.Server.Controllers;

[EnableCors("CorsPolicy")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[Authorize]
public class CustomerController : BaseApiController
{
    private readonly IMediator _mediator;
    public CustomerController(IMediator mediator)
    {
        _mediator = mediator;
    }


    [HttpGet(CommonRoutes.GetAll)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<Customer>> Get()
    {
        return await _mediator.Send(new GetAllCustomerQuery());
    }

    [HttpGet(CommonRoutes.GetById)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<Customer> Get(Int64 id)
    {
        return await _mediator.Send(new GetCustomerByIdQuery(id));
    }

    [HttpGet(CommonRoutes.GetByEmail)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<Customer> GetByEmail(string email)
    {
        return await _mediator.Send(new GetCustomerByEmailQuery(email));
    }

    [HttpPost(CommonRoutes.Create)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<CustomerResponse>> CreateCustomer([FromBody] CreateCustomerCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }


    [HttpPut(CommonRoutes.UpdateById)]
    public async Task<ActionResult> Edit(int id, [FromBody] EditCustomerCommand command)
    {
        try
        {
            if (command.Id == id)
            {
                var result = await _mediator.Send(command);
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }
        catch (Exception exp)
        {
            return BadRequest(exp.Message);
        }
    }

    [Authorize(Policy = AuthorizationConsts.ManagementPolicy)]
    [HttpDelete(CommonRoutes.DeleteById)]
    public async Task<ActionResult> DeleteCustomer(int id)
    {
        try
        {
            string result = string.Empty;
            result = await _mediator.Send(new DeleteCustomerCommand(id));
            return Ok(result);
        }
        catch (Exception exp)
        {
            return BadRequest(exp.Message);
        }
    }

}
