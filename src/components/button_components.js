import React, { useState, useEffect } from "react";
import { toWords } from "number-to-words";
function Button_components() {
    let [l, set_l] = useState(1);
    let [comp, set_comp] = useState([]);
    let [droppedComponents, setDroppedComponents] = useState([]);
    let [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    let [draggingIndex, setDraggingIndex] = useState(null);

    let [v,set_v] = useState("");

    let [flag,set_flag] = useState(0);
    let [list_of_ids,set_list_of_ids] = useState([]);
    let [body_code,set_body_code] = useState("");
    let [css_code,set_css_code] = useState("");


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

    const handleDragStart = (e, data, m ,k,index = null) => {
        const rect = e.target.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setDraggingIndex(index);
        set_v(m);
        set_flag(k);
        
        e.dataTransfer.setData("text/plain", JSON.stringify(data));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const canvasRect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - canvasRect.left - dragOffset.x;
        const y = e.clientY - canvasRect.top - dragOffset.y;
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));

        
        if(flag==0){
            set_list_of_ids((prevList) => [...prevList, v]);
        }



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

    let download_code = ()=>{

        console.log(droppedComponents);
        let indexInWords = toWords(2453).replace(/[^a-zA-Z]/g,"");
        console.log(indexInWords);




        


    }

    if (l === 1) {
        return <p>LOADING</p>;
    }

    return (
        <div style={{ display: "flex", gap: "20px", height: "100vh", alignItems: "flex-start" }}>
            {/* Drop Area on LHS */}
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                style={{
                    flex: 2,
                    height: "100vh", // Make it full height
                    minHeight: "400px",
                    border: "2px dashed blue",
                    padding: "20px",
                    background: "#f8f9fa",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <h3>Drop Components Here</h3>
                {droppedComponents.length === 0 && (
                    <p style={{ textAlign: "center", color: "gray" }}>
                        Drag components here to add them to the canvas.
                    </p>
                )}
                {droppedComponents.map((comp, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, comp,comp.id ,1,index)}
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

            {/* Draggable Components on RHS */}
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", alignSelf: "start" }}>
                <h3 style={{ gridColumn: "span 2", textAlign: "center" }}>Draggable Components</h3>
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
                            onDragStart={(e) => handleDragStart(e, index,index.id,0)}
                            style={{
                                cursor: "grab",
                                border: "1px dashed gray",
                                padding: "10px",
                                background: "white",
                                textAlign: "center",
                                width: "160px",
                                height: "130px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
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
                            <p>Drag Me</p>
                        </div>
                    );
                })}
            </div>
            <button onClick={download_code}>DOWNLOAD CODE </button>
        </div>
    );
}

export default Button_components;
