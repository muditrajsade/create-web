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
    let [forms,set_forms] = useState([]);
    let [inputs,set_inputs] = useState([]);
    let [templates,set_templates] = useState([]);
    let [isEditorReady, setIsEditorReady] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#ffffff");
    let [img_var,set_img_var] = useState([]);
    //let [resiszable_divs,set_resizable_divs] = useState(3);

    let [js,set_js] = useState("<script>");
    const jsRef = useRef(js);

    

    const [webpageCode, setWebpageCode] = useState({ html: "", css: "" });

    useEffect(() => {
      jsRef.current = js;
    }, [js]);


    
    useEffect(() => {
        const fetchComponents = async () => {
            try {
                let [buttonsResponse, collapseresponse,nav_bar_response,button_group_response,cardresponse,dropdownresponse,listgrpresponse,alertresponse,badgeresponse,formsresponse,inputresponse] = await Promise.all([
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
                    fetch("http://localhost:8000/fetch_all_forms", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                  }),
                  fetch("http://localhost:8000/fetch_all_inputs", {
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
                let formsdata = await formsresponse.json();
                let inputdata = await inputresponse.json();
                
                

                setButtonsData([...buttonsData.data]);
                set_collapse_comp([...collapseData.data]);
                set_nav_bar([...navbar_data.data]);
                set_button_group([...button_group_data.data]);
                set_card([...card_data.data]);
                set_dropdown([...dropdowndata.data]);
                set_listgrp([...listgrpdata.data]);
                set_alert([...alertdata.data]);
                set_badge([...badgedata.data]);
                set_forms([...formsdata.data]);
                set_inputs([...inputdata.data]);
                

            } catch (error) {
                console.error("Error fetching components:", error);
            }
            setLoading(false);
        };

        fetchComponents();
    }, []);


    useEffect(() => {
        if (!loading && buttonsData.length > 0 && collapse_comp.length > 0 && nav_bar.length> 0 && button_group.length>0 && card.length>0 && dropdown.length>0 && listgrp.length>0 && alert_comp.length>0 && badge.length>0 && forms.length>0 && inputs.length>0 &&  !editorRef.current) {
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

              /*editor.DomComponents.addType('resizable-wrapper', {
                model: {
                  defaults: {
                    tagName: 'div',
                    attributes: { class: 'resizable-form-wrapper' },
                    stylable: ['width', 'height', 'min-width', 'min-height'],
                    style: {
                      width: '300px',
                      minHeight: '200px',
                      padding: '10px',
                      border: '1px solid #ccc',
                      boxSizing: 'border-box',
                    },
                    resizable: {
                      tl: 1, tc: 1, tr: 1,
                      cl: 1, cr: 1,
                      bl: 1, bc: 1, br: 1,
                      keyWidth: 'width',
                      keyHeight: 'height',
                      currentUnit: 'px',
                      minDim: 50,
                    },
                  }
                }
              });
              

              editor.BlockManager.add('resizable-form', {
                label: 'Resizable Form',
                category: 'Forms',
                content: {
                  type: 'resizable-wrapper',
                  components: [
                    {
                      tagName: 'form',
                      attributes: { class: 'form-container' },
                      components: [
                        { tagName: 'input', attributes: { placeholder: 'Name' }},
                        { tagName: 'input', attributes: { type: 'email', placeholder: 'Email' }},
                        { tagName: 'button', content: 'Submit' }
                      ],
                      style: {
                        width: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                      }
                    }
                  ]
                }
              });*/
              
              
              

            

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

            //java script

            editor.Panels.addButton('options', {
              id: 'add-js-to-component',
              className: 'fa fa-code',
              command: 'add-js-script',
              attributes: { title: 'Add JavaScript' }
            });
            
            editor.Commands.add('add-js-script', {
              run(editor) {
                const selected = editor.getSelected();
            
                if (!selected) {
                  alert('Please select a component first.');
                  return;
                }
            
                const componentId = selected.getId();
            
                // Create modal form
                const modal = editor.Modal;
                const content = document.createElement('div');
                content.innerHTML = `
                  <label>Alert Message: <input type="text" id="alertMessage" placeholder="Enter alert message" /></label><br><br>
                  <label>Background Color (optional): <input type="color" id="bgColor" /></label><br><br>
                  <button id="applyJS">Apply JS</button>
                `;
            
                modal.setTitle('Custom JS Settings');
                modal.setContent(content);
                modal.open();
            
                document.getElementById('applyJS').onclick = () => {
                  const alertMsg = document.getElementById('alertMessage').value;
                  const bgColor = document.getElementById('bgColor').value;
            
                  let jsCode = `
                    document.querySelector("#${componentId}").addEventListener("click", function() {
                      ${alertMsg ? `alert(${JSON.stringify(alertMsg)});` : ''}
                      ${bgColor ? `this.style.backgroundColor = "${bgColor}";` : ''}
                    });
                  `;
            
                  // You can now pass this JS to your state function
                  set_js(js + jsCode); // `js` prefix if you need it concatenated
            
                  modal.close();
                };
              }
            });
            


            //input fields validation

            editor.Panels.addButton('options', [{
              id: 'open-validation-panel',
              className: 'fa fa-cog',
              command: 'open-validation-panel',
              attributes: { title: 'Input Validations' }
            }]);
            
            editor.Commands.add('open-validation-panel', {
              run(editor) {
                const modal = editor.Modal;
                const selected = editor.getSelected();
            
                // Ensure an <input> is selected
                if (!selected || selected.get('tagName') !== 'input') {
                  alert('Select an input field first.');
                  return;
                }
            
                const componentId = selected.getId() || `comp-${Date.now()}`;
                if (!selected.getId()) selected.setId(componentId);
            
                // Modal content
                const content = document.createElement('div');
                content.innerHTML = `
                  <label><input type="checkbox" id="onlyNumbers"> Only Numbers</label><br>
                  <label><input type="checkbox" id="onlyChars"> Only Characters</label><br>
                  <label><input type="checkbox" id="specialChar"> At least one Special Character</label><br>
                  <label>Min Length: <input type="number" id="minLength" min="0" style="width: 50px;"></label><br>
                  <label>Max Length: <input type="number" id="maxLength" min="1" style="width: 50px;"></label><br><br>
                  <button id="applyValidation">Apply</button>
                `;
            
                modal.setTitle('Validation Options');
                modal.setContent(content);
                modal.open();
            
                // On apply
                document.getElementById('applyValidation').onclick = () => {
                  const onlyNumbers = document.getElementById('onlyNumbers').checked;
                  const onlyChars = document.getElementById('onlyChars').checked;
                  const specialChar = document.getElementById('specialChar').checked;
                  const minLength = document.getElementById('minLength').value;
                  const maxLength = document.getElementById('maxLength').value;
            
                  // Clear previous validation attributes
                  selected.removeAttributes(['pattern', 'minlength', 'maxlength', 'title']);
            
                  // Construct pattern
                  /*let pattern = '';
                  let title = [];
            
                  if (onlyNumbers) {
                    pattern = '^\\d+$';
                    title.push('Only numbers');
                  } else if (onlyChars) {
                    pattern = '^[A-Za-z]+$';
                    title.push('Only characters');
                  }
            
                  if (specialChar) {
                    pattern = pattern ? `(?=${pattern})(?=.*[!@#$%^&*])` : '.*[!@#$%^&*].*';
                    title.push('At least one special character');
                  }
            
                  if (pattern) {
                    selected.addAttributes({ pattern, title: title.join(', ') });
                  }
            
                  if (minLength) selected.addAttributes({ minlength: minLength });
                  if (maxLength) selected.addAttributes({ maxlength: maxLength });*/

                  const jsValidationCode = js+`
  const input = document.querySelector("#${componentId}");
  input.addEventListener("input", function() {
    const value = this.value;
    let isValid = true;
    let errorMsg = "";

    ${onlyNumbers ? `
      if (!/^\\d+$/.test(value)) {
        isValid = false;
        errorMsg += "Only numbers allowed.\\n";
      }
    ` : ''}

    ${onlyChars ? `
      if (!/^[A-Za-z]+$/.test(value)) {
        isValid = false;
        errorMsg += "Only characters allowed.\\n";
      }
    ` : ''}

    ${specialChar ? `
      if (!/[!@#$%^&*]/.test(value)) {
        isValid = false;
        errorMsg += "Must include a special character.\\n";
      }
    ` : ''}

    ${minLength ? `
      if (value.length < ${minLength}) {
        isValid = false;
        errorMsg += "Minimum length is ${minLength}.\\n";
      }
    ` : ''}

    ${maxLength ? `
      if (value.length > ${maxLength}) {
        isValid = false;
        errorMsg += "Maximum length is ${maxLength}.\\n";
      }
    ` : ''}

    if (!isValid) {
      alert(errorMsg);
    } 
  });
`;

                  set_js(jsValidationCode); 

            
                  modal.close();
                };
              }
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
                  
                  let afsr = jsRef.current + "</script>";
                    b(editorRef.current.getHtml(),editorRef.current.getCss(),afsr);
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


            if (!existingCategories.has("Buttons")) {
              forms.forEach((button) => {
                  if (!blockManager.get(button.id)) {
                      blockManager.add(button.id, {
                          label: `<div style="padding:20px;">${button.html_code}</div>`,
                          category: "Forms",
                          content: {
                              type: "Form", 
                              components: button.html_code,
                              styles: button.css_code,
                              draggable: true,
                              selectable: true,
                              copyable: true,
                              attributes: { class: "gjs-no-select" }, 
                              removable: true, 
                              stylable: true, 
                              resizable:false,

                          },
                          wrapper: true, 
                      });
                  }
              });
          }

          

            /*if (!existingCategories.has("Forms")) {
              forms.forEach((button) => {
                if (!blockManager.get(button.id)) {
                  blockManager.add(button.id, {
                    label: `<div style="padding:20px;">${button.html_code}</div>`,
                    category: "Forms",
                    content: {
                      type: 'default',
                      components: [
                        {
                          tagName: 'div',
                          attributes: { class: 'resizable-form-wrapper' },
                          style: {
                            width: '300px',
                            height: '300px', // ✅ Set explicit height
                            padding: '10px',
                            border: '1px solid #ccc',
                            boxSizing: 'border-box',
                          },
                          resizable: {
                            tl: 1, tc: 1, tr: 1,
                            cl: 1, cr: 1,
                            bl: 1, bc: 1, br: 1, // ✅ All corners/edges enabled
                            keyWidth: 'width',
                            keyHeight: 'height',
                            currentUnit: 'px',
                            minDim: 50,
                          },
                          stylable: ['width', 'height', 'min-height', 'min-width'],
                          components: [
                            {
                              type: 'text',
                              content: button.html_code,
                              style: {
                                width: '100%',
                                height: '100%',
                                boxSizing: 'border-box',
                              },
                            },
                          ],
                        },
                      ],
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
            }*/

              
              
              
            
            
            

            
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


            if (!existingCategories.has("inputs")) {
              inputs.forEach((card) => {
                  if (!blockManager.get(card.id)) {
                      blockManager.add(card.id, {
                          label: `<div style="padding:5px;">${card.html_code}</div>`,
                          category: "Input",
                          content: {
                              type: "input", 
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
