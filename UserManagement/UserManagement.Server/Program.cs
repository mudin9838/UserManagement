using UserManagement.Application.Commands.Customers.Create;
using UserManagement.Application.Commands.User.Create;
using UserManagement.Application.Common.Interfaces;
using UserManagement.Infrastructure;
using UserManagement.Infrastructure.Services;
using System.Reflection;
using UserManagement.Server.Extensions;

namespace UserManagement.Server;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        //        builder.Configuration
        //.SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("Secrets.json", optional: true, reloadOnChange: true);
        // Add services to the container.

        builder.Services.AddControllers();
        // For authentication
        var _key = builder.Configuration["Jwt:Key"];
        var _issuer = builder.Configuration["Jwt:Issuer"];
        var _audience = builder.Configuration["Jwt:Audience"];
        var _expirtyMinutes = builder.Configuration["Jwt:ExpiryMinutes"];


        // Dependency injection with key
        builder.Services.AddSingleton<ITokenGenerator>(new TokenGenerator(_key, _issuer, _audience, _expirtyMinutes));


        // Include Infrastructur Dependency
        builder.Services.AddInfrastructure(builder.Configuration);
        builder.Services.AddJWTAuthentication(builder.Configuration);
        builder.Services.AddAuthorizationPolicies(builder.Configuration);

        // Configuration for Sqlite
        //builder.Services.AddDbContext<OrderingContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

        // Register dependencies
        builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(CreateCustomerCommandHandler).GetTypeInfo().Assembly));
        builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(CreateUserCommandHandler).GetTypeInfo().Assembly));

        builder.Services.AddCorsExtension();

        builder.Services.AddSwaggerExtension();
        builder.Services.AddEndpointsApiExplorer();
        var app = builder.Build();
        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseDefaultFiles();
        app.UseStaticFiles();

        // Configure the HTTP request pipeline.
        //if (app.Environment.IsDevelopment())
        //{

        //}

        app.UseHttpsRedirection();
        // Must be betwwen app.UseRouting() and app.UseEndPoints()
        // maintain middleware order
        app.UseCors("CorsPolicy");

        // Added for authentication
        // Maintain middleware order
        app.UseAuthentication();
        app.UseAuthorization();


        app.MapControllers();

        app.MapFallbackToFile("/index.html");

        app.Run();
    }
}
