function load_imgs() {
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

function PushProject(path)
{
    if(path == "/pages/others/flood.html") app.PushTags("flood");
    if(path == "/pages/games/orcawaga.html") app.PushTags("orcawaga");
    if(path == "/pages/games/orbitaldecay.html") app.PushTags("orbitaldecay");
    if(path == "/pages/games/proskynitis.html") app.PushTags("proskynitis");
}

swup.hooks.on('content:replace', (visit) => {
    if(visit.to.url == "/pages/projects.html") {
        app.PushProjects();
    }
    PushProject(visit.to.url);
    load_imgs();
});

document.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname == "/pages/projects.html")
    {
        app.PushProjects();
        load_imgs();
    }
    PushProject(window.location.pathname);

});