using System.ComponentModel.DataAnnotations;

namespace WebShopApi.DTO
{
    public class LogInUserDto
    {
        [Required(ErrorMessage = "The field with name {0} is reqiered.")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "The field with name {0} is reqiered.")]
        [MinLength(1)]
        [MaxLength(32)]
        public string Password { get; set; }
    }
}
