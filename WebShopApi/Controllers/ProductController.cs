﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShopApi.DTO;
using WebShopApi.Interfaces;
using WebShopApi.Services;

namespace WebShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost("add")]
        public IActionResult AddProduct(ProductDto product)
        {
            var returnValue = _productService.AddProduct(product);
            if (returnValue is null)
            {
                return BadRequest("The action is failed.");
            }
            return Ok(returnValue);
        }

        [HttpDelete("delete")]
        public IActionResult DeleteProduct(long id)
        {
            return Ok(_productService.DeleteProduct(id));
        }

        [HttpPost("update")]
        public IActionResult UpdateProduct(ProductDto product, long id)
        {
            return Ok(_productService.UpdateProduct(product, id));
        }

        [HttpGet("find")]
        public IActionResult FindById(long id)
        {
            return Ok(_productService.FindById(id));
        }

        [HttpGet("getall")]
        public IActionResult GetAllProducts()
        {
            return Ok(_productService.GetAllProducts());
        }
    }
}
