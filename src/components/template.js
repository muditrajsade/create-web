import React from "react";

import { useState } from "react";

function T(){

    let [load,set_load] = useState(0);
    let [css_code,set_css_code] =  useState(null);
    let [html_code,set_html_code] = useState(null);


    let upload = async ()=>{

        set_load(1);

        let form_data = new FormData();
        form_data.append("html_file", html_code);
        form_data.append("css_file", css_code);


        let op = await fetch('http://localhost:8000/upload_templates', {
            method: 'POST',
            body: form_data,
        });

        set_load(0)

    }

    if(load == 1){
        return (
            <div>
                <p>LOading</p>
            </div>
        );
    }
    return (
        <div>

            
            <input type="file" accept=".html" onChange={(event) => set_html_code(event.target.files[0])} />
            <input type="file" accept=".css" onChange={(event) => set_css_code(event.target.files[0])} />


            <button onClick={upload}>SUBMIT</button>

        </div>
    );
}

export default T;