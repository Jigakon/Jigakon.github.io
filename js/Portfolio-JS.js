class Tag
{
    constructor (imagePath, typeTag="tag: undefined")
    {
        this.imagePath = imagePath;
        this.typeTag = typeTag;
    }

    CreateElement()
    {
        return `
        <div class="tooltip">
            <img class="project-tag" src="` + this.imagePath + `"/>
            <span class="tooltiptext">` + this.typeTag + `</span>
        </div>`
    }
}

class Project
{
    constructor(name, tagsID, description, type, downloadLink = "")
    {
        this.name = name;
        this.tagsIDs = tagsID;
        this.description = description;
        this.downloadLink = downloadLink;
        this.type = type;
    }
    
    GetTagsIDs()
    {
        return this.tagsIDs;
    }
    
    // passing one variable containing all the HTML elements in one
    CreateElement(tagsElement, delay = 1)
    {
        // is the project downloadable ?
        const active = this.downloadLink != "" ? "" : "unactive";
        return `
        <div class ="transition-main delay`+delay+`" id="`+this.name+`-project">
            <div class="project">
                <div class="project-tag-grid">` + tagsElement + `
                </div>
                <div class="project-btn">
                    <a class="project-link" href="pages/`+this.type+`/`+this.name+`.html">
                        <div class="project-images">
                            <div class="blur-load" id="`+this.name+`-title-blur">
                                <img class="project-title" src="res/imgs/`+this.name+`_title.png" loading="lazy"/>
                            </div>
                            <div class="separator vertical mobileHide"></div>
                            <div class="blur-load mobileHide" id="`+this.name+`-snap-blur">
                                <img class="project-snapshot" src="res/imgs/`+this.name+`_snapshot.png" alt="`+this.name+`_snapshot" loading="lazy"/>
                            </div>
                        </div>
                        <div class="separator horizontal"></div>
                        <p class="project-description"><b>`+this.description+`</b></p>
                    </a>
                </div>` + (isMobile() ? `` : `<button class="customBtn downloadBtn `+active+`"><i class="fa fa-download"></i></button>`) + `
            </div>
        </div>`;
    }
}

class ProjectCreator
{
    constructor()
    {
        this.tags = new Map();
        this.projects = new Map();
        this.projectCount = 0;
    }

    RegisterTag(id, tag)
    {
        this.tags.set(id, tag);
    }

    GetTag(id)
    {
        return this.tags.get(id);
    }
    
    CreateAllTagsElements(ProjectID)
    {
        // get tags
        let tagsIDs = this.GetProject(ProjectID).GetTagsIDs();
        let tagsElement = ``;
        for(let i = 0; i < tagsIDs.length; i++)
            tagsElement += this.tags.get(tagsIDs[i]).CreateElement();
        // create HTML element
        return tagsElement;
    }

    GetProject(id)
    {
        return this.projects.get(id);
    }

    

    PushProjectsElements()
    {
        const keys = this.projects.keys();
        for(let i = 0; i < this.projects.size; i++)
        {
            const elem = document.createElement("template");
            elem.innerHTML = this.CreateProjectElement(keys.next().value, i+1);
            document.getElementById("swup").append(elem.content);
        }
    }

    RegisterProject(name, project)
    {
        this.projects.set(name, project);
    }
    
    CreateProjectElement(name, delay)
    {
        let tagsElement = this.CreateAllTagsElements(name);
        return this.GetProject(name).CreateElement(tagsElement, delay);
    }

    resetCount()
    {
        this.projectCount = 0;
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

function isMobile()
{
    return /Android|iPhone/i.test(navigator.userAgent) && navigator.maxTouchPoints > 0;
}

function FlipFlopSeeMore(id) {
    let btn = document.getElementById(id+"-btn");
    let text = document.getElementById(id);
    if (text.style.display == "block")
    {
        text.style.display = "none";
        btn.innerText = "(voir plus)";
    }
    else
    {
        text.style.display = "block";
        btn.innerText = "(voir moins)";
    }
    
}