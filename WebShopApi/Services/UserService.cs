using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using WebShopApi.Data;
using WebShopApi.DTO;
using WebShopApi.Interfaces;
using WebShopApi.Models;
using static WebShopApi.Enums.Enums;

namespace WebShopApi.Services
{
    public class UserService : IUserService
    {
        List<UserModel> _users = new List<UserModel>();
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;

        public UserService(DataContext dataContext, IMapper mapper, IConfiguration config)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _secretKey = config.GetSection("SecretKey");
        }
        public string Login(LogInUserDto logInUserDto)
        {
            UserModel user = null;
            user = _dataContext.Users.FirstOrDefault(u => u.Email == logInUserDto.Email);
            List<Claim> claims = new List<Claim>();

            if (BCrypt.Net.BCrypt.Verify(logInUserDto.Password, user.Password, false, BCrypt.Net.HashType.SHA256))
            {
                if (user.Type == Enums.Enums.UserType.Customer)
                {
                    claims.Add(new Claim("UserType", "Customer"));
                }
                else if (user.Type == Enums.Enums.UserType.Seller)
                {
                    claims.Add(new Claim("UserType", "Seller"));
                }
                else if (user.Type == Enums.Enums.UserType.Admin)
                {
                    claims.Add(new Claim("UserType", "Admin"));
                }

                claims.Add(new Claim("Id", Convert.ToString(user.Id)));
                claims.Add(new Claim("Email", user.Email));
                claims.Add(new Claim("FirstName", user.FirstName));
                claims.Add(new Claim("LastName", user.LastName));
                claims.Add(new Claim("Password", user.Password));
                claims.Add(new Claim("UserName", user.UserName));
                claims.Add(new Claim("Birthday", Convert.ToString(user.Birthday)));
                claims.Add(new Claim("Address", user.Address));
                claims.Add(new Claim("Image", user.Picture));
                claims.Add(new Claim("Veryfied", Convert.ToString(user.Veryfied)));


                SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:7042",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(20),
                    signingCredentials: signinCredentials
                    );

                string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                TokenDto token = new TokenDto { Token = tokenString };

                return tokenString;
            }
            else
            {
                return null;
            }
        }

        public UserDto Register(RegisterUserDto registerUserDto)
        {
            _users = _dataContext.Users.ToList();
            UserModel userModel = new UserModel();
            UserDto _registerUserDto = new UserDto();
            _registerUserDto.FirstName = registerUserDto.FirstName;
            _registerUserDto.LastName = registerUserDto.LastName;
            _registerUserDto.Email= registerUserDto.Email;
            _registerUserDto.Password = BCrypt.Net.BCrypt.HashPassword(registerUserDto.Password);
            _registerUserDto.UserName = registerUserDto.UserName;
            _registerUserDto.Birthday = registerUserDto.Birthday;
            _registerUserDto.Address= registerUserDto.Address;
            _registerUserDto.Picture= registerUserDto.Photo;
            _registerUserDto.Type = UserType.Seller;
            _registerUserDto.Veryfied = VeryfiedType.Denied;

            userModel = _mapper.Map<UserModel>(_registerUserDto);

            _dataContext.Users.Add(userModel);
            _dataContext.SaveChanges();
            return _registerUserDto;
        }

        public List<UserDto> GetAllUsers()
        {
            List<UserDto> listOfUsers = new List<UserDto>();

            var users = _dataContext.Users;

            foreach ( var user in users )
            {
                UserDto userDto = _mapper.Map<UserDto>(user);
                listOfUsers.Add(userDto);
            }

            return listOfUsers;
        }

        public bool UpdateUser(UserDto updateUserDto, int id)
        {
            UserModel user = _dataContext.Users.Find(id);
            //_mapper.Map<UserModel>(updateUserDto);

            user.UserName = updateUserDto.UserName;
            user.FirstName = updateUserDto.FirstName;
            user.LastName = updateUserDto.LastName;
            user.Email = updateUserDto.Email;
            user.Birthday= updateUserDto.Birthday;
            user.Address= updateUserDto.Address;

            _dataContext.Users.Update(user);
            _dataContext.SaveChanges();
            return true;
        }

        public bool DeleteUser(string email)
        {
            var user = _dataContext.Users.FirstOrDefault(x => x.Email == email);

            if(user is null)
            {
                return false;
            }

            _dataContext.Users.Remove(user);
            _dataContext.SaveChanges();

            return true;
        }

        public UserDto FindById(string email)
        {
            var user = _dataContext.Users.FirstOrDefault(u => u.Email == email);
            if(user is null)
            {
                return null;
            }

            return _mapper.Map<UserDto>(user);
        }

        public bool AddUsersPicture(string email, string path)
        {
            UserModel user = _dataContext.Users.Find(email);

            if(user is null)
            {
                return false;
            }

            user.Picture = path;
            _dataContext.SaveChanges();
            return true;
        }
    }
}
