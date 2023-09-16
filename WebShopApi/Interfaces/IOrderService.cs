using WebShopApi.DTO;

namespace WebShopApi.Interfaces
{
    public interface IOrderService
    {
         OrderDto AddOrder(OrderDto newOrder);

        ProductDto AddProductToChart(ProductDto newProduct);

        ProductDto GetFromChart();
    }
}
