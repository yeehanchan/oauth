/* make the API call */


var posts = [];
var	ids = [];
var nextpage;
var created_times = [];
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
	console.log("this is test", posts.length);
	getCreatedTime();
	console.log("this is the created time",created_times.length);	
	
	getCommentTimes();
	console.log("this is the comment_times", comment_times.length);
}



function getCreatedTime(){
	posts.forEach(function(entry){
		created_times.push(entry.created_time);
	});
	getPostObject();
	console.log("this is the updated_time", updated_times.length);
}


function getPostObject(){

	posts.forEach(function(entry){
		ids.push(entry.id);
	});
	ids.forEach(function(entry){
		FB.api(entry,{"field":"updated_time"}, function(response){
			if(response && !response.error) {
				updated_times.push(response.updated_time);
			}
		});
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