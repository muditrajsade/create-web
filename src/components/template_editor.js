import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage";
import { useLocation } from "react-router-dom";
import { Upload } from "lucide-react";
import Uploadwidget from "./uploadwidjet";

const Template_editor = ({pagename,b, t}) => {
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
    let [templates,set_templates] = useState([]);
    let [isEditorReady, setIsEditorReady] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#ffffff");
    let [img_var,set_img_var] = useState([]);
    //let [resiszable_divs,set_resizable_divs] = useState(3);

    

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
        if (!loading && buttonsData.length > 0 && collapse_comp.length > 0 && nav_bar.length> 0 && button_group.length>0 && card.length>0 && dropdown.length>0 && listgrp.length>0 && alert_comp.length>0 && badge.length>0 &&  !editorRef.current) {
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

            editor.Components.addType('div', {
                isComponent: el => el.tagName === 'DIV',
                extend: 'default',
                model: {
                  defaults: {
                    tagName: 'div',
                    draggable: true,
                    droppable: true,
                    resizable: true,
                    name: 'Div', // This sets the label shown in the component panel!
                  }
                }
              });
              

            

            const mergedCSS = `${t.css_code} 
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slide-in { from { transform: translateX(-100px); } to { transform: translateX(0); } }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

  .fade-in { animation: fade-in 1s ease-in-out; }
  .slide-in { animation: slide-in 1.5s ease-in-out; }
  .bounce { animation: bounce 1.5s infinite; }
`;

            editor.setComponents(t.html_code);
    
            editor.setStyle(mergedCSS);

            function makeComponentResizable(component) {
                const tagName = component.get('tagName');
              
                if (!component || !component.set) return;
              
                // Always reset before applying
                component.set('resizable', true); // force refresh/resizer UI
              
                if (['div', 'nav'].includes(tagName)) {
                  component.set('resizable', {
                    tl: 1, tc: 1, tr: 1,
                    cl: 1, cr: 1,
                    bl: 1, bc: 1, br: 1,
                    keyWidth: 'width',
                    keyHeight: 'height',
                    currentUnit: 'px',
                    minDim: 30,
                    maxDim: 2000,
                  });
                } else if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'].includes(tagName)) {
                  component.set('resizable', {
                    tl: 1, tr: 1, bl: 1, br: 1,
                    keyHeight: 'font-size',
                    currentUnit: 'px',
                    minDim: 10,
                    maxDim: 200,
                  });
                }
              }
              

              editor.on('load', () => {
                const wrapper = editor.getWrapper();
                const allComponents = wrapper.find('*'); // Find all components inside wrapper
              
                allComponents.forEach(comp => {
                  // 🛠 Fix: if a <div> is wrongly detected as type 'text', correct it
                  if (comp.get('tagName') === 'div' && comp.get('type') === 'text') {
                    comp.set('type', 'default'); // GrapesJS's internal name for div
                    comp.set('tagName', 'div');; // Correct the type to div
                  }
              
                  makeComponentResizable(comp); // Apply resizability
                });
              
                // For dynamically added components
                editor.on('component:add', (component) => {
                  makeComponentResizable(component);
                });
              
                // When user selects a component, ensure it's resizable again
                editor.on('component:selected', (component) => {
                  makeComponentResizable(component);
                });
              });
              
              
              

            editor.getWrapper().set('style', {
                height: '100%',
                width: '100%',
                margin: '0',
                padding: '0',
              });

            editor.getConfig().forceClass = true;
            editor.getConfig().clearStyles = false;

            editorRef.current = editor;
            let styleManager = editor.StyleManager;


            

            styleManager.addSector("animations", {
                name: "Animations",
                open: false,
                buildProps: ["animation-name", "animation-duration"],
                properties: [
                  {
                    name: "Animation",
                    property: "animation-name",
                    type: "select",
                    defaults: "none",
                    options: [
                      { value: "none", name: "None" },
                      { value: "fade-in", name: "Fade In" },
                      { value: "slide-in", name: "Slide In" },
                      { value: "bounce", name: "Bounce" },
                    ],
                  },
                  {
                    name: "Duration",
                    property: "animation-duration",
                    type: "select",
                    defaults: "1s",
                    options: [
                      { value: "0.5s", name: "0.5s" },
                      { value: "1s", name: "1s" },
                      { value: "2s", name: "2s" },
                    ],
                  },
                ],
              });

              editor.on("component:selected", (component) => {
                const animationName = component.getStyle()["animation-name"];
                const animationDuration = component.getStyle()["animation-duration"] || "1s";
        
                // Remove old animation classes
                component.removeClass("fade-in slide-in bounce");
        
                if (animationName && animationName !== "none") {
                  component.addClass(animationName);
                  component.addStyle({ animation: `${animationName} ${animationDuration} ease-in-out` });
                }
              });

              editor.DomComponents.addType('image', {
                model: {
                  defaults: {
                    tagName: 'img',
                    attributes: { 
                      src: '' // Example global URL
                    },
                    resizable: true,  // Enable resizing
                    draggable: true,  // Allow dragging
                    selectable: true, // Ensure selection is possible
                    traits: [
                      {
                        type: 'text',
                        label: 'Image URL',
                        name: 'src',
                        changeProp: 1
                      }
                    ]
                  },
                },
                view: {
                  events: {
                    dblclick: function () {
                      var newUrl = prompt("Enter new image URL:");
                      if (newUrl) {
                        this.model.set('attributes', { src: newUrl });
                      }
                    }
                  }
                }
              });

              //div addition

              editor.DomComponents.addType('resizable-div', {
                extend: 'default',
                isComponent: el => el.tagName === 'DIV',
                model: {
                  defaults: {
                    tagName: 'div',
                    resizable: {
                      tl: 1, tr: 1, bl: 1, br: 1,
                      cl: 1, cr: 1, tc: 1, bc: 1,
                      keyWidth: 'width',
                      keyHeight: 'height',
                      currentUnit: 'px',
                      minDim: 50,
                    },
                    draggable: true,
                    droppable: true,
                    selectable: true,
                    highlightable: true,
                    style: {
                      width: '300px',
                      height: '200px',
                      border: '2px dashed #ccc',
                      backgroundColor: '#f9f9f9',
                      position: 'relative',
                    },
                  },
                },
              });
              
              
              //div tag

              
              

              
              
              

             

             
          
              
        

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
                className: "fa fa-border", 
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
                            content: {
                                type: "Button", 
                                components: button.html_code,
                                styles: button.css_code,
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

            

            
            if (!existingCategories.has("Collapse componenets")) {
                collapse_comp.forEach((card) => {
                    if (!blockManager.get(card.id)) {
                        blockManager.add(card.id, {
                            label: `<div style="padding:5px;">${card.html_code}</div>`,
                            category: "Collapse componenets",
                            content: {
                                type: "Collapse component", 
                                components: card.html_code, 
                                styles: card.css_code,
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
                                styles: card.css_code,
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
                                styles: card.css_code,
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
                                styles: card_data.css_code,
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
                                styles: card.css_code,
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
                                styles: card.css_code, 
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
                                styles: card.css_code, 
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
                                styles: card.css_code,
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
    }, [loading, buttonsData, collapse_comp,nav_bar,button_group,card,dropdown,listgrp,alert_comp,badge]);

    
    

    

   

    

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

export default Template_editor;
