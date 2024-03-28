using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace UserManagement.Server.Extensions;

public static class ServiceExtensions
{

    public static void AddSwaggerExtension(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {

            // To enable authorization using swagger (Jwt)
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
            {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer {token}\"",
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
{
{
    new OpenApiSecurityScheme
        {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] {}

            }
        });

        });
    }

    //public static void AddControllersExtension(this IServiceCollection services)
    //{
    //    services.AddControllers()
    //        .AddJsonOptions(options =>
    //        {
    //            options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
    //            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    //        })
    //        ;
    //}

    public static void AddCorsExtension(this IServiceCollection services)
    {
        services.AddCors(c =>
        {
            c.AddPolicy("CorsPolicy", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
        });
    }


    public static void AddJWTAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var _key = configuration["Jwt:Key"];
        var _issuer = configuration["Jwt:Issuer"];
        var _audience = configuration["Jwt:Audience"];
        var _expirtyMinutes = configuration["Jwt:ExpiryMinutes"];
        // Configuration for token
        services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(x =>
        {
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;
            x.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidAudience = _audience,
                ValidIssuer = _issuer,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key)),
                ClockSkew = TimeSpan.FromMinutes(Convert.ToDouble(_expirtyMinutes))

            };
        });

    }
    public static void AddAuthorizationPolicies(this IServiceCollection services, IConfiguration configuration)
    {
        string admin = configuration["ApiRoles:AdminRole"], management = configuration["ApiRoles:ManagementRole"], user = configuration["ApiRoles:UserRole"];

        services.AddAuthorization(options =>
        {
            options.AddPolicy(AuthorizationConsts.AdminPolicy, policy => policy.RequireRole(admin));
            options.AddPolicy(AuthorizationConsts.ManagementPolicy, policy => policy.RequireRole(management, admin));
            options.AddPolicy(AuthorizationConsts.UserPolicy, policy => policy.RequireRole(user, management, admin));
        });
    }

}
