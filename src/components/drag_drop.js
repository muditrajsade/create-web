import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { useLocation } from "react-router-dom";


const GrapesEditor = ({pagename,b}) => {
    let editorRef = useRef(null);
    let [loading, setLoading] = useState(true);
    let [buttonsData, setButtonsData] = useState([]);
    let [collapse_comp, set_collapse_comp] = useState([]);
    let [nav_bar,set_nav_bar]= useState([]);
    let [button_group,set_button_group] = useState([]);
    let [card,set_card] = useState([]);
    let [dropdown,set_dropdown] = useState([]);
    let [listgrp,set_listgrp] = useState([]);
    let [alert,set_alert] = useState([]);
    let [badge,set_badge] = useState([]);
    let [isEditorReady, setIsEditorReady] = useState(false);

    

    const [webpageCode, setWebpageCode] = useState({ html: "", css: "" });


    /** ✅ Fetch Buttons & Accordions Before Loading Editor */
    useEffect(() => {
        const fetchComponents = async () => {
            try {
                let [buttonsResponse, collapseresponse,nav_bar_response,button_group_response,cardresponse,dropdownresponse,listgrpresponse,alertresponse,badgeresponse] = await Promise.all([
                    fetch("http://localhost:8000/fetch_all_buttons", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    }),
                    fetch("http://localhost:8000/fetch_all_collapse", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    }),
                    fetch("http://localhost:8000/fetch_all_navbar", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    }),
                    fetch("http://localhost:8000/fetch_all_button_group", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    }),
                    fetch("http://localhost:8000/fetch_all_card", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    }),
                    fetch("http://localhost:8000/fetch_all_dropdown", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    }),
                    fetch("http://localhost:8000/fetch_all_list_grp", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    }),
                    fetch("http://localhost:8000/fetch_all_alert", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    }),
                    fetch("http://localhost:8000/fetch_all_badge", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    }),

                ]);

                let buttonsData = await buttonsResponse.json();
                let collapseData = await collapseresponse.json();
                let navbar_data = await nav_bar_response.json();
                let button_group_data = await button_group_response.json();
                let card_data = await cardresponse.json();
                let dropdowndata = await dropdownresponse.json();
                let listgrpdata = await listgrpresponse.json();
                let alertdata = await alertresponse.json();
                let badgedata = await badgeresponse.json();
                

                setButtonsData([...buttonsData.data]);
                set_collapse_comp([...collapseData.data]);
                set_nav_bar([...navbar_data.data]);
                set_button_group([...button_group_data.data]);
                set_card([...card_data.data]);
                set_dropdown([...dropdowndata.data]);
                set_listgrp([...listgrpdata.data]);
                set_alert([...alertdata.data]);
                set_badge([...badgedata.data]);

            } catch (error) {
                console.error("Error fetching components:", error);
            }
            setLoading(false);
        };

        fetchComponents();
    }, []);

    /** ✅ Initialize GrapesJS After Fetching Components */
    useEffect(() => {
        if (!loading && buttonsData.length > 0 && collapse_comp.length > 0 && nav_bar.length> 0 && button_group.length>0 && card.length>0 && dropdown.length>0 && listgrp.length>0 && alert.length>0 && badge.length && !editorRef.current) {
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
            if (!existingCategories.has("Collapse componenets")) {
                collapse_comp.forEach((card) => {
                    if (!blockManager.get(card.id)) {
                        blockManager.add(card.id, {
                            label: `<div style="padding:5px;">${card.html_code}</div>`,
                            category: "Collapse componenets",
                            content: {
                                type: "Collapse component", // Custom component type for Cards
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
            if (!existingCategories.has("Navbar")) {
                nav_bar.forEach((card) => {
                    if (!blockManager.get(card.id)) {
                        blockManager.add(card.id, {
                            label: `<div style="padding:5px;">${card.html_code}</div>`,
                            category: "Nav Bar",
                            content: {
                                type: "Nav Bar", // Custom component type for Cards
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
            if (!existingCategories.has("Button Group")) {
                button_group.forEach((card) => {
                    if (!blockManager.get(card.id)) {
                        blockManager.add(card.id, {
                            label: `<div style="padding:5px;">${card.html_code}</div>`,
                            category: "Button Group",
                            content: {
                                type: "Nav Bar", // Custom component type for Cards
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

            if (!existingCategories.has("Card")) {
                card.forEach((card_data) => {
                    if (!blockManager.get(card_data.id)) {
                        blockManager.add(card_data.id, {
                            label: `<div style="padding:5px;">${card_data.html_code}</div>`,
                            category: "Card",
                            content: {
                                type: "Card", // Custom component type for Cards
                                components: card_data.html_code, // Use stored card HTML
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

            if (!existingCategories.has("Drop downs")) {
                dropdown.forEach((card) => {
                    if (!blockManager.get(card.id)) {
                        blockManager.add(card.id, {
                            label: `<div style="padding:5px;">${card.html_code}</div>`,
                            category: "Drop Downs",
                            content: {
                                type: "drodown", // Custom component type for Cards
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

            if (!existingCategories.has("List Group")) {
                listgrp.forEach((card) => {
                    if (!blockManager.get(card.id)) {
                        blockManager.add(card.id, {
                            label: `<div style="padding:5px;">${card.html_code}</div>`,
                            category: "List Group",
                            content: {
                                type: "List group", // Custom component type for Cards
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

            if (!existingCategories.has("alerts")) {
                alert.forEach((card) => {
                    if (!blockManager.get(card.id)) {
                        blockManager.add(card.id, {
                            label: `<div style="padding:5px;">${card.html_code}</div>`,
                            category: "Alerts",
                            content: {
                                type: "Alerts", // Custom component type for Cards
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

            if (!existingCategories.has("Badge")) {
                badge.forEach((card) => {
                    if (!blockManager.get(card.id)) {
                        blockManager.add(card.id, {
                            label: `<div style="padding:5px;">${card.html_code}</div>`,
                            category: "Badge",
                            content: {
                                type: "Badge", // Custom component type for Cards
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
    }, [loading, buttonsData, collapse_comp,nav_bar,button_group,card,dropdown,listgrp,alert,badge]);

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

            <button
    onClick={() => {
        if (editorRef.current) {
            
            b(editorRef.current.getHtml(),editorRef.current.getCss());
        }
    }}
    style={{ margin: "10px", padding: "8px", background: "blue", color: "white", border: "none", cursor: "pointer" }}
>
    Get HTML & CSS
</button>

        </div>
    );
};

export default GrapesEditor;
