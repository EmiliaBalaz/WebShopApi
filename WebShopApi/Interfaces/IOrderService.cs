using WebShopApi.DTO;

namespace WebShopApi.Interfaces
{
    public interface IOrderService
    {
         OrderDto AddOrder(OrderDto newOrder);
        List<OrderDto> GetOrdersByCustomersId(int id);

    }
}
