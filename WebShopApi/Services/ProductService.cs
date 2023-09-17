using AutoMapper;
using WebShopApi.Data;
using WebShopApi.DTO;
using WebShopApi.Interfaces;
using WebShopApi.Models;

namespace WebShopApi.Services
{
    public class ProductService : IProductService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public ProductService(DataContext dataContext, IMapper mapper)
        {
            _dataContext= dataContext;
            _mapper= mapper;
        }
        public ProductDto AddProduct(ProductDto product)
        {
            ProductModel productModel = _mapper.Map<ProductModel>(product);
            _dataContext.Products.Add(productModel);
            _dataContext.SaveChanges();
            return _mapper.Map<ProductDto>(productModel);
        }

        public bool DeleteProduct(int id)
        {
            ProductModel productModel = _dataContext.Products.Find(id);

            if(productModel is null)
            {
                return false;
            }

            _dataContext.Products.Remove(productModel);
            _dataContext.SaveChanges();
            return true;
        }
        public bool UpdateProduct(ProductDto product, int id)
        {
            ProductModel productModel = _dataContext.Products.Find(id);

            productModel.Name = product.Name;
            productModel.Price = product.Price;
            productModel.Description = product.Description;
            productModel.Image = product.Image;
            productModel.Quantity = product.Quantity;

            _dataContext.Products.Update(productModel);
            _dataContext.SaveChanges();
            return true;
        }

        public ProductDto FindById(int id)
        {
            ProductModel productModel = _dataContext.Products.Find(id);
            ProductDto productDto = _mapper.Map<ProductDto>(productModel);
            return productDto;
        }

        public List<ProductDto> GetAllProducts()
        {
            List<ProductDto> listOfProducts = new List<ProductDto>();

            var products = _dataContext.Products;

            foreach (var item in products)
            {
                ProductDto productDto = _mapper.Map<ProductDto>(item);
                listOfProducts.Add(productDto);
            }

            return listOfProducts;
        }

        public List<ProductDto> GetProductsByOrderId(int orderId)
        {
            List<ProductModel> products = _dataContext.Products.Where(p => p.Orders.Any(o => o.OrderId == orderId)).ToList();
            return _mapper.Map<List<ProductDto>>(products);
        }
    }
}
