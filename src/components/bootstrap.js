import React from "react";
import { useState } from "react";

function B(){

    let [css_text,set_css_text] = useState("");

    let [html,set_html] = useState("");


    let y = ()=>{

    }

    return (
        <div>

            <input type="text" value={css_text} onChange={(e)=>{set_css_text(e.target.value);}} />
            <input type="text" value={html} onChange={(e)=>{set_html(e.target.value);}} />

            <button onClick={y}>SUBMIT</button>





        </div>
    );
}

export default B;