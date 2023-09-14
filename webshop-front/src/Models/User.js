export class User {
    constructor(
      Id=0,
      UserName="",
      Password="",
      FirstName="",
      LastName="",
      Birthday="",
      Address="",
      Email="",
      Photo="",
      UserType=1,
      Veryfied,
    ) {
      this.Id=Id;
      this.userName = UserName;
      this.password = Password;
      this.firstName = FirstName;
      this.lastName = LastName;
      this.birthday = Birthday;
      this.address = Address;
      this.email = Email;
      this.photo = Photo;
      this.userType = UserType;
      this.veryfied = Veryfied;
    }
  }
  export default User;