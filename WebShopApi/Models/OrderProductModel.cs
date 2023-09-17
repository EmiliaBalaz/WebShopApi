namespace WebShopApi.Models
{
    public class OrderProductModel
    {
        public int OrderId { get; set; }
        public OrderModel Order { get; set; }

        public int Id { get; set; }
        public ProductModel Product { get; set; }

        public int Quantity { get; set; }
    }
}
