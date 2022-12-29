//Push all tweets to the feed container at load of page

$(document).ready(()=>{

    //Ajax call to receive response from server
    $.get("/tweet", (results)=>{
        outputTweet(results, $(".postContainer"))        
        
    })
})