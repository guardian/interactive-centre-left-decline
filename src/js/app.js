import mapsvg from 'raw-loader!./../assets/output.svg'

var mapboard = document.querySelector('.gv-map-board');

var importMap = new Promise(function(resolve, reject) {
    mapboard.innerHTML = mapsvg;

    resolve();
});


importMap.then(function(){

  var mapTransitioned = false;
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

  function removeFallers() {
      mapTransitioned = true;
      fallerPathsLessCountries.map(function(p){
          p.classList.add("hidden");
      })
      caption1.classList.add("visible")
  }

  window.addEventListener("scroll", function(e){
      if(!mapTransitioned){
        var hbcr = mapboard.getBoundingClientRect();
        if (hbcr.top < 100 && hbcr.top > 0 ) {
          removeFallers();
        }
      }
  })

})
