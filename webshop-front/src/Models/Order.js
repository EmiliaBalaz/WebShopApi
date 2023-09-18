import Product from "./Product";

export class Order {
    constructor(
      Comment="",
      Address="",
      Price=0,
      OrderDate=null,
      ShipmentDate=null,
      CustomerId = 0,
      Products=[],
      
    ) {
      this.comment=Comment;
      this.address=Address;
      this.price=Price;
      this.orderDate=OrderDate;
      this.shipmentDate=ShipmentDate;
      this.customerId = CustomerId;
      this.products=Products;
    }
  }
  export default Order;