import React, { useState } from "react";
import './html_contibute.css';
import CircularProgress from "@mui/material/CircularProgress";

function Html_contribute({f}) {
    let [css_code, set_css_code] = useState(null);
    let [html_code, set_html_code] = useState(null);
    let [load, set_load] = useState(0);
    let [bootstrap_css, set_bootstrap_css] = useState(false);
    let [bootstrap_js, set_bootstrap_js] = useState(false);
    let [selectedComponent, setSelectedComponent] = useState(""); 
    
     

    const bootstrapComponents = [
        "Buttons", "Carousel", "Navbar", "Accordion", "Alerts", 
        "Button Group", "Card", "Dropdowns", "Badge", "List Group", "Collapse"
    ];

    let upload = async () => {
        set_load(2);
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

    if(load == 2){
        return (
            <div className="loading-container">
                              <CircularProgress color="primary" />
                              <p>Uploading...</p>
                          </div>
        );
    }

    if (load === 1) {
        return (
            <div className="success-message">
                <p>✅ Submission Successful!</p>

                <button className="home-btn" onClick={()=>{f()}}>🏠 Go Home</button>

            </div>
        );
    }

    return (
        <div className="contribute-container">
            <h2>🎨 Contribute HTML & CSS</h2>

            <div className="file-upload">
                <label className="file-label">
                    Upload CSS File
                    <input type="file" accept=".css" onChange={(event) => set_css_code(event.target.files[0])} />
                </label>

                <label className="file-label">
                    Upload HTML File
                    <input type="file" accept=".html" onChange={(event) => set_html_code(event.target.files[0])} />
                </label>
            </div>

            <div className="checkbox-group">
                <label className="checkbox-label">
                    <input type="checkbox" checked={bootstrap_css} onChange={() => set_bootstrap_css(!bootstrap_css)} />
                    Include Bootstrap CSS
                </label>

                <label className="checkbox-label">
                    <input type="checkbox" checked={bootstrap_js} onChange={() => set_bootstrap_js(!bootstrap_js)} />
                    Include Bootstrap JS
                </label>
            </div>

            <h4>Select a Bootstrap Component:</h4>
            <div className="component-grid">
                {bootstrapComponents.map((component) => (
                    <label key={component} className="component-label">
                        <input type="radio" name="bootstrapComponent" value={component} checked={selectedComponent === component} onChange={() => setSelectedComponent(component)} />
                        {component}
                    </label>
                ))}
            </div>

            <button className="submit-btn" onClick={upload}>🚀 SUBMIT</button>
        </div>
    );
}

export default Html_contribute;
