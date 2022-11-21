//disabling and enabling submit a tweet button
$("#postText").keyup((event)=>{
    let textbox = $(event.target);
    let value = textbox.val().trim()
    console.log(value)

    let submitTweet = $("#submitTweet")

    if(value == ""){
        submitTweet.prop("disabled", true)
        return;
    }

    submitTweet.prop("disabled", false)

})

$("#submitTweet").click((event)=>{

    let submitTweet = event.target
    let textbox = $("#postText")

    const data = {
        content: textbox.val()
    }

    $.post("/api/post", data, (postData, status, xhr)=>{

    })

})