using System.Globalization;
using WebShopApi.DTO;

namespace WebShopApi.Interfaces
{
    public interface IUserService
    {
        public string Login(LogInUserDto logInUserDto);
        public UserDto Register(RegisterUserDto registerUserDto);
        public List<UserDto> GetAllUsers();
        public bool UpdateUser(UserDto updateUserDto, int id);
        public bool DeleteUser(string email);
        public UserDto FindById(int id);
        public bool AddUsersPicture(string email, string path);
        string getPhoto(int id);
    }
}
