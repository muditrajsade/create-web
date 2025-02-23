import React from "react";
import { useState } from "react";

function Html_contribute(){

    let [css_code,set_css_code] = useState(null);
    let [html_code,set_html_code] = useState(null);

    let [js_code,set_js_code] = useState(null);

    let [load,set_load] = useState(0);
    let [final_html,set_final_html] = useState("");

    let upload  = async()=>{
        let form_data = new FormData();
        form_data.append("css_file",css_code);
        form_data.append("html_file",html_code);
        form_data.append("js_file",js_code);
        form_data.append("css_file_name",css_code.name);
        form_data.append("js_file_name",js_code.name);
        

        let op = await fetch('http://localhost:8000/parse_files',
            {
                method: 'POST',
                body: form_data,
            }
        )

        let rfh = await op.json();

        set_final_html(rfh.n);
        set_load(1);

        

        

    }

    if(load == 1){
        return(
            <div>
                <h3>Live HTML Preview</h3>
                <iframe
                    title="Live Preview"
                    srcDoc={final_html} // Display HTML inside iframe
                    style={{ width: "100%", height: "500px", border: "1px solid black" }}
                />

            </div>
        );
    }


    return (
        <div>

            <input type="file" accept=".css" onChange={(event)=>{set_css_code(event.target.files[0]);}} />
            <input type="file" accept=".html" onChange={(event)=>{set_html_code(event.target.files[0]);}} />
            <input type="file" accept=".js" onChange={(event)=>{set_js_code(event.target.files[0]);}} />
            <button onClick={upload}>SUBMIT</button>


        </div>
    );
}


export default Html_contribute;