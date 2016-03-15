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
	getCreatedTime();
}

function getCreatedTime(){
	posts.forEach(function(entry){
		created_times.push(entry.created_time);
	});
	getPostObject(posts);
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
	getCommentTimes();
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