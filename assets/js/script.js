/* Type Place Button */
var typePlaceMain = document.querySelector(".type-places__main");
var typePlaceBtnLeft = document.querySelector(".type-places__btn--left");
var typePlaceBtnRight = document.querySelector(".type-places__btn--right");

typePlaceBtnRight.onclick = function(event) {
    
    typePlaceBtnRight.classList.add("disappear");
    typePlaceBtnLeft.classList.remove("disappear");
    typePlaceMain.scrollLeft = typePlaceMain.scrollWidth;
}

typePlaceBtnLeft.onclick = function(event) {
    
    typePlaceBtnRight.classList.remove("disappear");
    typePlaceBtnLeft.classList.add("disappear");
    typePlaceMain.scrollLeft = 0;

}

typePlaceMain.onscroll = function() {
    
    var wideTheRest = (typePlaceMain.scrollWidth) - typePlaceMain.clientWidth;
    if(typePlaceMain.scrollLeft == 0) {
        typePlaceBtnRight.classList.remove("disappear");
        typePlaceBtnLeft.classList.add("disappear");
    }
    else if(parseInt(typePlaceMain.scrollLeft) == wideTheRest) { 
        typePlaceBtnRight.classList.add("disappear");
        typePlaceBtnLeft.classList.remove("disappear");
    }
    else {
        typePlaceBtnLeft.classList.remove("disappear");
        typePlaceBtnRight.classList.remove("disappear");
    }
}