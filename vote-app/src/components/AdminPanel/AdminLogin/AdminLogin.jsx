import { signInWithGoogle, logOut } from "../../../config/firebase";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppProvider } from "@toolpad/core";
import Button from '@mui/material/Button';

import LogoutIcon from '@mui/icons-material/Logout';

import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

const AdminLogin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const providers = [
    { id: 'google', name: 'Google' },
  ];

  // Custom sign-in function for Google  
  const signIn = async (provider) => {
    try {
      if (provider.id === "google") {
        await signInWithGoogle();
        if (user) {
          navigate("/admin"); // Redirect to admin panel after login
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // const handleSignIn = async () => {
  //   try {
  //     await signInWithGoogle();
  //     if (user) {
  //       navigate("/admin"); // Redirect to admin panel after login
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const theme = useTheme();

  return (
    <AppProvider theme={theme} >
      <div >
        {user ? (
          <div className="aftersignup" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between",}}>

            <h1>Welcome, {user.displayName}</h1>

              {/* <button onClick={() => navigate("/admin")}>Go to Admin Panel</button> */}
              <Button variant="outlined"   onClick={() => navigate("/admin")}  sx={{width:'200px', marginTop:'10px'}}>Go to Admin Panel</Button>
            
            <Button variant="outlined" onClick={() => { logOut(); navigate("/adminlogin"); }} sx={{width:'200px', marginTop:'10px'}}>Logout <LogoutIcon/></Button>
       
           
          
          </div>
        ) : (
          <div>
            <h1>Admin Login</h1>
            {/* Remove onClick and rely on SignInPage's internal sign-in logic */}
                      {/* <button onClick={handleSignIn}>Sign in with Google</button> */}
                      {/* <Button variant="outlined" onClick={handleSignIn} sx={{width:'200px', marginTop:'10px'}}>Sign Up</Button> */}
                      {error && <p style={{ color: "red" }}>{error}</p>}
            <SignInPage signIn={signIn} providers={providers} />
         
          </div>
        )}
      </div>
    </AppProvider>
  );
};

export default AdminLogin;


// original code