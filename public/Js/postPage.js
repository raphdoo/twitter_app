$(document).ready(()=>{

    //Ajax call to receive response from server
    $.get("/tweet/"+postId, (results)=>{
        outputTweetPlusReplies(results, $(".postContainer"))        
        
    })
})