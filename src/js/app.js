var tractive = document.querySelector('.interactive');
var fallerPaths = [].slice.apply(document.querySelectorAll('path:not([data-band = "0"])'));
var fallerPathsLessCountries = fallerPaths.filter(function(p) {
    return p.classList.contains('gv-band-no-data') == false;
})
var heading = document.querySelector('.gv-heading')
var caption1 = document.querySelector('.gv-caption#one')

var before = document.querySelector('.gv-before')
var after = document.querySelector('.gv-after')
var fader = document.querySelector('.gv-fader')

var debounceReady = true;

fader.addEventListener("click",function(e){
        before.classList.toggle("hidden");
        after.classList.toggle("hidden");
})

function goToStep2() {
        before.classList.toggle("hidden");
        after.classList.toggle("hidden");
        caption1.classList.toggle("visible");
}

function debounce(callback) {
    if (debounceReady == true) {
        callback();
        debounceReady = false;
        setTimeout(function(){
            debounceReady = true;
        }, 1000)
    }
}

/*
function removeFallers() {
    fallerPaths.map(function(p){
        p.classList.add("hidden");
    })
    caption1.classList.add("visible")
}
*/
window.addEventListener("scroll", function(e){

    var hbcr = heading.getBoundingClientRect();
    if (hbcr.y < 100 && hbcr.y > 0 ) {
        debounce(goToStep2());
    }
})