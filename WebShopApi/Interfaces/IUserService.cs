using System.Globalization;
using WebShopApi.DTO;

namespace WebShopApi.Interfaces
{
    public interface IUserService
    {
        public string Login(LogInUserDto logInUserDto);
        public UserDto Register(RegisterUserDto registerUserDto);
        public List<UserDto> GetAllUsers();
        public bool UpdateUser(UserDto updateUserDto);
        public bool DeleteUser(string email);
        public UserDto FindById(string email);

        public bool AddUsersPicture(string email, string path);
    }
}
