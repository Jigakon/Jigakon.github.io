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

import Swup from 'https://unpkg.com/swup@4?module';

const swup = new Swup();

load_imgs();
swup.hooks.on('content:replace', load_imgs)