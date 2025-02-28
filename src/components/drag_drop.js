import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";



const GrapesEditor = () => {
    let editorRef = useRef(null);
    let [loading, setLoading] = useState(true);
    let [buttonsData, setButtonsData] = useState([]);
    let [cardData, setcardData] = useState([]);
    let [isEditorReady, setIsEditorReady] = useState(false);

    /** ✅ Fetch Buttons & Accordions Before Loading Editor */
    useEffect(() => {
        const fetchComponents = async () => {
            try {
                let [buttonsResponse, accordianResponse] = await Promise.all([
                    fetch("http://localhost:8000/fetch_all_buttons", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    }),
                    fetch("http://localhost:8000/fetch_all_collapse", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    }),
                ]);

                let buttonsData = await buttonsResponse.json();
                let accordianData = await accordianResponse.json();

                setButtonsData([...buttonsData.data]);
                setcardData([...accordianData.data]);
            } catch (error) {
                console.error("Error fetching components:", error);
            }
            setLoading(false);
        };

        fetchComponents();
    }, []);

    /** ✅ Initialize GrapesJS After Fetching Components */
    useEffect(() => {
        if (!loading && buttonsData.length > 0 && cardData.length > 0 && !editorRef.current) {
            const editor = grapesjs.init({
                container: "#gjs",
                fromElement: false,
                width: "100%",
                height: "600px",
                storageManager: false,
                plugins: ["gjs-preset-webpage"],
                pluginsOpts: { "gjs-preset-webpage": {} },
                canvas: {
                    styles: [
                        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
                    ],
                    scripts: [
                        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
                    ],
                },
                blockManager: { appendTo: "#blocks-panel" },
                dragMode: "absolute",
            });

            editorRef.current = editor;
            const blockManager = editor.BlockManager;

            // ✅ Get existing categories from already added blocks
            const existingCategories = new Set(
                blockManager.getAll().map(block => block.attributes.category)
            );

            /** ✅ Ensure "Buttons" category exists & add buttons */
            if (!existingCategories.has("Buttons")) {
                buttonsData.forEach((button) => {
                    if (!blockManager.get(button.id)) {
                        blockManager.add(button.id, {
                            label: `<div style="padding:20px;">${button.html_code}</div>`,
                            category: "Buttons",
                            content: button.html_code,
                        });
                    }
                });
            }

            /** ✅ Ensure "Accordion" category exists & add accordions */
            if (!existingCategories.has("Cards")) {
                cardData.forEach((card) => {
                    if (!blockManager.get(card.id)) {
                        blockManager.add(card.id, {
                            label: `<div style="padding:5px;">${card.html_code}</div>`,
                            category: "Cards",
                            content: {
                                type: "card", // Custom component type for Cards
                                components: card.html_code, // Use stored card HTML
                                draggable: true, // Allow dragging the entire card
                                selectable: true, // Select the whole card
                                copyable: true, // Enable copy-paste
                                attributes: { class: "gjs-no-select" }, // Prevents separate selection of child elements
                                removable: true, // Allow card removal
                                stylable: true, // Allow styling in editor
                            },
                            wrapper: true, // Ensures it's treated as a single unit
                        });
                    }
                });
            }
            
            

            setIsEditorReady(true);
        }
    }, [loading, buttonsData, cardData]);

    return (
        <div style={{ display: "flex" }}>
            {/* ✅ Block Panel */}
            <div
                id="blocks-panel"
                style={{
                    width: "250px",
                    padding: "10px",
                    background: "#f4f4f4",
                    borderRight: "2px solid #ddd",
                    overflowY: "auto",
                    height: "600px",
                    position: "relative",
                }}
            >
                <h4>Components</h4>

                {/* ✅ Loading Spinner */}
                {loading && (
                    <div style={{ textAlign: "center", padding: "10px" }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* ✅ GrapesJS Main Editor */}
            <div id="gjs" style={{ flex: 1 }}></div>
        </div>
    );
};

export default GrapesEditor;
