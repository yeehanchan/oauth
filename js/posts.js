/* make the API call */

var posts = ['lalala'];
function getUserFeeds(response){
	FB.api("/me/feed", function (response) {
	      if (response && !response.error) {
	        /* handle the result */
	        posts = response.data;
	      }
	    }
	);
}
