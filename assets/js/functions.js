// when uncommented there's a collision with findUser()
// $(document).ready(function(){

// var data = [
//   {
//     name: "Jon",
//     lastName: "Snow",
//     image: "assets/images/profiles/Arya.jpg",
//     messages: []
//
//
//   }
// ]}





// callback function for sending inputted message
var sendMessage = function() {
  var inputtedText = $("input.input[type='text']").val();
  if(inputtedText !== ""){
    // clearing input
    $("input.input[type='text']").val("");
    // create a new li and add to ul
    $(".conversation-inner ul").append("<li><img class='owner-profile-picture' src='assets/images/profiles/Tyrion.jpg' alt=''><div class='owner-sent-message'><span>" + inputtedText + "</span></div></li>");

    // animate scrolling to bottom after message send
    $("#conversation").animate({
      scrollTop: conversation.scrollHeight
    }, 300);
  }
}

// event after "enter" press
$("input.input").keypress(function(event) {
    if (event.which == 13) {
      sendMessage();
      event.preventDefault();
    }
});

// event after #send-button click
$('#send-button').click(sendMessage);

// events after click on user window in history
$('#users-list').on('click', 'li', function() {
  // change '.user-container > a' styling after click
  $('a.user-after-click').removeClass('user-after-click');
  $(this).find('.user-container > a').addClass('user-after-click');

  // change username on top-bar
  var name = $(this).find('.name').text();
  $('#current-user-name').text(name);

  // print conversation history in .conversation-inner
  // first clear the window
  $("#show-history").empty();
  // get the specific user data from user-history and add to window
  var history = $(this).find('.user-history').html();
  $(history).appendTo("#show-history");
});


// SETTING THE SCROLLBAR IN CONVERSATION WINDOW
var conversation = document.getElementById("conversation");
var c = 0;
// first set scrollbar on the bottom of the conversation window
conversation.scrollTop = conversation.scrollHeight;

var add = setInterval(function() {
    // allow 1px inaccuracy by adding 1
    var isScrolledToBottom = conversation.scrollHeight - conversation.clientHeight <= conversation.scrollTop + 1;
    // scroll to bottom if isScrolledToBottom
    if(isScrolledToBottom)
      conversation.scrollTop = conversation.scrollHeight - conversation.clientHeight;
}, 1000);


// filtering users list // doesn't work when ul.user-history added to #users-list li
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

// });
