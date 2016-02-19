$(document).ready(function() {
		var REQUEST_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
		var earthquakeContainer = $('#earthquakeContainer');
		var responses = {};
		var template = Handlebars.compile($('#earthquakeTemplate').html());
		$('#refreshButton').click(getEarthquake);
		
		


		renderEarthquake();
		getEarthquake();
		function getEarthquake() {
				$.get(REQUEST_URL).then(function(resp) {
					responses.earthquakes = resp;
					responses.firstLoad = true;
					responses.hasError = false;
					renderEarthquake();
			}).catch(function() {
				responses.hasError = true;
			}).always(function() {
				responses.firstLoad = true;
				renderEarthquake();
			});
		}

		function renderEarthquake() {
			var templateHtml = template(responses);
			earthquakeContainer.empty();
			earthquakeContainer.html(templateHtml);
		}
		
		Handlebars.registerHelper('trimCoords', function(inputString) {
			var passedString = ''+inputString+'';
			var countCommas = 0;
			var longIndex = 0;
			var latIndex = 0;
			for (var i = 0; i < passedString.length; i++) {
				if (passedString[i] == ',')
					countCommas++;
				if (countCommas == 1 && longIndex == 0)
					longIndex = i;
				if (countCommas == 2 && latIndex == 0)
					latIndex = i;	
			}
			var longStr = passedString.substring(0,longIndex);
			var latStr = passedString.substring(longIndex+1,latIndex);
			
			var goodCoords = latStr + "," + longStr;
			
		    return new Handlebars.SafeString(goodCoords);
		});
		
});