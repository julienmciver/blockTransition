var tDiv = document.getElementById("transition-div");
var btns = document.getElementsByClassName("trans-button");
var rows = 5;
var columns = 5;
var ar = [];
var currentPage = "section-1";

function populateTDiv(){

    let fadeDivDims = [tDiv.offsetWidth/5, tDiv.offsetHeight/5]
    let count = 0;
    
    for (i = 0; i < rows; i++){
        for(c = 0; c < columns; c++){
            var fadeDiv = document.createElement("div")
            fadeDiv.id = "tBlock-" + count;
            ar.push(count)
            count++;
            fadeDiv.classList.add("transition-block")
            fadeDiv.style.height = fadeDivDims[1] + "px"
            fadeDiv.style.width = fadeDivDims[0] + "px"
            fadeDiv.style.top = fadeDivDims[1]*i + "px"
            fadeDiv.style.left = fadeDivDims[0]*c + "px"
            tDiv.appendChild(fadeDiv)
        }
    }
    tDiv.style.display = "none"

}
window.addEventListener('load', populateTDiv)

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}




function transition(target){
    
    shuffleArray(ar)
    let count = 0;
    let transitionFinished = false
    tDiv.style.display = "initial"
    var myInt = setInterval(function(){
        document.getElementById("tBlock-" + ar[count]).classList.toggle("transition-block-active")
        count++;
        if (count == ar.length && transitionFinished == false){
            count = 0;
            clearInterval(myInt)
            
            setTimeout(function(){
                document.getElementById(currentPage).style.display = "none";
                currentPage = target;
                document.getElementById(target).style.display = "initial";
                var myInt = setInterval(function(){
                    document.getElementById("tBlock-" + ar[count]).classList.toggle("transition-block-active")
                    count++;
                    if (count == ar.length){
                        clearInterval(myInt)
                        tDiv.style.display = "none"
                    }
                }, 10)
            },100)
            
            
        }
        
        
    },10)
}

for (i=0;i<btns.length;i++) {
    btns[i].addEventListener('click',(function (i) {
      return function () {
        transition(btns[i].getAttribute("data-target"));
      };
    }(i)));
}