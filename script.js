$(document).ready(function() {
		var REQUEST_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
		var insultContainer = $('#insultContainer');
		var responses = {};
		var template = Handlebars.compile($('#insultTemplate').html());
		$('#getAnotherInsult').click(getInsult);
		
		renderInsult();
		getInsult();
		getInsult();
		function getInsult() {
				$.get(REQUEST_URL).then(function(resp) {
					responses.earthquakes = resp;
					responses.firstLoad = true;
					responses.hasError = false;
					renderInsult();
			}).catch(function() {
				responses.hasError = true;
			}).always(function() {
				responses.firstLoad = true;
				renderInsult();
			});
		}

		function renderInsult() {
			var templateHtml = template(responses);
			insultContainer.empty();
			insultContainer.html(templateHtml);
		}
		
});