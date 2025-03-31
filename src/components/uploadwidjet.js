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
      
                // Add uploaded image to GrapesJS Asset Manager
                if (e.current) {
                  e.current.AssetManager.add([{ src: imageUrl }]);
                  // Get all assets from the Asset Manager
const assets = e.current.AssetManager.getAll()._byId;

// Get the keys of the assets (IDs)
const keys = Object.keys(assets);
console.log(keys); // This will print the list of IDs

// Access the first asset using the first key
const firstAsset = assets[keys[0]]; // Access the first asset by its ID

// Get the 'src' attribute of the first asset
const assetSrc = firstAsset.attributes.src; // Access the 'src' URL

console.log(assetSrc); // Log the image URL


                  
                }
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