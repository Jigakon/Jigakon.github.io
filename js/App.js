export default class App
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
            "others",
            "https://github.com/Jigakon/Flood"));

        this.pc.RegisterProject("orcawaga",    
            new Project("orcawaga",
            ["CPP", "UE5", "GROUP"],
            "Orca-Waga est un projet étudiant. C'est un tower defense inspiré par Tribes of Midgard et ajoute la possibilité de construire sa base.",
            "games",
            "https://jigakon.itch.io/orcawaga"));

        this.pc.RegisterProject("orbitaldecay", 
            new Project("orbitaldecay", 
            ["CS", "UNITY", "GROUP"],
            "Orbital Decay est un projet étudiant, il s'inspire de Star Wars Battlefront 2 sur PS2. C'est un jeu multijoueur de combat dans des vaisseaux spatiaux.",
            "games",
            "https://www.creajeux.fr/project/orbitaldecay"));

        this.pc.RegisterProject("proskynitis",  
            new Project("proskynitis", 
            ["C", "SFML", "GROUP"],
            "Proskynitis est un projet étudiant inspiré du jeu Faster Than Light (FTL) et ajoute une dimension de récolte de ressources sur des planètes.",
            "games",
            "https://jigakon.itch.io/proskynitis"));
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