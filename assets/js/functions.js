// SETTING THE SCROLLBAR IN CONVERSATION WINDOW
var out = document.getElementById("out");
var c = 0;
// first set scrollbar on the bottom of the page
out.scrollTop = out.scrollHeight;

var add = setInterval(function() {
    // allow 1px inaccuracy by adding 1
    var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
    // console.log(out.scrollHeight - out.clientHeight,  out.scrollTop + 1);

    // add new element every second to test if everything is ok
    // var newElement = document.createElement("div");
    // newElement.innerHTML = c++;
    // out.appendChild(newElement);

    // scroll to bottom if isScrolledToBottom
    if(isScrolledToBottom)
      out.scrollTop = out.scrollHeight - out.clientHeight;
}, 1000);

// var element = document.getElementById("out");
// element.scrollTop = element.scrollHeight;
//
// function updateScroll(){
//     var element = document.getElementById("out");
//     element.scrollTop = element.scrollHeight;
// }
// //once a second
// setInterval("updateScroll",1000);
