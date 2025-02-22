import React, { useState } from "react";
//y6EIOyPP08W456ILGeB7FSbX api key
function Contribute(){
    let [a,set_a] = useState("");
    let p = async()=>{

        let op = await fetch('http://localhost:8000/add_git_hub_url',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({url:a}),
            }
        );

        console.log("hello");

    }
    return (
        <div>

            <input type="string" value={a} onChange={(e)=>{set_a(e.target.value);}} />
            <button onClick={p}>CLICK</button>



        </div>
    );
}

export default Contribute;