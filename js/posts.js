/* make the API call */
function getUserFeeds(){
	FB.api(
	    "/me/feed",
	    function (response) {
	      if (response && !response.error) {
	        /* handle the result */
	        console.log("getting user feed", response);
	      }
	    }
	);
}
