using static WebShopApi.Enums.Enums;

namespace WebShopApi.DTO
{
    public class UserDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public UserType Type { get; set; }
        public DateTime Birthday { get; set; }
        public string Picture { get; set; }
        public VeryfiedType Veryfied { get; set; }
    }
}
