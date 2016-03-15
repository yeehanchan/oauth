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


function changeTimeToDate(time){
	date = [];
	time.forEach(function(each_post){
		if(each_post){
			var new_each_post = [];
			each_post.forEach(function(comment){
				new_each_post.push(comment.substr(0,10));
			});
			date.push(new_each_post);
		}
		else{
			date.push([]);
		}
	});
	return date;
}


function giveChartData(){
	date = changeTimeToDate(comment_times);
	dic = {}
	date.forEach(function(each_post){
		each_post.forEach(function(each_comment_date){
			if(!dic.hasOwnProperty(each_comment_date)){
				dic[each_comment_date] = 1;
			}
			else{
				dic[each_comment_date]++;
			}
		});
	});
	k = Object.keys(dic);
	v = [];
	k.forEach(function(key){
		v.push(dic[key]);
	});
	result = []
	result.push(k);
	result.push(v);
	return result;
}