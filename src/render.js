import mainTemplate from './src/templates/main.html!text'
import worldmap from './src/templates/wholeunrotated.svg!text'
import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'

var dataurl = "https://interactive.guim.co.uk/docsdata-test/1gSoBWtmzpXP08KkcXUDa_7noPZ3EsnPD6r_HTJL7eqk.json"

function processmap(data) {
    var $ = cheerio.load(worldmap);
    var regions = $('path')
    regions.map(function(i,r){
        var match = data.find(function(d){
            return d.scid == $(r).attr('id')
        })
        if (match != undefined) {
			$(r).attr("data-change",match.change)
			var band;
			if (match.change <= -0.3) {
				band = 5
			} else if (match.change > -0.3 && match.change <= -0.2) {
				band = 4
			} else if (match.change > -0.2 && match.change <= -0.1) {
				band = 3
			} else if (match.change > -0.1 && match.change <= -0.05) {
				band = 2
			} else if (match.change > -0.05 && match.change <= -0) {
				band = 1
			}
			else if (match.change > 0) {
				band = 0;
			}


			
			$(r).attr("data-band",band)
        } else {
            $(r).addClass('gv-band-no-data')}
    })

    var processedmap = worldmap;
    //fs.writeFileSync('./src/assets/output.svg',$.html())
    return $.html();
}

export async function render() {
	var data = (await axios.get(dataurl)).data;
    var processedmap = await processmap(data.sheets.output)
    return mainTemplate;
}