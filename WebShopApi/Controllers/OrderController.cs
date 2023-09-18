using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using WebShopApi.DTO;
using WebShopApi.Interfaces;

namespace WebShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("addorder")]
        public IActionResult AddOrder([FromBody]OrderDto newOrder)
        {
            
            return Ok(_orderService.AddOrder(newOrder));
        }

        [HttpGet("getcustomersorder/{id}")]
        public IActionResult GetOrdersByCustomersId(int id)
        {
            return Ok(_orderService.GetOrdersByCustomersId(id));
        }

        [HttpGet("getsellersorder/{id}")]
        public IActionResult GetOrdersSeller(int id)
        {
            return Ok(_orderService.GetOrdersSellers(id));
        }

        

        [HttpDelete("deleteorder/{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var result = _orderService.DeleteOrder(id);
            if (result is false)
            {
                return BadRequest("Delete order is failed");
            }
            return Ok(result);
        }

        [HttpGet("getall")]
        public IActionResult GetAllOrders()
        {
            return Ok(_orderService.GetAllOrders());
        }
    }
}
