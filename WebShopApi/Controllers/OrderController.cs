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

        [HttpPost("add")]
        public IActionResult AddOrder(OrderDto newOrder)
        {
            var result = _orderService.AddOrder(newOrder);
            if(result is null)
            {
                BadRequest("Adding product is failed.");
            }
            return Ok(result);
        }

        [HttpPost("addtochart")]
        public IActionResult AddProductToChart(ProductDto product)
        {
            var result = _orderService.AddProductToChart(product);
            if (result is null)
            {
                BadRequest("Adding product to chart is failed.");
            }
            return Ok(result);
        }

        [HttpGet("getchart")]
        public IActionResult GetFromChart()
        {
            var result = _orderService.GetFromChart();
            if (result is null)
            {
                BadRequest("Getting product from  chart is failed.");
            }
            return Ok(result);
        }
    }
}
