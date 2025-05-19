import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const roleId = decodedToken.roleId; 

    if (roleId == 1) {
      console.log("keldi shu yerga")
      return <Navigate to="/dashboard" replace />;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/" replace />;
  }

  return children; 
}

export default PrivateRoute;