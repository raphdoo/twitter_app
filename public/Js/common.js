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

//Like a post
// Handling post like button. since the button is dynamically created,
// it is required for the document to load before listening to the click event.
$(document).on("click", ".likeButton", (event)=>{
    const button = $(event.target);
    const postId = getPostIdFromElement(button)

    //ajax call to update the like in the serverside
    $.ajax({
        url: `/tweet/${postId}/like`,
        type: "PUT",
        success: ((postData)=>{
            button.find("span").text(postData.likes.length || "") //realtime update of the like button without having to refresh
        
            //checking if user had liked the post
            if(postData.likes.includes(userLoggedIn._id)){
                button.addClass("active");
            }else{
                button.removeClass("active") //adding custom color to like button
            }
        })

    })

})

//Retweet
$(document).on("click", ".retweetButton", (event)=>{
    const button = $(event.target);
    const postId = getPostIdFromElement(button)

    //ajax call to update the retweet endpoint in the server
    $.ajax({
        url: `/tweet/${postId}/retweet`,
        type: "POST",
        success: ((postData)=>{
            button.find("span").text(postData.retweetUsers.length || "") //realtime update of the  button without having to refresh
        
            //checking if user had retweeted the post
            if(postData.retweetUsers.includes(userLoggedIn._id)){
                button.addClass("active");
            }else{
                button.removeClass("active") //adding custom color to retweet button
            }

        })

    })
    console.log()
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
    // //handling retweeted tweets
    if(postData == null) return alert("tweet is null");

    let isRetweet = postData.content == undefined;

    let retweetBy = isRetweet ? postData.postedBy.Username : null

    // //setting postData to retweet data if tweet is a retweet, else treat as postData if its a new post
    postData = isRetweet ? postData.retweetData[0] : postData;

    const postedBy = postData.postedBy
    const timestamp = timeDifference(new Date(), new Date(postData.createdAt))

    
    //adding active class to icons for styling
    const likedTweetActiveClass = postData.likes.includes(userLoggedIn._id) ? "active" : "";
    const retweetActiveClass = postData.retweetUsers.includes(userLoggedIn._id) ? "active" : "";
    console.log(retweetBy)
    let retweetText = ""
    if(isRetweet){
        retweetText = `<span>Retweeted by <a href='profile/${postedBy.Username}'>@${retweetBy}</a> </span>`
    }
    return `<div class="post" data-id= ${postData._id}>
                <div class='retweet-post-owner'>
                    ${retweetText}
                </div>
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
                                <button class="commentButton blue">
                                    <i class="fa-regular fa-comment"></i>
                                    <span class="LikeQuantity"></span>
                                </button>
                                <button class="retweetButton ${retweetActiveClass}">
                                    <i class="fa-solid fa-retweet"></i>
                                    <span class="LikeQuantity">${postData.retweetUsers.length || ""}</span> 
                                </button>
                                <button class="likeButton ${likedTweetActiveClass}">
                                    <i class="fa-regular fa-heart"></i>
                                    <span class="LikeQuantity">${postData.likes.length || ""}</span>
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