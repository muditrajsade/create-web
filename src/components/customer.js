import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography, Avatar, Drawer, List, ListItem, ListItemText, Button,  Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper } from "@mui/material";
import { Card, CardContent, CardActions } from "@mui/material";
import { useLocation } from "react-router-dom";
import { CircularProgress} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Html_contribute from "./html_contribute";
import T from "./template";
function CustomerPage() {
    let navigate = useNavigate();
    let [user, setUser] = useState(null);
    let [openPanel, setOpenPanel] = useState(false);
    let location = useLocation();
    let [projects,set_projects] = useState([]);

    let [abd,set_abd] = useState(1);

    let [proj_No,set_proj_No] = useState(-1);

    let [contribute_state,set_contribute_state] = useState(0);

    


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

    let chng = ()=>{

        set_contribute_state(0);

    }

    if(contribute_state == 2){
        return (
            <T b={chng}/>
        );
    }

    if(contribute_state == 1){
        return (
            <Html_contribute f={chng}/>
        );
    }

    if (!user) return null;

    if(abd == 3){
        return (
            <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
            {projects[proj_No].codes.map((value, index) => (
                <Accordion key={index} sx={{ mb: 2 }}>
                    
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: "#1976d2", color: "white" }}>
                        <Typography fontWeight="bold">{projects[proj_No].pages[index]}.html</Typography>
                    </AccordionSummary>

                   
                    <AccordionDetails>
                        <Paper elevation={3} sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                            <Typography variant="body2" fontWeight="bold" color="textSecondary">
                                CODE:
                            </Typography>
                            <Typography
                                component="pre"
                                sx={{
                                    whiteSpace: "pre-wrap",
                                    fontFamily: "monospace",
                                    bgcolor: "#eee",
                                    p: 2,
                                    borderRadius: 1
                                }}
                            >
                                {value}
                            </Typography>
                        </Paper>
                    </AccordionDetails>
                </Accordion>
            ))}

           
            <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => {
                    set_proj_No(-1);
                    set_abd(0);
                }}
            >
                GO BACK
            </Button>
        </Box>
        );
    }

    if(abd == 1){
        return(
            <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
            <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 1 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" fontWeight="bold" color="primary">
                        Customer Dashboard
                    </Typography>
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                       
                        <Button variant="contained" color="primary" onClick={() => navigate("/build", { state: { user: user } })}> 
                            Build Project
                        </Button>

                        
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
                            <ListItemText primary="Contribute Component"  onClick={()=>{set_contribute_state(1)}}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Contribute Template" onClick={()=>{set_contribute_state(2)}} />
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
                      
                        <Button variant="contained" color="primary" onClick={() => navigate("/build", { state: { user: user } })}> 
                            Build Project
                        </Button>

                       
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
                            <ListItemText primary="Contribute Component"  onClick={()=>{set_contribute_state(1)}}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Contribute Template" onClick={()=>{set_contribute_state(2)}} />
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
    {projects.length > 0 ? (
    projects.map((project, index) => (
        <Card key={index} sx={{ 
            width: 250, 
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
                    onClick={() => {
                        set_abd(3);
                        set_proj_No(index);
                    }}
                >
                    Click Me
                </Button>
            </CardActions>
        </Card>
    ))
) : (
    <Typography variant="h6" textAlign="center" mt={2}>
        No projects
    </Typography>
)}

</Box>


        </Box>
    );
}

export default CustomerPage;
