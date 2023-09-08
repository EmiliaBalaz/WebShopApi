using AutoMapper;
using WebShopApi.DTO;
using WebShopApi.Models;

namespace WebShopApi.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<UserModel, UserDto>().ReverseMap();
            CreateMap<ProductModel, ProductDto>().ReverseMap();
        }
    }
}
