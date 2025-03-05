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
    let [alert_comp,set_alert] = useState([]);
    let [badge,set_badge] = useState([]);
    let [isEditorReady, setIsEditorReady] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#ffffff");

    

    const [webpageCode, setWebpageCode] = useState({ html: "", css: "" });


    
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


    useEffect(() => {
        if (!loading && buttonsData.length > 0 && collapse_comp.length > 0 && nav_bar.length> 0 && button_group.length>0 && card.length>0 && dropdown.length>0 && listgrp.length>0 && alert.length>0 && badge.length && !editorRef.current) {
            const editor = grapesjs.init({
                container: "#gjs",
                fromElement: false,
                width: "100%",
                height: "600px",
                storageManager: false,
                styleManager: {
                    sectors: [
                      {
                        name: 'Typography',
                        open: true,
                        buildProps: ['color', 'font-size', 'font-family', 'text-align'],
                        properties: [
                          {
                            property: 'color',
                            type: 'color',
                            defaults: 'black',
                          },
                        ],
                      },
                    ],
                  },
                
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

            editor.DomComponents.addType("custom-div", {
                model: {
                  defaults: {
                    tagName: "div",
                    draggable: true,
                    droppable: true,
                    attributes: { class: "custom-div" },
                    styles: `
                      width: 300px;
                      height: 200px;
                      padding: 10px;
                      border: 2px dashed #ccc;
                      background-color: #f9f9f9;
                      position: relative;
                    `,
                    resizable: {
                      tl: 1, tr: 1, bl: 1, br: 1, cl: 1, cr: 1, tc: 1, bc: 1,
                    },
                    highlightable: true, 
                    traits: [
                      { type: "text", label: "ID", name: "id" },
                      { type: "text", label: "Class", name: "class" },
                    ],
                  },
                },
              });
              
            editor.Panels.addButton("options", {
                id: "get-html-css",
                className: "fa fa-save", 
                command: "get-html-css",
                attributes: { title: "Get HTML & CSS" },
            });

            editor.Panels.addButton("options", {
                id: "color-picker",
                className: "fa fa-paint-brush", 
                attributes: { title: "Change Background Color" },
                active: false,
    
               
                command: "open-color-picker",
            });

            editor.Commands.add("open-color-picker", {
                run: (editor) => {
                    const selectedComponent = editor.getSelected();
                    if (!selectedComponent) {
                        alert("Select a component first!");
                        return;
                    }
    
                   
                    let colorInput = document.getElementById("color-input");
                    if (!colorInput) {
                        colorInput = document.createElement("input");
                        colorInput.type = "color";
                        colorInput.id = "color-input";
                        colorInput.style.position = "absolute";
                        colorInput.style.top = "50px";
                        colorInput.style.left = "50px";
                        colorInput.style.zIndex = "1000";
                        colorInput.style.display = "none";
                        document.body.appendChild(colorInput);
                    }
    
                   
                    colorInput.click();
    
                    
                    colorInput.oninput = (event) => {
                        const newColor = event.target.value;
                        selectedComponent.addStyle({ "background-color": newColor });
                    };
                },
            });
    

              
            

            
            editor.Commands.add("get-html-css", {
                run: (editor) => {
                    b(editorRef.current.getHtml(),editorRef.current.getCss());
                },
            });

            
            
            const blockManager = editor.BlockManager;

           
            const existingCategories = new Set(
                blockManager.getAll().map(block => block.attributes.category)
            );

            editor.BlockManager.add("text-box", {
                label: "Text Box",
                category: "TEXT BOX",
                content: {
                    tagName: "div",
                    type: "text",
                    content: "Double-click to edit...",
                    attributes: { class: "text-box" },
                    style: {
                        "min-width": "200px",
                        "padding": "10px",
                        "border": "1px solid black",
                        "display": "block",
                        "cursor": "text",
                    },
                    editable: true, 
                },
            });

            editor.BlockManager.add("plain-text", {
                label: "Plain Text",
                category: "Plain text",
                content: {
                    tagName: "span", 
                    type: "text",
                    content: "Double-click to edit...",
                    style: {
                        "display": "inline",
                        "font-size": "16px",
                        "color": "#000",
                    },
                    editable: true, 
                },
            });

            editor.BlockManager.add("div-box", {
                label: "Div Box",
                category: "Containers",
                attributes: { class: "fa fa-square" },
                content: { type: "custom-div" },
              });

              
              const compType = editor.Components.getType("custom-div");
              if (compType) {
                compType.model.prototype.defaults.resizable = {
                  tl: 1, tr: 1, bl: 1, br: 1, cl: 1, cr: 1, tc: 1, bc: 1,
                };
              }

            
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

            
            if (!existingCategories.has("Collapse componenets")) {
                collapse_comp.forEach((card) => {
                    if (!blockManager.get(card.id)) {
                        blockManager.add(card.id, {
                            label: `<div style="padding:5px;">${card.html_code}</div>`,
                            category: "Collapse componenets",
                            content: {
                                type: "Collapse component", 
                                components: card.html_code, 
                                draggable: true,
                                selectable: true,
                                copyable: true,
                                attributes: { class: "gjs-no-select" }, 
                                removable: true, 
                                stylable: true, 
                            },
                            wrapper: true, 
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
                                type: "Nav Bar", 
                                components: card.html_code, 
                                draggable: true, 
                                selectable: true, 
                                copyable: true, 
                                attributes: { class: "gjs-no-select" }, 
                                removable: true, 
                                stylable: true, 
                            },
                            wrapper: true, 
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
                                type: "Nav Bar", 
                                components: card.html_code,
                                draggable: true, 
                                selectable: true, 
                                copyable: true, 
                                attributes: { class: "gjs-no-select" }, 
                                removable: true, 
                                stylable: true, 
                            },
                            wrapper: true, 
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
                                type: "Card", 
                                components: card_data.html_code, 
                                draggable: true, 
                                selectable: true, 
                                copyable: true, 
                                attributes: { class: "gjs-no-select" }, 
                                removable: true, 
                                stylable: true, 
                            },
                            wrapper: true, 
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
                                type: "drodown", 
                                components: card.html_code, 
                                draggable: true, 
                                selectable: true, 
                                copyable: true, 
                                attributes: { class: "gjs-no-select" }, 
                                removable: true, 
                                stylable: true, 
                            },
                            wrapper: true, 
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
                                type: "List group", 
                                components: card.html_code, 
                                draggable: true, 
                                selectable: true, 
                                copyable: true, 
                                attributes: { class: "gjs-no-select" }, 
                                removable: true, 
                                stylable: true, 
                            },
                            wrapper: true, 
                        });
                    }
                });
            }

            if (!existingCategories.has("alerts")) {
                alert_comp.forEach((card) => {
                    if (!blockManager.get(card.id)) {
                        blockManager.add(card.id, {
                            label: `<div style="padding:5px;">${card.html_code}</div>`,
                            category: "Alerts",
                            content: {
                                type: "Alerts", 
                                components: card.html_code, 
                                draggable: true, 
                                selectable: true, 
                                copyable: true, 
                                attributes: { class: "gjs-no-select" }, 
                                removable: true, 
                                stylable: true, 
                            },
                            wrapper: true, 
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
                                type: "Badge", 
                                components: card.html_code, 
                                draggable: true, 
                                selectable: true, 
                                copyable: true, 
                                attributes: { class: "gjs-no-select" },
                                removable: true, 
                                stylable: true, 
                            },
                            wrapper: true, 
                        });
                    }
                });
            }


            
            

            setIsEditorReady(true);
        }
    }, [loading, buttonsData, collapse_comp,nav_bar,button_group,card,dropdown,listgrp,alert,badge]);

    const handleColorChange = (e) => {
        const selected = editorRef.current.getSelected();
        if (selected) {
            selected.setStyle({ "background-color": e.target.value });
            setSelectedColor(e.target.value);
        }
    };

    return (
        <div style={{ display: "flex" }}>
            
            <div
                id="blocks-panel"
                style={{
                    width: "250px",
                    padding: "10px",
                    background: "#f4f4f4",
                    borderRight: "2px solid #ddd",
                    overflowY: "auto",
                    height: "100vh",
                    position: "relative",
                }}
            >
                <h4>Components</h4>

               
                {loading && (
                    <div style={{ textAlign: "center", padding: "10px" }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>

           
            <div id="gjs" style={{ flex: 1, height: "100vh"}}></div>

            



            

        </div>
    );
};

export default GrapesEditor;
