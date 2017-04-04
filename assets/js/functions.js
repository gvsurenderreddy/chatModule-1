
// callback function for sending inputted message
var sendMessage = function() {
  var inputtedText = $("input.input[type='text']").val();
  if(inputtedText !== ""){
    // clearing input
    $("input.input[type='text']").val("");
    // create a new li and add to ul
    $(".conversation-inner ul").append("<li><img class='logged-user-profile-picture' src='assets/images/profiles/Tyrion.jpg' alt=''><div class='logged-user-sent-message'><span>" + inputtedText + "</span></div></li>");

    // animate scrolling to bottom after message send
    $("#conversation").animate({
      scrollTop: conversation.scrollHeight
    }, 300);
  }
}

// event after "enter" press
$("input.input").keypress(function(event) {
    if (event.which == 13) sendMessage();
});

// event after "enter" press - for IE compability /does not work/ why?
// $("input.input").keydown(function(event) {
//     if (event.keyCode == 13) sendMessage();
// });


// event after #send-button click
$('#send-button').click(sendMessage);




$('#users-list').on('click', 'li', function() {
  // change username on top-bar
  var name = $(this).find('.name').text();
  $('#current-user-name').text(name);

  // change '.user-container > a' styling after click
  $('a.user-after-click').removeClass('user-after-click');
  $(this).find('.user-container > a').addClass('user-after-click');
});

// $('.childDiv').click(function() {
//   $(this).parent().find('.childDiv').css('background-color', '#ffffff');
//   $(this).css('background-color', '#ff0000');
// });


// $("input.input[type='text']").on("keypress", function(event){
//   if(event.which === 13){
//     // grabbing new task from input
//     var inputtedText = $(this).val();
//     if(inputtedText !== ""){
//       // clearing input
//       $(this).val("");
//       // create a new li and add to ul
//       $(".conversation-inner ul").append("<li><img class='logged-user-profile-picture' src='assets/images/profiles/Tyrion.jpg' alt=''><div class='logged-user-sent-message'><span>" + inputtedText + "</span></div></li>");
//
//
//       $("#conversation").animate({
//         scrollTop: conversation.scrollHeight
//       }, 300);
//       // visib("added");
//     }else{
//       // visib("error");
//     }
//   }
// });


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


// jQuery('a').click(function(){
//    jQuery(this).toggleClass('active');
// });

// filtering users list
function findUser() {
  // declare variables
  var input, filter, ul, li, a, i;
  input = document.getElementById('search-input');
  filter = input.value.toUpperCase();
  ul = document.getElementById("users-list");
  li = ul.getElementsByTagName('li');
  // loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].querySelectorAll('.top-info span')[0];
    // for exact fit type below (... === 0)
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
    } else {
        li[i].style.display = "none";
    }
  }
}
