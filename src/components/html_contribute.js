import React, { useState } from "react";

function Html_contribute() {
    let [css_code, set_css_code] = useState(null);
    let [html_code, set_html_code] = useState(null);
    let [load, set_load] = useState(0);
    let [bootstrap_css, set_bootstrap_css] = useState(false);
    let [bootstrap_js, set_bootstrap_js] = useState(false);
    let [selectedComponent, setSelectedComponent] = useState(""); // Stores selected Bootstrap component

    const bootstrapComponents = [
        "Buttons", "Carousel", "Navbar", "Accordion", "Alerts", 
        "Button Group", "Card", "Dropdowns", "Badge", "List Group", "Collapse"
    ];

    let upload = async () => {
        let form_data = new FormData();
        form_data.append("css_file", css_code);
        form_data.append("html_file", html_code);
        form_data.append("css_file_name", css_code?.name || "");
        form_data.append("bootstrap_css", bootstrap_css);
        form_data.append("bootstrap_js", bootstrap_js);
        form_data.append("component", selectedComponent);

        let op = await fetch('http://localhost:8000/parse_files', {
            method: 'POST',
            body: form_data,
        });

        set_load(1);
    };

    if (load === 1) {
        return (
            <div>
                <p>SUCCESSFUL</p>
            </div>
        );
    }

    return (
        <div>
            <input type="file" accept=".css" onChange={(event) => set_css_code(event.target.files[0])} />
            <input type="file" accept=".html" onChange={(event) => set_html_code(event.target.files[0])} />

            <br />

            <label>
                <input
                    type="checkbox"
                    checked={bootstrap_css}
                    onChange={() => set_bootstrap_css(!bootstrap_css)}
                />
                Include Bootstrap CSS
            </label>

            <br />

            <label>
                <input
                    type="checkbox"
                    checked={bootstrap_js}
                    onChange={() => set_bootstrap_js(!bootstrap_js)}
                />
                Include Bootstrap JS
            </label>

            <br />
            <h4>Select a Bootstrap Component:</h4>

            {bootstrapComponents.map((component) => (
                <label key={component} style={{ display: "block" }}>
                    <input
                        type="radio"
                        name="bootstrapComponent"
                        value={component}
                        checked={selectedComponent === component}
                        onChange={() => setSelectedComponent(component)}
                    />
                    {component}
                </label>
            ))}

            <br />

            <button onClick={upload}>SUBMIT</button>
        </div>
    );
}

export default Html_contribute;
