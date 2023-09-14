using WebShopApi.DTO;
using static WebShopApi.Enums.Enums;

namespace WebShopApi.Interfaces
{
    public interface IAdminService
    {
        bool ActivateUser(UserEmailDto email);
        public bool VerifySeller(int id, VeryfiedType value);

        public List<UserDto> GetAllSellers();
    }
}
