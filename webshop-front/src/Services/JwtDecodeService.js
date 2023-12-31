import jwtDecode from 'jwt-decode';

import User from '../Models/User.js'

 export function decodeJWTToken(token) {
  try {
    // Decode the JWT token
    const decodedToken = jwtDecode(token);

    // Extract the claims from the decoded token
    const {Id, UserName, Password, FirstName, LastName,Birthday, Address,Email,Photo,UserType, Veryfied} = decodedToken;
    var bool;

    
    // Create a new User object with the extracted claims
    const user = new User(
      parseInt(Id),
      UserName,
      Password,
      FirstName,
      LastName,
      Birthday,
      Address,
      Email, 
      Photo,
      UserType,
      Veryfied,
    );
    sessionStorage.setItem("User", JSON.stringify(user));
    sessionStorage.setItem("Token",JSON.stringify(token));
    return user;
    
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
}
export default decodeJWTToken();


// Usage example
//const token = 'your_jwt_token_here';
//const user = decodeJWTToken(token);
//console.log(user);
