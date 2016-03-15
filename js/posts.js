/* make the API call */

var posts = [];
var nextpage;
function getUserFeeds(response){
	FB.api("/me/feed", function (response) {
		      if (response && !response.error) {
		      	/* handle the result */
		        posts = response.data;
		        var i = 0;
		        while(i < 5){
		        	nextpage = response.paging.next;
		        	FB.api(nextpage, function(response){
		        		posts = posts.concat(response.data);
		        	});
		        	i++;
		        }

		      }
	});
}
