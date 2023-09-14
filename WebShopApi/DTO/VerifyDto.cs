using static WebShopApi.Enums.Enums;

namespace WebShopApi.DTO
{
    public class VerifyDto
    {
        public string Email { get; set; }
        public VeryfiedType VerifyType{ get; set; }
    }
}
