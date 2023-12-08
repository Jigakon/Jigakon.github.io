async function load_imgs() {
    const blurDivs = document.querySelectorAll(".blur-load");
    blurDivs.forEach(div => {
        const img = div.querySelector("img");

        function loaded(){
            div.classList.add("loaded");
            div.style.backgroundImage= "none";
        }
        
        if (img.complete){
            loaded();
        } else {
            img.addEventListener("load", loaded);
        }
    })
}

import App from "./js/App.js"
import Swup from 'https://unpkg.com/swup@4?module';

const swup = new Swup();
let app = new App();
app.SetLanguage(document.getElementsByTagName("html")[0].getAttribute("lang"));

function GetProjectID(url)
{
    if(url.includes("/others/flood.html")) return "flood";
    else if(url.includes("/games/orcawaga.html")) return "orcawaga";
    else if(url.includes("/games/orbitaldecay.html")) return "orbitaldecay";
    else if(url.includes("/games/proskynitis.html")) return "proskynitis";
    return null;
}

swup.hooks.on('content:replace', async (visit) => {
    if(visit.to.url.includes("/projects.html")) {
        await app.PushProjects();
    }
    const ID = GetProjectID(visit.to.url)
    if (ID != null)
    app.PushTagsInNewPage(ID);
    load_imgs();
});

swup.hooks.on('visit:start', (visit) => {
    // awful MUST find an other way to get lang of target
    var newlang = "fr";
    if (visit.to.url.includes("en")) newlang = "en";
    if (app.lang != newlang)
        app.SetLanguage(newlang);
}, { priority: -100 });

document.addEventListener('DOMContentLoaded', async () => {
    await app.CreateProjects();
    if(window.location.pathname.includes("/projects.html"))
    {
        await app.PushProjects()
        .then(x => {
            const ID = GetProjectID(window.location.pathname)
            if (ID != null)
                app.PushTagsInNewPage(ID);
        });
        load_imgs()
    }
    else
    {
        const ID = GetProjectID(window.location.pathname)
        if (ID != null)
            app.PushTagsInNewPage(ID);
    }
});