namespace WebShopApi.DTO
{
    public class OrderDto
    {
        public string Comment { get; set; }
        public string Address { get; set; }
        public int Price { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime? ShipmentDate { get; set; }
        public int CustomerId { get; set; }
        public List<ProductDto> Products { get; set; }
    }
}
