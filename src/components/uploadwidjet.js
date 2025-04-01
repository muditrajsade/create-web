import React from "react";

import { useEffect, useRef, useState } from "react";


function Uploadwidget({e}){
    const cloudinaryref = useRef();
    const widgetref = useRef();
    useEffect(()=>{
        cloudinaryref.current = window.cloudinary;
        widgetref.current = cloudinaryref.current.createUploadWidget({
            cloudName : 'dp71rx6nx',
            uploadPreset : 'parity'
        },function(error,result){
            if (!error && result.event === "success") {
                const imageUrl = result.info.secure_url;
                console.log("Uploaded Image URL:", imageUrl);
                
                let kkiop = result.info.original_filename;
      
                // Add uploaded image to GrapesJS Asset Manager
                e[kkiop] = imageUrl;
              } else if (error) {
                console.error("Cloudinary Upload Error:", error);
              }

        })

    },[]);
    return (
        <div>

            <button onClick={()=>{widgetref.current.open()}}>Upload image</button>

        </div>
    );
}

export default Uploadwidget;