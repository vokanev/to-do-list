var collapsible = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < collapsible.length; i++) {
  collapsible[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    content.style.transition = "max-height 0.2s ease-out";

    if (!this.classList.contains("active")) {
      content.style.maxHeight = "0px";
      content.style.minHeight = "none";
    } else {
      content.style.maxHeight = "none";
      content.style.minHeight = "fit-content";
    }
  });
}