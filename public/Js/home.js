//Push all tweets to the feed container at load of page

$(document).ready(()=>{

    //Ajax call to receive response from server
    $.get("/tweet", (results)=>{
        outputTweet(results, $(".postContainer"))        
        
    })
})

function outputTweet(results, container){
    //empty the container first
    container.html("")

    //create an html component for each tweet and append to the container
    results.forEach((result)=>{
       let tweetContainer = createTweet(result)
       container.append(tweetContainer)
    })
    if(results == ""){
        container.append("<span>No result found</span>")
    }
    
}