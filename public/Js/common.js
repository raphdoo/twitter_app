//disabling and enabling submit a tweet button
$("#postText").keyup((event)=>{
    let textbox = $(event.target);
    let value = textbox.val().trim()

    let submitTweet = $("#submitTweet")

    if(value == ""){
        submitTweet.prop("disabled", true)
        return;
    }

    submitTweet.prop("disabled", false)

})

//Handling submit tweet event
$("#submitTweet").click((event)=>{

    let submitTweet = $(event.target)
    let textbox = $("#postText")

    const data = {
        content: textbox.val()
    }

    //Ajax call to send request to server and receive response from server
    $.post("/tweet", data, (postData, status, xhr)=>{
        
        //pass the createTweet return value to html variable declared
        const html = createTweet(postData);
        $(".postContainer").prepend(html); //prepend the created post to the post container
        
        //clear the textbox and disable the tweet button
        textbox.val(""); 
        submitTweet.prop("disabled", true)
    })

})

// Handling post like button, since, since the button is dynamically created,
// it is required for the document to load before listening to the click event.
$(document).on("click", ".likeButton", (event)=>{
    const button = $(event.target);
    const postId = getPostIdFromElement(button)

    //ajax call to update the like in the serverside
    $.ajax({
        url: `/tweet/${postId}/like`,
        type: "PUT",
        success: ((postData)=>{
            console.log(postData.likes.length)
        })
    })

})

//get to the root or parent element to retrieve the tweet id stored in the data-id
function getPostIdFromElement(element) {
    let isRoot = element.hasClass('post');
    let rootElement = isRoot ? element : element.closest(".post");
    const postId = rootElement.data().id;

    return postId;
}


//create the tweet container
function createTweet(postData){
    const postedBy = postData.postedBy
    const timestamp = timeDifference(new Date(), new Date(postData.createdAt))
    
    return `<div class="post" data-id= ${postData._id}>
                <div class="mainContentContainer">
                    <div class="userImageContainer">
                        <img src=${postedBy.profilePic}>
                    </div>
                    <div class="postContentContainer">
                        <div class="header">
                            <a href="/profile/${postedBy.Username}" class="displayName"> ${postedBy.Firstname} </a>
                            <span class="username">@${postedBy.Username}<span>
                            <span class="date">${timestamp}</span>
                        </div>
                        <div class="postBody">
                            <span>${postData.content}</span>
                        </div>
                        <div class="postFooter">
                            <div class="postButtonContainer">
                                <button class="commentButton">
                                    <i class="fa-regular fa-comment"></i>
                                </button>
                                <button class="retweetButton">
                                    <i class="fa-solid fa-retweet"></i> 
                                </button>
                                <button class="likeButton">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}

//Handling timstamps to ago
function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if(elapsed/1000 < 30) return "Just now"
        return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}