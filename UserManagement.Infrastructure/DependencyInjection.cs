using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UserManagement.Application.Common.Interfaces;
using UserManagement.Core.Repositories.Command;
using UserManagement.Core.Repositories.Query;
using UserManagement.Infrastructure.Data;
using UserManagement.Infrastructure.Helpers;
using UserManagement.Infrastructure.Identity;
using UserManagement.Infrastructure.Repository.Command;
using UserManagement.Infrastructure.Repository.Query;
using UserManagement.Infrastructure.Services;

namespace UserManagement.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<OrderingContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly(typeof(OrderingContext).Assembly.FullName)
                ));
              services.AddStackExchangeRedisCache(options =>
             {
               options.Configuration = configuration.GetConnectionString("AzureRedisConnection");
               options.InstanceName = "userdata";
               });

            services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<OrderingContext>()
            .AddDefaultTokenProviders();

            var emailSettings = new EmailSettings();
            configuration.GetSection(nameof(emailSettings)).Bind(emailSettings);
            services.Configure<IdentityOptions>(options =>
            {
                // Default Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;
                // Default Password settings.
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = false; // For special character
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 1;
                // Default SignIn settings.
                options.SignIn.RequireConfirmedEmail = false;
                options.SignIn.RequireConfirmedPhoneNumber = false;
                options.User.RequireUniqueEmail = true;
            });

            services.AddSingleton(emailSettings);
            services.AddScoped<IIdentityService, IdentityService>();
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddTransient<ICustomerQueryRepository, CustomerQueryRepository>();
            services.AddTransient<ICustomerCommandRepository, CustomerCommandRepository>();


            return services;
        }
    }
}
