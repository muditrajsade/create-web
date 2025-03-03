import React, { useEffect,useState } from "react";
import GrapesEditor from "./drag_drop";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useLocation } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Build_project(){

    let [v,set_v] = useState("");
    let n = useNavigate();

    let [a,set_a] = useState(2);

    let [pages,set_pages] = useState([]);

    let [d,set_d] = useState("");
    let [current_pg,set_current_pg] = useState(0);
    let [received_htnl,set_received_html] = useState([]);
    let [received_css,set_css] = useState([]);

    const location = useLocation();
    const [user, setuser] = useState("");


    

    useEffect(() => {
        if (location.state && location.state.user) {
            setuser(location.state.user);
        }
    }, [location]);


    let func = (html,css)=>{
        set_a(0);
        let iimnb = [...received_htnl];
        iimnb[current_pg] = html;
        let cssil = [...received_css];
        cssil[current_pg] = css;
        set_received_html([...iimnb]);
        set_css([...cssil]);

    }

    const saveProject = async() => {
        set_a(5);
        const zip = new JSZip();

        let cde = [];
        let p=[];
    
        pages.forEach((pageName, index) => {
            const htmlContent = received_htnl[index] || "";
            const cssContent = received_css[index] || "";
    
            // Bootstrap CDN links
            const bootstrapCSS = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">`;
            const bootstrapJS = `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>`;
    
            // Complete HTML document
            const fullHtml = `
              <html>
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  ${bootstrapCSS}
                  <style>${cssContent}</style>
                </head>
                <body>
                  ${htmlContent}
                  ${bootstrapJS}
                </body>
              </html>
            `;

            cde.push(fullHtml);
            p.push(pageName);
    
            // Add file to ZIP
            zip.file(`${pageName}.html`, fullHtml);
        });
    
        // Generate ZIP and trigger download
        await zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "MyWebsite.zip");
        });

        let op = await fetch('http://localhost:8000/post_project',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({codes:[...cde],pages:[...p],email:user.email,project_title:v}),
            }
        );
        n("/customer",{state:{user:user}});

    };

    if(a==5){
        return (
            <Box 
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                {loading && <CircularProgress />}
            </Box>
        );
    }

    if(a==3){
        return(
            <GrapesEditor pagename={pages[current_pg]} b={func} />
            
        );
    }

    if(a == 2){
        return (
            <div>
                <input type="text" value = {v} onChange={(e)=>{
                    set_v(e.target.value);
                }} />
                <button onClick={()=>{
                    set_a(0);
                }}>SUBMIT</button>

            </div>
        );
    }

    if(a == 1){
        return (
            <div>

            <p>BUILD YOUR WEBPAGE</p>

            <p>{v}</p>
            {
                [...pages].map((i,v)=>{
                    return (
                        <div key={v}>
                            <p>{i}</p>
                        </div>
                    );
                })
            }

            <input type="text"  value={d} onChange={(e)=>{set_d(e.target.value)}} />

            <button onClick={()=>{
                set_pages([...pages,d]);
                set_d("");
                set_a(0);
                set_received_html([...received_htnl,""]);
                set_css([...received_css,""]);
            }}>ADD PAGE</button>
            <button onClick={()=>{
                set_d("");
                set_a(0);
            }}>CANCEL</button>








            </div>
        );
    }


    return (
        <div>

            <p>BUILD YOUR WEBPAGE</p>
            <p>{v}</p>
            {
                [...pages].map((i,v)=>{
                    return (
                        <div key={v}>
                            <p>{i}</p>
                            <button onClick={()=>{set_a(3); set_current_pg(v)}} >DESIGN</button>
                            <button onClick={() => {
    const htmlContent = received_htnl[v] || ""; // Get HTML content
    const cssContent = received_css[v] || "";   // Get CSS content

    // Bootstrap CDN links
    const bootstrapCSS = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">`;
    const bootstrapJS = `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>`;

    // Complete HTML document
    const fullHtml = `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${bootstrapCSS}
          <style>${cssContent}</style>
        </head>
        <body>
          ${htmlContent}
          ${bootstrapJS}
        </body>
      </html>
    `;

    // Open a new tab and write the content
    const previewWindow = window.open("", "_blank");
    previewWindow.document.open();
    previewWindow.document.write(fullHtml);
    previewWindow.document.close();
  }}>PREVIEW</button>

                        </div>
                    );
                })
            }
            

            <button onClick={()=>{
                set_a(1);
            }}>ADD PAGE</button>
            <button onClick={saveProject}>SAVE PROJECT</button>



        </div>
    );
}

export default Build_project;