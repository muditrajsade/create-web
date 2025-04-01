import React, { useState } from "react";
import Uploadwidget from "./uploadwidjet";
import './templates.css';
import CircularProgress from "@mui/material/CircularProgress";
function T() {
    let [load, set_load] = useState(0);
    let [css_code, set_css_code] = useState(null);
    let [html_code, set_html_code] = useState(null);
    let [url, set_url] = useState({});

    let upload = async () => {
        set_load(1);

        let form_data = new FormData();
        form_data.append("html_file", html_code);
        form_data.append("css_file", css_code);
        let jsonUrl = JSON.stringify(url);
        form_data.append("urls", jsonUrl);

        await fetch('http://localhost:8000/upload_templates', {
            method: 'POST',
            body: form_data,
        });

        set_load(2);
    };

    if(load == 2){
        return (
            <div className="success-message">
                <p className="success-text">✅ Uploaded Successfully!</p>
                
            </div>
        );
        
    }

    if(load == 1){
        return (

            <div className="loading-container">
                  <CircularProgress color="primary" />
                  <p>Uploading...</p>
              </div>

        );
    }

    return (
        <div className="upload-container">
            <h2>📂 Upload Your Template</h2>

            
                    <div className="file-upload">
                        <label className="file-label">
                            Upload HTML File
                            <input type="file" accept=".html" onChange={(event) => set_html_code(event.target.files[0])} />
                        </label>

                        <label className="file-label">
                            Upload CSS File
                            <input type="file" accept=".css" onChange={(event) => set_css_code(event.target.files[0])} />
                        </label>
                    </div>

                    <Uploadwidget e={url} />

                    <button className="submit-btn" onClick={upload}>🚀 SUBMIT</button>
               
        </div>
    );
}

export default T;
