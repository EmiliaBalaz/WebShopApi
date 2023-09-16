import Product from "./Product";

export class Order {
    constructor(
      OrderId=0,
      Comment="",
      Address="",
      Price=0,
      OrderDate=null,
      ShipmentTime=null,
      Products=[],
      
    ) {
      this.orderId=OrderId;
      this.comment=Comment;
      this.address=Address;
      this.price=Price;
      this.orderDate=OrderDate;
      this.shipmentTime=ShipmentTime;
      this.products=Products;
    }
  }
  export default Order;