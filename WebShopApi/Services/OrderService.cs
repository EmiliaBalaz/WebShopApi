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
            List<ProductModel> productsFromFront =  _mapper.Map<List<ProductModel>>(newOrder.Products);
            List<ProductModel> productsFromDatabase = _dataContext.Products.ToList();
            List<OrderProductModel> orderProducts= new List<OrderProductModel>();

            foreach (ProductModel product in productsFromFront)
            {
                ProductModel matchingProduct = _dataContext.Products.Find(product.Id);
                if (matchingProduct != null)
                {
                    DecreaseQuantity(matchingProduct.Id, product.Quantity);
                    orderProducts.Add(new OrderProductModel() { OrderId = matchingProduct.Id, Product = matchingProduct, Quantity = product.Quantity });
                }
            }

            Random random = new Random();
            DateTime now = DateTime.Now;
            DateTime nextTime = now.AddDays(15);
            int totalMinutes = (int)(nextTime - now).TotalMinutes;
            int randomMinutes = random.Next(totalMinutes);
            DateTime randomTime = now.AddMinutes(randomMinutes);

            OrderModel order = new OrderModel();

            order.Address = newOrder.Address;
            order.Price = newOrder.Price;
            order.OrderDate = newOrder.OrderDate;
            order.Comment= newOrder.Comment;
            order.ShipmentDate = randomTime;
            order.OrderProducts = orderProducts;
            order.CustomerId = newOrder.CustomerId;
            foreach (OrderProductModel op in orderProducts)
            {
                op.Order = order;
            }

            _dataContext.Add(order);
            _dataContext.SaveChanges();
            return _mapper.Map<OrderDto>(order);
        }


        public List<OrderDto> GetOrdersByCustomersId(int id)
        {
            List<OrderModel> listOfOrders = _dataContext.Orders.ToList().Where(o => o.CustomerId== id).ToList(); 
            return _mapper.Map<List<OrderDto>>(listOfOrders);
        }

        public List<OrderDto> GetOrdersSellers(int sellerId)
        {
            List<OrderModel> orders = _dataContext.Orders.Where(o=>o.OrderProducts.Any(p=>p.Product.SellerId==sellerId)).ToList();
            return _mapper.Map<List<OrderDto>>(orders);
        }

        private void DecreaseQuantity(int id, int quantity)
        {
            ProductModel product = _dataContext.Products.Find(id);
            product.Quantity -= quantity;
            _dataContext.SaveChanges();

        }
    }
}
