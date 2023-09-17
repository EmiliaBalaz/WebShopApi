export class Product {
    constructor(
      Id=0,
      Name="",
      Price=0,
      Quantity=1,
      Description="",
      Image="",
      SellerId = 0,
      
    ) {
      this.id=Id;
      this.name=Name;
      this.price=Price;
      this.quantity=Quantity;
      this.description=Description;
      this.image=Image;
      this.sellerId = SellerId;
    }
  }
  export default Product;