$(document).ready(function() {
		var REQUEST_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
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
		
});