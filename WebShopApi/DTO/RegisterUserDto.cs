using System.ComponentModel.DataAnnotations;
using static WebShopApi.Enums.Enums;

namespace WebShopApi.DTO
{
    public class RegisterUserDto
    {
        [Required(ErrorMessage = "The field with name {0} is required.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "The field with name {0} is required.")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "The field with name {0} is required.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "The field with name {0} is required.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "The field with name {0} is required.")]
        public string PasswordVerify { get; set; }

        [Required(ErrorMessage = "The field with name {0} is required.")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "The field with name {0} is required.")]
        public DateTime Birthday { get; set; }

        [Required(ErrorMessage = "The field with name {0} is required.")]
        public string Address { get; set; }

        [Required(ErrorMessage = "The field with name {0} is required.")]
        public string Photo { get; set; }

        [Required(ErrorMessage = "The field with name {0} is required.")]
        public UserType Type { get; set; }

        [Required(ErrorMessage = "The field with name {0} is required.")]
        public VeryfiedType Veryfied { get; set; }
    }
}
