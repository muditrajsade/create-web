import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography, Avatar, Drawer, List, ListItem, ListItemText, Button } from "@mui/material";
import { Card, CardContent, CardActions } from "@mui/material";
import { useLocation } from "react-router-dom";
import { CircularProgress} from "@mui/material";
function CustomerPage() {
    let navigate = useNavigate();
    let [user, setUser] = useState(null);
    let [openPanel, setOpenPanel] = useState(false);
    let location = useLocation();
    let [projects,set_projects] = useState([]);

    let [abd,set_abd] = useState(1);

    


    useEffect(() => {
            

            async function get_projects(){
                console.log("hello");
                console.log(location.state.user);
                setUser(location.state.user);

                let op = await fetch('http://localhost:8000/fetch_projects',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({email:location.state.user.email}),
                    }
                );

                let fvgh = await op.json();
                console.log(fvgh.data);

                set_projects(fvgh.data);
                set_abd(0);





            }

            get_projects();
        }, []);

    if (!user) return null;

    if(abd == 1){
        return(
            <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
            <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 1 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" fontWeight="bold" color="primary">
                        Customer Dashboard
                    </Typography>
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {/* Navigate to Build Page Button */}
                        <Button variant="contained" color="primary" onClick={() => navigate("/build", { state: { user: user } })}> 
                            Build Project
                        </Button>

                        {/* Profile Image & Hover Email */}
                        <Box sx={{ position: "relative" }}>
                            <Avatar 
                                src={user.picture} 
                                alt="Profile" 
                                sx={{ width: 50, height: 50, cursor: "pointer" }}
                                onClick={() => setOpenPanel(true)}
                            />
                        </Box>
                    </Box>
                    
                </Toolbar>
            </AppBar>

            {/* Side Panel */}
            <Drawer 
                anchor="right" 
                open={openPanel} 
                onClose={() => setOpenPanel(false)}
            >
                <Box sx={{ width: 250, p: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {user.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={2}>
                        {user.email}
                    </Typography>
                    <List>
                        <ListItem button>
                            <ListItemText primary="History" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Account Details" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Settings" />
                        </ListItem>
                        <ListItem button onClick={() => {
                            localStorage.removeItem("user");
                            navigate("/");
                        }}>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            

            <Box 
    sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh" 
    }}
>
    <CircularProgress />
</Box>


        </Box>

        );
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
            <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 1 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" fontWeight="bold" color="primary">
                        Customer Dashboard
                    </Typography>
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {/* Navigate to Build Page Button */}
                        <Button variant="contained" color="primary" onClick={() => navigate("/build", { state: { user: user } })}> 
                            Build Project
                        </Button>

                        {/* Profile Image & Hover Email */}
                        <Box sx={{ position: "relative" }}>
                            <Avatar 
                                src={user.picture} 
                                alt="Profile" 
                                sx={{ width: 50, height: 50, cursor: "pointer" }}
                                onClick={() => setOpenPanel(true)}
                            />
                        </Box>
                    </Box>
                    
                </Toolbar>
            </AppBar>

            {/* Side Panel */}
            <Drawer 
                anchor="right" 
                open={openPanel} 
                onClose={() => setOpenPanel(false)}
            >
                <Box sx={{ width: 250, p: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {user.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={2}>
                        {user.email}
                    </Typography>
                    <List>
                        <ListItem button>
                            <ListItemText primary="History" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Account Details" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Settings" />
                        </ListItem>
                        <ListItem button onClick={() => {
                            localStorage.removeItem("user");
                            navigate("/");
                        }}>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            

            <Box sx={{ 
    display: "flex", 
    flexWrap: "wrap", 
    justifyContent: "center", 
    gap: 3, 
    padding: 2 
}}>
    {projects.map((project, index) => (
        <Card key={index} sx={{ 
            width: 250,  // Fixed width for each card
            padding: "10px", 
            borderRadius: "16px", 
            boxShadow: 3, 
            textAlign: "center"
        }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold">
                    {project.project_title}
                </Typography>
            </CardContent>
            <CardActions>
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    onClick={() => {}}
                >
                    Click Me
                </Button>
            </CardActions>
        </Card>
    ))}
</Box>


        </Box>
    );
}

export default CustomerPage;
