import React from "react";

import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { useState } from "react";


function Contribute(){
    let [css_file,set_css_file] = useState(null);

    let [jsx_file,set_jsx_file] = useState(null);

    let [jsx_code,set_jsx_code] = useState("");

    let [load,set_load] = useState(0);
    const [showCode, setShowCode] = useState(false);


    let upload = async()=>{

        let form_data = new FormData();
        form_data.append("css_file",css_file);
        form_data.append("jsx_file",jsx_file);

        let op = await fetch('http://localhost:8000/parse_files',
            {
                method: 'POST',
                body: form_data,
            }
        )

        let rfh = await op.json();

        set_jsx_code(rfh.js);
        set_load(1);





    }

    if(load == 1){
        return (
            <div>
                <h3>React Live Preview</h3>
                <LiveProvider code={jsx_code}>
                    <LivePreview />
                    <LiveError />
                    <button onClick={() => setShowCode(!showCode)}>
                        {showCode ? "Hide Code" : "Show Code"}
                    </button>
                    {showCode && <LiveEditor />}
                </LiveProvider>
            </div>
        );
    }



    return (
        <div>
            <p>UPLOAD CSS FILE</p>
            <input type="file" accept=".css" onChange={(event)=>{set_css_file(event.target.files[0]);}}/>

            {css_file && (
        <div>
          <h3>File Details:</h3>
          <p><strong>Name:</strong> {css_file.name}</p>
          <p><strong>Size:</strong> {(css_file.size / 1024).toFixed(2)} KB</p>
          <p><strong>Type:</strong> {css_file.type || "Unknown"}</p>
          <p><strong>Last Modified:</strong> {new Date(css_file.lastModified).toLocaleString()}</p>
        </div>
      )}

            <p>UPLOAD JSX FILE</p>
            <input type="file" accept=".js,.jsx" onChange={(event)=>{set_jsx_file(event.target.files[0]);}}/>

            {jsx_file && (
        <div>
          <h3>File Details:</h3>
          <p><strong>Name:</strong> {jsx_file.name}</p>
          <p><strong>Size:</strong> {(jsx_file.size / 1024).toFixed(2)} KB</p>
          <p><strong>Type:</strong> {jsx_file.type || "Unknown"}</p>
          <p><strong>Last Modified:</strong> {new Date(jsx_file.lastModified).toLocaleString()}</p>
        </div>
      )}

      <button onClick={upload}>UPLOAD THE FILES</button>

            



        </div>
    );

}

export default Contribute;