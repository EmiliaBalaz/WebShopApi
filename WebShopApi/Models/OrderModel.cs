using System.ComponentModel.DataAnnotations;

namespace WebShopApi.Models
{
    public class OrderModel
    {
        [Key]
        public int OrderId { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public int Price { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime ShipmentDate { get; set; }
    }
}
