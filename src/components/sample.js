import React, { useState, useEffect } from "react";

function FullScreenDropArea() {
    const [isDragging, setIsDragging] = useState(false);
    const [components, setComponents] = useState([]); // Components from API
    const [droppedComponents, setDroppedComponents] = useState([]); // Dropped components
    const [showComponents, setShowComponents] = useState(false);
    const [boxPosition, setBoxPosition] = useState({ x: 20, y: 80 }); // Draggable box position
    const [isDraggingBox, setIsDraggingBox] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    // Fetch components from API on mount
    useEffect(() => {
        async function fetchComponents() {
            let response = await fetch("http://localhost:8000/fetch_all", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            let data = await response.json();
            setComponents([...data.data]); // Assuming API returns an array of components
        }
        fetchComponents();
    }, []);

    // Handle Drag Start
    const handleDragStart = (e, component) => {
        e.dataTransfer.setData("component", JSON.stringify(component));
    };

    // Handle Drop
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const componentData = e.dataTransfer.getData("component");
        if (componentData) {
            const component = JSON.parse(componentData);
            setDroppedComponents((prev) => [...prev, component]);
        }
    };

    // Handle Mouse Down on Draggable Box
    const handleMouseDown = (e) => {
        setIsDraggingBox(true);
        setStartPosition({ x: e.clientX - boxPosition.x, y: e.clientY - boxPosition.y });
    };

    // Handle Mouse Move (Dragging)
    const handleMouseMove = (e) => {
        if (isDraggingBox) {
            setBoxPosition({
                x: e.clientX - startPosition.x,
                y: e.clientY - startPosition.y,
            });
        }
    };

    // Handle Mouse Up (Stop Dragging)
    const handleMouseUp = () => {
        setIsDraggingBox(false);
    };

    return (
        <div
            style={{
                position: "fixed", 
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: isDragging ? "rgba(0, 0, 0, 0.2)" : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed blue",
                transition: "background-color 0.3s ease",
                zIndex: 1000,
            }}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <p>Drag & Drop components here</p>

            {/* Show Components Button - Hidden when box is visible */}
            {!showComponents && (
                <button
                    onClick={() => setShowComponents(true)}
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        padding: "10px",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    Show Components
                </button>
            )}

            {/* Draggable Components Box */}
            {showComponents && (
                <div
                    style={{
                        position: "absolute",
                        top: `${boxPosition.y}px`,
                        left: `${boxPosition.x}px`,
                        background: "#fff",
                        padding: "10px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                        cursor: "move",
                        width: "250px",
                    }}
                    onMouseDown={handleMouseDown}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setShowComponents(false)}
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            background: "red",
                            color: "white",
                            border: "none",
                            padding: "5px 8px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            fontSize: "14px",
                        }}
                    >
                        ❌
                    </button>

                    <h3 style={{ textAlign: "center" }}>Loaded Components</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {components.map((comp, index) => (
                            <div
                                key={index}
                                draggable
                                onDragStart={(e) => handleDragStart(e, comp)}
                                style={{
                                    padding: "10px",
                                    backgroundColor: "#ddd",
                                    cursor: "grab",
                                    borderRadius: "5px",
                                }}
                            >
                                {comp.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Display Dropped Components */}
            {droppedComponents.length > 0 && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        background: "#fff",
                        padding: "10px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Dropped Components</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {droppedComponents.map((comp, index) => (
                            <li
                                key={index}
                                style={{
                                    marginTop: "10px",
                                    padding: "10px",
                                    backgroundColor: "#eee",
                                    borderRadius: "5px",
                                }}
                            >
                                {comp.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default FullScreenDropArea;
