using System.ComponentModel.DataAnnotations;

namespace WebShopApi.Models
{
    public class ProductModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; } 
        public string Image { get; set; }

        public int SellerId { get; set; }
        public List<OrderProductModel> Orders { get; set; }


    }
}
