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

class App
{
    constructor()
    {
        this.pc = new ProjectCreator();
        this.CreateTags();
        this.CreateProjects();
    }

    CreateTags()
    {
        const resPath = "res/imgs/";
        this.pc.RegisterTag("CPP", new Tag(resPath + "cpp.png", "Langage: C++"));
        this.pc.RegisterTag("CS", new Tag(resPath + "cs.png", "Langage: C#"));
        this.pc.RegisterTag("C", new Tag(resPath + "c.png", "Langage: C"));
    
        this.pc.RegisterTag("OPENGL", new Tag(resPath + "opengl.png", "API Graphique : OpenGL"));
        this.pc.RegisterTag("SFML", new Tag(resPath + "sfml.png","API multimedia : SFML"));

        this.pc.RegisterTag("UE5", new Tag(resPath + "ue5.png", "Moteur : Unreal Engine 5"));
        this.pc.RegisterTag("UNITY", new Tag(resPath + "unity.png", "Moteur : Unity"));
    
        this.pc.RegisterTag("SOLO", new Tag(resPath + "soloproject.png", "Equipe : Seul"));
        this.pc.RegisterTag("GROUP", new Tag(resPath + "groupproject.png", "Equipe : Groupe"));
    }

    CreateProjects()
    {
        this.pc.RegisterProject("flood",        
            new Project("flood", 
            ["CPP", "OPENGL", "SOLO"],
            "Flood est un prototype moteur de jeu 2D permettant de réaliser des prototypes. Il est en cours de développement.",
            false));

        this.pc.RegisterProject("orcawaga",    
            new Project("orcawaga",
            ["CPP", "UE5", "GROUP"],
            "Orca-Waga est un projet étudiant. C'est un tower defense inspiré par Tribes of Midgard et ajoute la possibilité de construire sa base.",
            false));

        this.pc.RegisterProject("orbitaldecay", 
            new Project("orbitaldecay", 
            ["CS", "UNITY", "GROUP"],
            "Orbital Decay est un projet étudiant, il s'inspire de Star Wars Battlefront 2 sur ps2. C'est un jeu multijoueur de combat dans des vaisseaux spaciaux.",
            false));

        this.pc.RegisterProject("proskynitis",  
            new Project("proskynitis", 
            ["C", "SFML", "GROUP"],
            "Proskynitis est un projet étudiant inspiré du jeu Faster Than Light (FTL) et ajoute une dimension de récolte de ressources sur des planètes",
            false));
    }

    PushProjects()
    {
        this.pc.PushProjectsElements();
    }

    PushTags(projectID)
    {
        const elem = document.createElement("template");
        elem.innerHTML = this.pc.CreateAllTagsElements(projectID);
        document.getElementsByClassName("page-project-tags")[0].append(elem.content)
    }
}

import Swup from 'https://unpkg.com/swup@4?module';

const swup = new Swup();
let app = new App();

swup.hooks.on('content:replace', (visit) => {
    if(visit.to.url == "/pages/projects.html") {
        app.PushProjects();
    }
    if(visit.to.url == "/pages/flood.html") {
        app.PushTags("flood");
    }
    load_imgs();
});

document.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname == "/pages/projects.html")
    {
        app.PushProjects();
        load_imgs();
    }
    if(window.location.pathname == "/pages/flood.html") 
    {
        app.PushTags("flood");
    }
});