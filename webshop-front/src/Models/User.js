export class User {
    constructor(
      UserId=0,
      UserName="",
      Password="",
      FirstName="",
      LastName="",
      Birthday="",
      Address="",
      Email="",
      Photo="",
      UserType=1
    ) {
      this.userId=UserId;
      this.userName = UserName;
      this.password = Password;
      this.firstName = FirstName;
      this.lastName = LastName;
      this.birthday = Birthday;
      this.address = Address;
      this.email = Email;
      this.photo = Photo;
      this.userType = UserType;
    }
  }
  export default User;