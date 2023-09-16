using AutoMapper;
using WebShopApi.Data;
using WebShopApi.DTO;
using WebShopApi.Interfaces;
using WebShopApi.Models;

namespace WebShopApi.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _dataContext;

        public OrderService(IMapper mapper, DataContext dataContext)
        {
            _mapper = mapper;
            _dataContext = dataContext;
        }

        public OrderDto AddOrder(OrderDto newOrder)
        {
            Random random = new Random();
            DateTime now = DateTime.Now;
            DateTime nextTime = now.AddDays(15);
            int totalMinutes = (int)(nextTime - now).TotalMinutes;
            int randomMinutes = random.Next(totalMinutes);
            DateTime randomTime = now.AddMinutes(randomMinutes);

            OrderModel order = new OrderModel();

            order.OrderId = newOrder.OrderId;
            order.Address = newOrder.Address;
            order.Price = newOrder.Price;
            order.OrderDate = newOrder.OrderDate;
            order.Comment= newOrder.Comment;
            order.ShipmentDate = randomTime;

            _dataContext.Add(order);
            _dataContext.SaveChanges();
            return _mapper.Map<OrderDto>(order);
        }

        public ProductDto AddProductToChart(ProductDto newProduct)
        {
            ProductModel productModel = new ProductModel();
            productModel.Description = "Proizvod za korpu";
            productModel = _mapper.Map<ProductModel>(newProduct);
            _dataContext.Products.Add(productModel);
            _dataContext.SaveChanges();
            return _mapper.Map<ProductDto>(productModel);
        }

        public ProductDto GetFromChart()
        {
            string description = "Proizvod za korpu";
            ProductModel productModel = _dataContext.Products.Find(description);
            ProductDto productDto = _mapper.Map<ProductDto>(productModel);
            return productDto;
        }
    }
}
