import React, { useState } from "react";
import { Button, Container, Typography, AppBar, Toolbar, Card, CardContent, Box } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowUpward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const features = [
    { 
        title: "Easy Drag & Drop", 
        description: "Effortlessly create designs by dragging and dropping elements into place. Our intuitive interface allows you to customize layouts, reposition elements, and fine-tune every detail without any coding knowledge."
    },
    { 
        title: "Customizable Templates", 
        description: "Choose from a diverse range of professionally designed templates to kickstart your project. Each template is fully customizable, ensuring that your design matches your vision perfectly."
    },
    { 
        title: "Responsive Design", 
        description: "Your designs will automatically adjust to fit any screen size, whether it's a desktop, tablet, or mobile device. Ensure a seamless user experience across all platforms."
    },
    { 
        title: "Cloud Storage", 
        description: "Save your projects securely in the cloud and access them from anywhere. Work from multiple devices without worrying about losing progress."
    },
    { 
        title: "Real-time Collaboration", 
        description: "Invite team members to collaborate in real-time. Make edits, leave comments, and work together seamlessly, boosting productivity and efficiency."
    }
];

function HomePage() {
    const [activeIndex, setActiveIndex] = useState(0);

    let n = useNavigate();

    const handleNextCard = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % features.length);
    };

    let nav = ()=>{
      
    }

    return (
        <Container maxWidth="xl" sx={{ minHeight: "100vh", bgcolor: "#ffffff", padding: 0 }}>
            <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: "#ffffff", padding: "10px 20px" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        DROP.
                    </Typography>
                    <Button variant="contained" color="primary" size="large" onClick={nav}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" mt={5}>
                <Box flex={1} p={3} textAlign={{ xs: "center", md: "left" }}>
                    <Typography variant="h3" fontWeight="bold" color="primary">
                        Welcome to DROP.
                    </Typography>
                    <Typography variant="h6" color="textSecondary" mt={2}>
                        Create stunning websites with ease.
                    </Typography>
                </Box>
                
                <Box flex={1} height="400px" display="flex" justifyContent="center" alignItems="center" position="relative">
                    {features.map((feature, index) => (
                        <motion.div key={index} 
                            initial={{ opacity: 0, y: 50 }} 
                            animate={{ opacity: activeIndex === index ? 1 : 0, y: activeIndex === index ? 0 : 50 }} 
                            transition={{ duration: 0.5 }}
                            style={{ position: "absolute", display: activeIndex === index ? "block" : "none", width: "100%" }}
                        >
                            <Card sx={{ p: 4, bgcolor: "#f5f5f5", textAlign: "center", width: "90%", boxShadow: 3, borderRadius: "20px" }}>
                                <CardContent>
                                    <Typography variant="h5" fontWeight="bold" color="primary">
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary" mt={2}>
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                                <motion.div 
                                    onClick={handleNextCard}
                                    initial={{ opacity: 0.5 }}
                                    animate={{ opacity: [0.5, 1, 0.5], y: [0, -10, 0] }}
                                    transition={{ duration: 1.2, repeat: Infinity }}
                                    style={{ cursor: "pointer", marginTop: "20px", color: "#1976D2" }}
                                >
                                    <ArrowUpward sx={{ fontSize: 60, filter: "drop-shadow(0px 0px 10px #1976D2)" }} />
                                </motion.div>
                            </Card>
                        </motion.div>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}

export default HomePage;