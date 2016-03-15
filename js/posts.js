/* make the API call */


var posts = [];
var	ids = [];
var nextpage;
var created_times = [];
var post_objects = [];
var updated_times = [];
var comment_times = [];
function getUserFeeds(){
	FB.api("/me/feed", function (response) {
		     if (response && !response.error) {
		      	/* handle the result */
			        posts = response.data;
			        var i = 0;
			        while(i < 3){
							nextpage = response.paging.next;
							FB.api(nextpage, function(response){
								posts = posts.concat(response.data);
							});
							i++;
			        }        
		     }
	});

	getCreatedTime();
    getPostObject();
    getCommentTimes();
}
function getCreatedTime(){
	posts.forEach(function(entry){
		created_times.push(entry.created_time);
	});
}
function getPostObject(){
	posts.forEach(function(entry){
		ids.push(entry.id);
	})
	ids.forEach(function(entry){
		FB.api(entry, function(response){
			if(response && !response.error) {
				post_objects = response.data;
			}
		});
	});

	post_objects.forEach(function(entry){
		updated_times.push(entry.updated_time);
	});

}

function getCommentTimes(){
	ids.forEach(function(entry){
		FB.api(entry+"/comments", function(response){
			if(response && !response.error) {
				var each_post = [];
				response.data.forEach(function(comment){
					each_post.push(comment.created_time);
				});
				comment_times.push(each_post);
			}
		});
	});
}