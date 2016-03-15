function drawGraph(){
	i = clickCount++;
	document.getElementById('graph').innerHTML = "<canvas id='myChart' width='400' height='400'></canvas>";
	var ctx = document.getElementById("myChart").getContext("2d");

	var k = Object.keys(graphData[i]);
	var v = [];
	k.forEach(function(key){
		v.push(graphData[i][k])
	});
	var data = {
	    labels: k,
	    datasets: [
	        {
	            label: "life cycle",
            	fillColor: "rgba(151,187,205,0.5)",
            	strokeColor: "rgba(151,187,205,0.8)",
            	highlightFill: "rgba(151,187,205,0.75)",
            	highlightStroke: "rgba(151,187,205,1)",
	            data: v
	        }
    	]
	};

	var options = {

		    ///Boolean - Whether grid lines are shown across the chart
		    scaleShowGridLines : true,

		    //String - Colour of the grid lines
		    scaleGridLineColor : "rgba(0,0,0,.05)",

		    //Number - Width of the grid lines
		    scaleGridLineWidth : 1,

		    //Boolean - Whether to show horizontal lines (except X axis)
		    scaleShowHorizontalLines: true,

		    //Boolean - Whether to show vertical lines (except Y axis)
		    scaleShowVerticalLines: true,

		    //Boolean - Whether the line is curved between points
		    bezierCurve : true,

		    //Number - Tension of the bezier curve between points
		    bezierCurveTension : 0.4,

		    //Boolean - Whether to show a dot for each point
		    pointDot : true,

		    //Number - Radius of each point dot in pixels
		    pointDotRadius : 4,

		    //Number - Pixel width of point dot stroke
		    pointDotStrokeWidth : 1,

		    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
		    pointHitDetectionRadius : 20,

		    //Boolean - Whether to show a stroke for datasets
		    datasetStroke : true,

		    //Number - Pixel width of dataset stroke
		    datasetStrokeWidth : 2,

		    //Boolean - Whether to fill the dataset with a colour
		    datasetFill : true,

		    //String - A legend template
		    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

	};
	var myLineChart = new Chart(ctx).Line(data, options);
}



	
	