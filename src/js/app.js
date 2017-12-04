var tractive = document.querySelector('.interactive');
var fallerPaths = [].slice.apply(document.querySelectorAll('path:not([data-band = "0"])'));
var fallerPathsLessCountries = fallerPaths.filter(function(p) {
    return p.classList.contains('gv-band-no-data') == false;
})
var heading = document.querySelector('.gv-heading')
var caption1 = document.querySelector('.gv-caption#one')


tractive.addEventListener("click",function(e){
    fallerPathsLessCountries.map(function(p){
        p.classList.toggle("hidden");
    })
})

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
   //     removeFallers();
    }
})