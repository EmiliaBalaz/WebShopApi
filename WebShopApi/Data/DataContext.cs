using Microsoft.EntityFrameworkCore;
using WebShopApi.Models;

namespace WebShopApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<ProductModel> Products { get; set; }
    }
}
