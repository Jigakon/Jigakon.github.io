class Tag
{
    static CreateElement(tagImage, tagText)
    {
        return `
        <div class="tooltip">
            <img class="project-tag" src="` + tagImage + `"/>
            <span class="tooltiptext">` + tagText + `</span>
        </div>`
    }
}

class Project
{
    constructor(name, tagsID, descriptions, type, downloadLink = "")
    {
        this.name = name;
        this.tagsIDs = tagsID;
        this.descriptions = descriptions;
        this.downloadLink = downloadLink;
        this.type = type;
    }
    
    GetTagsIDs()
    {
        return this.tagsIDs;
    }
    
    // passing one variable containing all the HTML elements in one
    CreateElement(tagsElement, lang, delay = 1)
    {
        console.log(lang);
        let langUrl = ""
        switch(lang)
        {
            case "en" : langUrl = "en/";
        }
        let btn = "";
        if (!isMobile())
        {
            if (this.downloadLink == "")
                btn = `<a class="customBtn downloadBtn unactive"><i class="fa fa-download"></i></a>`;
            else
                btn = `<a class="customBtn downloadBtn" href="`+this.downloadLink+`"><i class="fa fa-download"></i></a>`;
        }
        return `
        <div class ="transition-main delay`+delay+`" id="`+this.name+`-project">
            <div class="project">
                <div class="project-tag-grid">` + tagsElement + `
                </div>
                <div class="project-btn">
                    <a class="project-link" href="`+langUrl+this.type+`/`+this.name+`.html">
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
                        <p class="project-description"><b>`+this.descriptions[lang]+`</b></p>
                    </a>
                </div>` + btn + `
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
    
    async CreateAllTagsElements(ProjectID, lang = "fr")
    {
        // get tags
        const tags = await fetch("./res/jsons/tags.json")
        .then(response => response.json());
        let project = this.GetProject(ProjectID);
        if (project == null)
        {
            console.log(this)
            return ;
        }
        let tagsIDs = project.GetTagsIDs();
        let tagsElement = ``;
        for(let i = 0; i < tagsIDs.length; i++)
            tagsElement += await Tag.CreateElement(tags.Images[tagsIDs[i]], tags.Text[lang][tagsIDs[i]]);
        // create HTML element
        return tagsElement;
    }

    GetProject(id)
    {
        return this.projects.get(id);
    }

    async PushProjectsElements(lang = "fr_fr")
    {
        const keys = this.projects.keys();
        for(let i = 0; i < this.projects.size; i++)
        {
            const elem = document.createElement("template");
            elem.innerHTML = await this.CreateProjectElement(keys.next().value, i+1, lang);
            document.getElementById("swup").append(elem.content);
        }
    }

    RegisterProject(name, project)
    {
        this.projects.set(name, project);
    }
    
    async CreateProjectElement(name, delay, lang = "fr")
    {
        let tagsElement = await this.CreateAllTagsElements(name, lang);
        return this.GetProject(name).CreateElement(tagsElement, lang, delay);
    }

    resetCount()
    {
        this.projectCount = 0;
    }
}

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

function FlipFlopSeeMore_2(id) {
    let articleContent = document.getElementById(id);
    let btn = document.getElementById(id+"-btn");
    
    const className = "hidden-element";

    let isHidden = articleContent.classList.contains(className);
    if(isHidden)
    {
        articleContent.classList.remove(className);
        switch (document.getElementsByTagName("html")[0].getAttribute("lang"))
        {
            case "en" : btn.innerText = "(see less)"; break;
            default : btn.innerText = "(voir moins)"; break;
        }
    }
    else
    {
        articleContent.classList.add(className);
        switch (document.getElementsByTagName("html")[0].getAttribute("lang"))
        {
            case "en" : btn.innerText = "(see more)"; break;
            default : btn.innerText = "(voir plus)"; break;
        }
    }
}

