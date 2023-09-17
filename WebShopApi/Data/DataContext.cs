using Microsoft.EntityFrameworkCore;
using WebShopApi.Models;

namespace WebShopApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<ProductModel> Products { get; set; }
        public DbSet<OrderModel> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);

            modelBuilder.Entity<OrderProductModel>()
                .HasKey(op => new { op.OrderId, op.Id });

            modelBuilder.Entity<OrderProductModel>()
                .HasOne(op => op.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(op => op.OrderId);

            modelBuilder.Entity<OrderProductModel>()
                .HasOne(op => op.Product)
                .WithMany(p => p.Orders)
                .HasForeignKey(op => op.Id);

            modelBuilder.Entity<OrderProductModel>()
                .Property(op => op.Quantity);


            modelBuilder.Entity<OrderProductModel>()
               .ToTable("OrderProducts");


            // You can specify a custom table name if needed
        }
    }
}
