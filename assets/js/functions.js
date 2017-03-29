// SETTING THE SCROLLBAR IN CONVERSATION WINDOW
var conversation = document.getElementById("conversation");
var c = 0;
// first set scrollbar on the bottom of the conversation window
conversation.scrollTop = conversation.scrollHeight;

var add = setInterval(function() {
    // allow 1px inaccuracy by adding 1
    var isScrolledToBottom = conversation.scrollHeight - conversation.clientHeight <= conversation.scrollTop + 1;
    // console.log(conversation.scrollHeight - conversation.clientHeight,  conversation.scrollTop + 1);

    // // add new element every second to test if everything is ok
    // var newElement = document.createElement("div");
    // newElement.innerHTML = c++;
    // conversation.appendChild(newElement);

    // scroll to bottom if isScrolledToBottom
    if(isScrolledToBottom)
      conversation.scrollTop = conversation.scrollHeight - conversation.clientHeight;
}, 1000);

// var element = document.getElementById("conversation");
// element.scrollTop = element.scrollHeight;
//
// function updateScroll(){
//     var element = document.getElementById("conversation");
//     element.scrollTop = element.scrollHeight;
// }
// //once a second
// setInterval("updateScroll",1000);
