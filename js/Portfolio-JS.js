
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