export class Product {
    constructor(
      Id=0,
      Name="",
      Price=0,
      Quantity=1,
      Description="",
      Image=""
      
    ) {
      this.id=Id;
      this.name=Name;
      this.price=Price;
      this.quantity=Quantity;
      this.description=Description;
      this.image=Image;
    }
  }
  export default Product;