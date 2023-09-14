using AutoMapper;
using WebShopApi.Data;
using WebShopApi.DTO;
using WebShopApi.Interfaces;
using WebShopApi.Models;
using static WebShopApi.Enums.Enums;

namespace WebShopApi.Services
{
    public class AdminService : IAdminService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _dataContext;

        public AdminService(IMapper mapper, DataContext dataContext)
        {
            _mapper = mapper;
            _dataContext = dataContext;
        }

        public bool ActivateUser(UserEmailDto email)
        {
            UserModel user = _dataContext.Users.Find(email);

            if(user.Type != Enums.Enums.UserType.Customer || user.Type != Enums.Enums.UserType.Seller)
            {
                return false;
            }

            user.AcceptedRegistration = true;

            _dataContext.Users.Update(user);
            _dataContext.SaveChanges();

            return true;
        }

        public List<UserDto> GetAllSellers()
        {
            List<UserDto> sellers = new List<UserDto>();

            var users = _dataContext.Users;

            foreach (var item in users)
            {
                if(item.Type == Enums.Enums.UserType.Seller)
                {
                    UserDto user = _mapper.Map<UserDto>(item);
                    sellers.Add(user);
                }
            }

            return sellers;
        }

        public bool VerifySeller(int id, VeryfiedType value)
        {
            UserModel seller = _dataContext.Users.Find(id);

            if(seller.Type != Enums.Enums.UserType.Seller)
            {
                return false;
            }

            seller.Veryfied = value;

            _dataContext.Users.Update(seller);
            _dataContext.SaveChanges();

            return true;
        }
    }
}
