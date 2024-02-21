using AutoMapper;
using UserManagement.Application.Commands.Customers.Create;
using UserManagement.Application.Commands.Customers.Update;
using UserManagement.Application.DTOs;
using UserManagement.Core.Entities;

namespace UserManagement.Application.Mapper
{
    public class OrderingMappingProfile : Profile
    {
        public OrderingMappingProfile()
        {
            CreateMap<Customer, CustomerResponse>().ReverseMap();
            CreateMap<Customer, CreateCustomerCommand>().ReverseMap();
            CreateMap<Customer, EditCustomerCommand>().ReverseMap();
        }
    }
}
