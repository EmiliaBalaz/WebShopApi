﻿using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using WebShopApi.DTO;
using WebShopApi.Interfaces;

namespace WebShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IWebHostEnvironment _environment;

        public UserController(IUserService userService, IWebHostEnvironment environment)
        {
            _userService = userService;
            _environment = environment;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody]LogInUserDto logInUserDto)
        {
            var returnValue = _userService.Login(logInUserDto);
            if(returnValue is null)
            {
                return BadRequest("Login failed.");
            }
            return Ok(returnValue);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterUserDto registerUserDto)
        {
            var returnValue = _userService.Register(registerUserDto);
            if(returnValue is null)
            {
                return BadRequest("Registration failed.");
            }
            return Ok(returnValue);
        }

        [HttpGet("getall")]
        public IActionResult GetAllUsers()
        {
            return Ok(_userService.GetAllUsers());
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdateUser([FromBody]UserDto updateUserDto, int id)
        {
            return Ok(_userService.UpdateUser(updateUserDto, id));
        }

        [HttpDelete("delete")]
        public IActionResult DeleteUser(string email)
        {
            return Ok(_userService.DeleteUser(email));  
        }

        [HttpGet("find/{id}")]
        public IActionResult FindUser(int id)
        {
            return Ok(_userService.FindById(id));
        }

        [HttpPost("addpicture"), DisableRequestSizeLimit]
        public IActionResult AddUsersPicture()
        {
            bool results = false;

            try
            {
                var files = Request.Form.Files;
                foreach(IFormFile source in files)
                {
                    string FileName = source.FileName;
                    string FilePath = GetFilePath();

                    if(!System.IO.Directory.Exists(FilePath))
                    {
                        System.IO.Directory.CreateDirectory(FilePath);
                    }

                    string ImagePath = FilePath + "\\image.png";
                    if (System.IO.File.Exists(ImagePath))
                    {
                        System.IO.File.Delete(ImagePath);
                    }

                    using(FileStream stream = System.IO.File.Create(ImagePath))
                    {
                        source.CopyTo(stream);
                        results = true;
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(results);
        }

        [NonAction]
        private string GetFilePath()
        {
            return this._environment.WebRootPath + "\\Resources\\Images";
        }

        [HttpGet("photo/{id}")]
        public IActionResult getPhoto(int id)
        {

            return Ok(_userService.getPhoto(id));
        }
    }
}
