using WebShopApi.DTO;
using WebShopApi.Models;

namespace WebShopApi.Interfaces
{
    public interface IProductService
    {
        public ProductDto AddProduct(ProductDto product);
        public bool DeleteProduct(long id);
        public bool UpdateProduct(ProductDto product, long id);
        ProductDto FindById(long id);
        List<ProductDto> GetAllProducts();
    }
}
