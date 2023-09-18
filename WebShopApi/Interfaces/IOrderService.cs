using WebShopApi.DTO;

namespace WebShopApi.Interfaces
{
    public interface IOrderService
    {
        OrderDto AddOrder(OrderDto newOrder);
        List<OrderDto> GetOrdersByCustomersId(int id);
        List<OrderDto> GetOrdersSellers(int sellerId);
        List<OrderDto> GetCustomersOrders(int id);
        bool DeleteOrder(int id);
        List<OrderDto> GetAllOrders();
    }
}
