import React, { useState, useEffect } from "react";

function Button_components() {
    let [l, set_l] = useState(1);
    let [comp, set_comp] = useState([]);
    let [droppedComponents, setDroppedComponents] = useState([]);
    let [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    let [draggingIndex, setDraggingIndex] = useState(null);


    useEffect(() => {
        async function t() {
            let op = await fetch("http://localhost:8000/fetch_all", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            let rrgh = await op.json();
            set_comp([...rrgh.data]);
            set_l(0);
        }
        t();
    }, []);

    const handleDragStart = (e, data, index = null) => {
        const rect = e.target.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setDraggingIndex(index);
        e.dataTransfer.setData("text/plain", JSON.stringify(data));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const canvasRect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - canvasRect.left - dragOffset.x;
        const y = e.clientY - canvasRect.top - dragOffset.y;
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));

        setDroppedComponents((prev) => {
            if (draggingIndex !== null) {
                return prev.map((comp, i) =>
                    i === draggingIndex ? { ...comp, x, y } : comp
                );
            }
            return [...prev, { ...data, x, y }];
        });
        setDraggingIndex(null);
    };

    if (l === 1) {
        return <p>LOADING</p>;
    }

    return (
        <div>
            <h3>Draggable Components</h3>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {comp.map((index, val) => {
                    const iframeSrcDoc = `
                        <html>
                        <head>
                            <style>${index.css_code}</style>
                        </head>
                        <body>
                            ${index.html_code}
                        </body>
                        </html>
                    `;

                    return (
                        <div
                            key={val}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            style={{
                                marginBottom: "20px",
                                cursor: "grab",
                                border: "1px dashed gray",
                                padding: "10px",
                                background: "white",
                            }}
                        >
                            <iframe
                                title={`iframe-${val}`}
                                srcDoc={iframeSrcDoc}
                                style={{
                                    width: "150px",
                                    height: "100px",
                                    border: "1px solid black",
                                }}
                            />
                            <p style={{ textAlign: "center", marginTop: "5px" }}>
                                Drag Me
                            </p>
                        </div>
                    );
                })}
            </div>

            <h3>Drop Components Here</h3>
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                style={{
                    width: "100%",
                    minHeight: "400px",
                    border: "2px dashed blue",
                    padding: "20px",
                    marginTop: "20px",
                    background: "#f8f9fa",
                    position: "relative",
                }}
            >
                {droppedComponents.length === 0 && (
                    <p style={{ textAlign: "center", color: "gray" }}>
                        Drag components here to add them to the canvas.
                    </p>
                )}
                {droppedComponents.map((comp, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, comp, index)}
                        style={{
                            position: "absolute",
                            left: `${comp.x}px`,
                            top: `${comp.y}px`,
                            cursor: "move",
                        }}
                    >
                         <style>{comp.css_code}</style>
                        
                        <div dangerouslySetInnerHTML={{ __html: comp.html_code }} />
                    </div>
                ))}
            </div>

            
        </div>
    );
}

export default Button_components;
