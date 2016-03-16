var posts = [];
var	ids = [];
var nextpage;
var created_times = [];
var updated_times = [];
var comment_times = [];
var clickCount = -1;



function getUserFeeds(){
	FB.api("/me/feed", function (response) {
		     if (response && !response.error) {
		      	/* handle the result */
			        posts = response.data;
			        
					nextpage = response.paging.next;
					FB.api(nextpage, function(response){
						posts = posts.concat(response.data);
						FB.api(nextpage, function(response){
							posts = posts.concat(response.data);
							FB.api(nextpage, function(response){
								posts = posts.concat(response.data);
								getCreatedTime();
								getPostObject();
							});						
						});
					});
		     }
	});
}

function getCreatedTime(){
	posts.forEach(function(entry){
		created_times.push(entry.created_time);
	});
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
	giveChartData();
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


var graphData = [];
function giveChartData(){
	date = changeTimeToDate(comment_times);
	date.forEach(function(each_post){
		if(each_post.length){
			dic = {};
			each_post.forEach(function(each_comment){
				if(!dic.hasOwnProperty(each_comment)){
					dic[each_comment] = 1;
				}
				else{
					dic[each_comment]++;
				}
			});			
			graphData.push(dic);
		}
	});	
	for(i=0; i < graphData.length; i++){
		if(Object.keys(graphData[i]).length < 2){
			graphData.splice(i,1);
		}
	}
}

