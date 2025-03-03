import React from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { Button, Container, Typography, Box } from "@mui/material";
import { Google, GitHub } from "@mui/icons-material";

function LoginPage() {
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        if (window.google) {
            window.google.accounts.oauth2.initTokenClient({
                client_id: "176756930560-10jqvf777fv2am0eqt9qvupkisvk2b29.apps.googleusercontent.com",
                scope: "email profile",
                callback: (response) => {
                    console.log("Google Sign-In Response:", response);

                    // Fetch user profile data
                    fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`)
                        .then(res => res.json())
                        .then(user => {
                            console.log("User Info:", user);
                            
                            // Save user info in localStorage (or Context API)
                            //localStorage.setItem("user", JSON.stringify(user));

                            // Redirect to Customer Page
                            navigate("/customer",{ state: { user:JSON.stringify(user) } });
                        })
                        .catch(error => console.error("Error fetching user info:", error));
                },
            }).requestAccessToken();
        } else {
            console.error("Google OAuth client not initialized.");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Box textAlign="center" mb={4}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                    Login
                </Typography>
                <Typography variant="body1" color="textSecondary" mt={1}>
                    Sign in using one of the options below
                </Typography>
            </Box>
            
            <Button 
                variant="contained" 
                color="primary" 
                startIcon={<Google />} 
                sx={{ width: "100%", mb: 2, py: 1.5 }}
                onClick={handleGoogleSignIn}
            >
                Sign in with Google
            </Button>

            <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<GitHub />} 
                sx={{ width: "100%", py: 1.5 }}
            >
                Sign in with GitHub
            </Button>
        </Container>
    );
}

export default LoginPage;
