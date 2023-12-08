export default class App
{
    constructor()
    {
        this.pc = new ProjectCreator();
    }

    SetLanguage(lang)
    {
        this.lang = lang;
    }

    async CreateProjects()
    {
        await fetch("./res/jsons/projects.json")
        .then(response => response.json())
        .then(projects => {
            for(const project of projects)
            {
                this.pc.RegisterProject(project.name,        
                    new Project(project.name, 
                    project.tags,
                    project.description,
                    project.category,
                    project.download_link));
            }
        });
    }

    async PushProjects()
    {
        await this.pc.PushProjectsElements(this.lang);
    }

    async PushTagsInNewPage(projectID)
    {
        const elem = document.createElement("template");
        elem.innerHTML = await this.pc.CreateAllTagsElements(projectID, this.lang);
        document.getElementsByClassName("page-project-tags")[0].append(elem.content)
    }
}