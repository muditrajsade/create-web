import React, { useState, useEffect } from "react";
import { toWords } from "number-to-words";
function Button_components() {
    let [l, set_l] = useState(1);
    let [comp, set_comp] = useState([]); //components
    let [droppedComponents, setDroppedComponents] = useState([]);
    let [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    let [draggingIndex, setDraggingIndex] = useState(null);

    let [v,set_v] = useState("");
    let [flag,set_flag] = useState(0);
    let [list_of_ids,set_list_of_ids] = useState([]);
    let [body_code,set_body_code] = useState("");
    let [css_code,set_css_code] = useState("");
    let [isMinimized, setIsMinimized] = useState(false);

    

    


    useEffect(() => {
        async function t() {
            let buttons = await fetch("http://localhost:8000/fetch_all_buttons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            let rrgh = await buttons.json();


            set_comp([...rrgh.data]);
            set_l(0);
        }
        t();
    }, []);

    let get_buttons = async ()=>{
        set_l(1);
        let buttons = await fetch("http://localhost:8000/fetch_all_buttons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        let rrgh = await buttons.json();


        set_comp([...rrgh.data]);
        set_l(0);

    }

    let get_accordian = async ()=>{

        set_l(1);
        let accordian = await fetch("http://localhost:8000/fetch_all_accordian", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        let rrgh = await accordian.json();


        set_comp([...rrgh.data]);
        set_l(0);

    }

    let get_alerts = async () =>{
        set_l(1);
        let alert = await fetch("http://localhost:8000/fetch_all_alert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        let rrgh = await alert.json();


        set_comp([...rrgh.data]);
        set_l(0);
    }

    let get_badges = async ()=>{

        set_l(1);
        let badge = await fetch("http://localhost:8000/fetch_all_badge", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        let rrgh = await badge.json();


        set_comp([...rrgh.data]);
        set_l(0);

    }

    let get_button_grp = async ()=>{
        set_l(1);
        let btngrp = await fetch("http://localhost:8000/fetch_all_button_group", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        let rrgh = await btngrp.json();


        set_comp([...rrgh.data]);
        set_l(0);
    }

    let get_cards = async()=>{
        set_l(1);
        let card = await fetch("http://localhost:8000/fetch_all_card", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        let rrgh = await card.json();


        set_comp([...rrgh.data]);
        set_l(0);
    }

    let get_carousel = async ()=>{
        set_l(1);
        let carousel = await fetch("http://localhost:8000/fetch_all_carousel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        let rrgh = await carousel.json();


        set_comp([...rrgh.data]);
        set_l(0);
    }

    let get_collapse = async()=>{

        set_l(1);
        let collapse = await fetch("http://localhost:8000/fetch_all_collapse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        let rrgh = await collapse.json();


        set_comp([...rrgh.data]);
        set_l(0);

    }

    let get_dropdown = async () =>{
        set_l(1);
        let dropdown = await fetch("http://localhost:8000/fetch_all_dropdown", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        let rrgh = await dropdown.json();


        set_comp([...rrgh.data]);
        set_l(0);
    }

    let get_list_group = async ()=>{
        set_l(1);
        let list_grp  = await fetch("http://localhost:8000/fetch_all_list_grp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        let rrgh = await list_grp.json();


        set_comp([...rrgh.data]);
        set_l(0);
    }

    let get_nav_bar = async ()=>{

        set_l(1);
        let navbar  = await fetch("http://localhost:8000/fetch_all_navbar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        let rrgh = await navbar.json();


        set_comp([...rrgh.data]);
        set_l(0);

    }

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
        let body_code="";
        let style_code="";
        for(let ggvc=0;ggvc<droppedComponents.length;ggvc++){
            let h = droppedComponents[ggvc];
            let iimp = toWords(ggvc).replace(/[^a-zA-Z]/g,"");

            let a = h.css_code.replace(/(^|\n)(\s*)(\.[\w-]+)/g, `$1$2#${iimp} $3`);
            let b = h.html_code.replace('<div>', `<div id="${iimp}">`);

            a+=`\n#${iimp} { position: absolute; left: ${h.x}px; top: ${h.y}px; }`;
            body_code+=b;
            style_code+=a;
        }

        let full_html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
    <style>
        ${style_code}
    </style>
</head>
<body>
    ${body_code}
</body>
</html>
`;

        const blob = new Blob([full_html], { type: "text/html" });
        const fileURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = fileURL;
        a.download = "generated_file.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(fileURL);
    }

    if (l === 1) {
        return <p>LOADING</p>;
    }

    return (
        <div style={{ display: "flex", gap: "20px", height: "100vh", alignItems: "flex-start" }}>
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                style={{
                    flex: isMinimized ? 4 : 2,
                    height: "100vh",
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
                {droppedComponents.map((comp, index) => {

                    console.log(comp);

                    return(
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
                );})}
            </div>

            {!isMinimized && (
                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", alignSelf: "start" }}>
                    <button onClick={get_buttons}>buttons</button>
                    <button onClick={get_accordian}>Accordion</button>
                    <button onClick={get_alerts}>Alerts</button>
                    <button onClick={get_badges}>badge</button>
                    <button onClick={get_button_grp}>Button Group</button>
                    <button onClick={get_cards}>Cards</button>
                    <button onClick={get_carousel}>Carousel</button>
                    <button onClick={get_collapse}>Collapse</button>
                    <button onClick={get_dropdown}>Dropdowns</button>
                    <button onClick={get_list_group}>List Group</button>
                    <button onClick={get_nav_bar}>Navbar</button>
                    <h3 style={{ gridColumn: "span 2", textAlign: "center" }}>Draggable Components</h3>
                    {comp.map((index, val) => {
                        let iframeSrcDoc = `
                            <html>
                            <head>
                                <style>${index.css_code}</style>
                            </head>
                            <body>
                                ${index.html_code}
                            </body>
                            </html>
                        `;

                        if(index.bootstrap_css_used == "true"){
                            iframeSrcDoc = `
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>${index.css_code}</style>
        </head>
        <body>
            ${index.html_code}
        </body>
        </html>
    `;
                        }

                        if(index.bootstrap_js_used == "true"){
                            iframeSrcDoc = `
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
            <style>${index.css_code}</style>
        </head>
        <body>
            ${index.html_code}

            <!-- Bootstrap JS -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `;
                        }

                        if(index.bootstrap_css_used == "true" && index.bootstrap_js_used == "true"){
                            iframeSrcDoc = `
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>${index.css_code}</style>
        </head>
        <body>
            ${index.html_code}

            <!-- Bootstrap JS -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `;
                        }
                        console.log(index);
                        console.log(iframeSrcDoc);

                        return (
                            <div
                                key={val}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index,index.id,0)}
                                style={{ cursor: "grab", border: "1px dashed gray", padding: "10px", background: "white", textAlign: "center", width: "160px", height: "130px" }}
                            >
                                <iframe title={`iframe-${val}`} srcDoc={iframeSrcDoc} style={{ width: "150px", height: "100px", border: "1px solid black" }} />
                                <p>Drag Me</p>
                            </div>
                        );
                    })}
                </div>
            )}
            <div style={{
    position: "fixed",
    right: "0",
    top: "0",  // Move it to the top
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#333",
    padding: "10px",
    borderRadius: "0 0 0 10px", // Adjust border-radius for top-right alignment
    boxShadow: "-2px 0 5px rgba(0,0,0,0.2)"
}}>
    <button onClick={() => setIsMinimized(!isMinimized)} 
        title={isMinimized ? "Expand" : "Minimize"} 
        style={{ fontSize: "20px", background: "none", border: "none", cursor: "pointer", color: "white" }}>
        {isMinimized ? "🔼" : "🔽"}
    </button>
    <button onClick={download_code} 
        title="Download Code" 
        style={{ fontSize: "20px", background: "none", border: "none", cursor: "pointer", color: "white" }}>
        ⬇️
    </button>
</div>





        </div>
    );
}
export default Button_components;
