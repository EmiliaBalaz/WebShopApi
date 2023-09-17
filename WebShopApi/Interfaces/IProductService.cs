using WebShopApi.DTO;
using WebShopApi.Models;

namespace WebShopApi.Interfaces
{
    public interface IProductService
    {
        public ProductDto AddProduct(ProductDto product);
        public bool DeleteProduct(int id);
        public bool UpdateProduct(ProductDto product, int id);
        ProductDto FindById(int id);
        List<ProductDto> GetAllProducts();
    }
}
