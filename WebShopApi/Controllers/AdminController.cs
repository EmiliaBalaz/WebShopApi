using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using WebShopApi.DTO;
using WebShopApi.Interfaces;
using static WebShopApi.Enums.Enums;

namespace WebShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("getsellers")]
        public IActionResult GetAllSellers()
        {
            return Ok(_adminService.GetAllSellers());
        }

        [HttpPost("activate")]
        public IActionResult ActivateUser([FromBody] UserEmailDto email)
        {
            if (email.Email == "")
                return BadRequest("Bad email foramt");

            var result = _adminService.ActivateUser(email);

            if (!result)
                return BadRequest("Activation failed");
            else
                return Ok(result);
        }

        [HttpPut("verify/{id}/{value}")]
        public IActionResult VerifySeller(int id, VeryfiedType value)
        {

            var result = _adminService.VerifySeller(id, value);

            if (!result)
                return BadRequest("Verification failed");
            else
                return Ok(result);
        }
    }
}
