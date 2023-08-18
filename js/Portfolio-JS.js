
class ProjectCreator
{
    createTag(imagePath, typeTag="tag: undefined")
    {
        return `
        <div class="tooltip">
            <img class="project-tag" src="` + imagePath + `"/>
            <span class="tooltiptext">` + typeTag + `</span>
        </div>`
    }

    createProject(name, tags, description, canDownload, delay = 1)
    {
        let allTags = "";
        for (let i=0; i<tags.length; i++){
            allTags += this.createTag(tags[i]);
        }
        const active = canDownload ? "" : "unactive";
        const elem = document.createElement("template");
        elem.innerHTML = `
        <div class ="transition-main delay`+delay+`" id="`+name+`-project">
            <div class="project">
                <div class="project-tag-grid">` + allTags + `
                </div>
                <div class="project-btn">
                    <a class="project-link" href="pages/`+name+`.html">
                        <div class="project-images">
                            <div class="blur-load" id="`+name+`-title-blur">
                                <img class="project-title" src="res/imgs/`+name+`_title.png" loading="lazy"/>
                            </div>
                            <div class="separator vertical mobileHide"></div>
                            <div class="blur-load mobileHide" id="`+name+`-snap-blur">
                                <img class="project-snapshot" src="res/imgs/`+name+`_snapshot.png" alt="`+name+`_snapshot" loading="lazy"/>
                            </div>
                        </div>
                        <div class="separator horizontal"></div>
                        <p class="project-description"><b>`+description+`</b></p>
                    </a>
                </div>` + (isMobile() ? `` : `<button class="customBtn downloadBtn `+active+`"><i class="fa fa-download"></i></button>`) + `
            </div>
        </div>`;
        document.getElementById("swup").append(elem.content);
    }
    
    resetCount()
    {
        projectCount = 0;
    }
}

let pc = new ProjectCreator();

function flipflopPanel()
{
    if (document.getElementById("mySidePanel").ariaExpanded)
    {
        closeNav();
    }
    else
    {
        openNav();
    }
}
function openNav(){
    const btn = document.getElementById("mySidePanel");
    btn.style.transform = "translateX(0px)";
    btn.ariaExpanded = true;
}
function closeNav(){
    const btn = document.getElementById("mySidePanel");
    btn.style.transform = "translateX(-250px)";
    btn.ariaExpanded = false;
}

function CreateAllProjects()
{
    pc.createProject("flood", 
    ["res/imgs/cpp.png", "res/imgs/opengl.png", "res/imgs/soloproject.png"],
    "Flood est un prototype moteur de jeu 2D permettant de réaliser des prototypes. Il est en cours de développement.",
    false);

    pc.createProject("orcawaga", 
    ["res/imgs/cpp.png", "res/imgs/ue5.png", "res/imgs/groupproject.png"],
    "Orca-Waga est un projet étudiant. C'est un tower defense inspiré par Tribes of Midgard et ajoute la possibilité de construire sa base.",
    false, 2);

    pc.createProject("orbitaldecay", 
    ["res/imgs/cs.png", "res/imgs/unity.png", "res/imgs/groupproject.png"],
    "Orbital Decay est un projet étudiant, il s'inspire de Star Wars Battlefront 2 sur ps2. C'est un jeu multijoueur de combat dans des vaisseaux spaciaux.",
    false, 3);

    pc.createProject("proskynitis", 
    ["res/imgs/c.png", "res/imgs/sfml.png", "res/imgs/groupproject.png"],
    "Proskynitis est un projet étudiant inspiré du jeu Faster Than Light (FTL) et ajoute une dimension de récolte de ressources sur des planètes",
    false, 4);
}

function isMobile()
{
    return /Android|iPhone/i.test(navigator.userAgent) && navigator.maxTouchPoints > 0;
}

