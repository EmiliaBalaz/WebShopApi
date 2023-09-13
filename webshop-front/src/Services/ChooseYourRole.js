export function PickRole() {
    var roles={
      isCustomer:false,
      isSeller:false,
      isAdmin:false
    }
    try {
      var user=JSON.parse(sessionStorage["User"]);
      console.log(user.userType);
      console.log(user.email);
      if(user.userType==="Admin"){
        roles.isAdmin=true;
      }
      else if(user.userType==="Customer"){
        roles.isCustomer=true;
      }
      else if(user.userType==="Seller"){
        roles.isSeller=true;
      }
      console.log(user.userType);
  }
  catch(error){console.log(error)}

return roles;
}
  export default PickRole();