using System.ComponentModel.DataAnnotations;

namespace WebShopApi.Models
{
    public class ProductModel
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string Quantity { get; set; }
        public string Description { get; set; } 
        public string Image { get; set; }
    }
}
