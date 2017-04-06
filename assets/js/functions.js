// when uncommented there's a collision with findUser()
// $(document).ready(function(){

var owner = {
  firstName: "Jon",
  lastName: "Snow",
  image: "assets/images/profiles/Tyrion.jpg",
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var data = [
  {
    firstName: "Jon",
    lastName: "Snow",
    image: "assets/images/profiles/Jon.jpg",
    isActive: true,
    // the reason that unreadCount is here is to show that proper div exists
    // better would be to add separate boolean to each message, e.g. read: true/false
    unreadCount: 1,
    messages: [
      {
        date: "Wed",
        sentBy: "user",
        text: "Ghost! Where are you?"
      },
      {
        date: "Mon",
        sentBy: "owner",
        text: "Holy Crap!"
      },
      {
        date: "Sun",
        sentBy: "user",
        text: "Nicely done, Melisandre, but my hurt's not beating anymore.."
      },
      {
        date: "Wed",
        sentBy: "user",
        text: "Long live the King in the North! Lol, I'm the King in the North."
      },
      {
        date: "Mon",
        sentBy: "owner",
        text: "Uh, la la la!"
      },
      {
        date: "Sun",
        sentBy: "user",
        text: "Winter is coming, so... let it snow, let it snow, let it snow!"
      }
    ]
  },
  {
    firstName: "Arya",
    lastName: "Stark",
    image: "assets/images/profiles/Arya.jpg",
    isActive: false,
    unreadCount: 0,
    messages: [
      {
        date: "Wed",
        sentBy: "user",
        text: "Valar Morghulis.. Oops. I feel like.. something.. stuck in my.. throat..."
      },
      {
        date: "Wed",
        sentBy: "owner",
        text: "Have you lost your mind?!"
      }
    ]
  },
  {
    firstName: "Petyr",
    lastName: "Baelish",
    image: "assets/images/profiles/Petyr.jpg",
    isActive: false,
    unreadCount: 3,
    messages: [
      {
        date: "Sun",
        sentBy: "owner",
        text: "Dunno why, wanna cry.. uh, uh..."
      },
      {
        date: "Mon",
        sentBy: "user",
        text: "Have you seen Sansa? Where is she?! Saaaaansaaaa! I looooooove youuuuu!"
      }
    ]
  },
  {
    firstName: "Ramsay",
    lastName: "Bolton",
    image: "assets/images/profiles/Ramsay.jpg",
    isActive: true,
    unreadCount: 0,
    messages: [
      {
        date: "Sun",
        sentBy: "owner",
        text: "I like mornings. Huh, just kiddin!"
      },
      {
        date: "Sat",
        sentBy: "user",
        text: "Oh, Lord! I see so much unuseful skin on your body!"
      }
    ]
  }
];

/////////////////////////////////////////////////////// DECLARE GLOBAL VARIABLES



///////////////////////////// FUNCTION: PRINT ALL TALKED USERS IN HISTORY WINDOW
function printUsers() {
  // declare users list
  var usersOutput = "<ul id='users-list'>";
  // loop through data and add users to list
  for (var i in data) {
    console.log(i);
    // find last message in an array to print below user's name
    var recentMessage = data[i].messages[data[i].messages.length - 1];
    // create an user li to print on users list
    usersOutput += "<li><div class='user-container'><a href='#'><div class='picture-container'>";
    // check if user is active
    if (data[i].isActive === true){
      usersOutput += "<div class='is-active'></div>"
    }
    usersOutput += "<img class='profile-picture' src='" + data[i].image + "'></div>";
    usersOutput += "<div class='info-container'><div class='top-info'><span class='name'>" + data[i].firstName + " " + data[i].lastName + "</span>";
    usersOutput += "<div class='sent-time'><span>" + recentMessage.date + "</span></div></div><div class='bottom-info'><span class='news'>" + recentMessage.text + "</span>";

    if(data[i].unreadCount > 0){
      usersOutput += "<div class='unread-count'><span>" + data[i].unreadCount + "</span></div>";
    }
    usersOutput += "</div></div></a></div></li>";
  }
  // close declaration of users list
  usersOutput += "</ul>";
  // add/replace current content
  document.getElementById("users").innerHTML=usersOutput;
}

printUsers();



/////////////////////////////////////////// FUNCTION: PRINT CONVERSATION HISTORY
function printMessageHistory() {
  // find index of clicked user in users LIST
  var userIndex = $('.active').index();
  // find user in data by index from list (foundation: index from users list = user index in DB)
  var user = data[userIndex];
  // get all the messages of specific user from DB
  var messages = user.messages;
  // create an message li to print on users list
  var messagesOutput = "<ul id='show-history'>";
  // loop through users and add messages to conversation window
  for (var i in messages) {
    // print history of messages in conversation window
    messagesOutput += "<li><img class='" + messages[i].sentBy + "-profile-picture' class='clearfix' src='";
    if(messages[i].sentBy == "user") {
      messagesOutput += user.image;
    } else {
      messagesOutput += owner.image;
    }
    messagesOutput += "'><div class='" + messages[i].sentBy + "-sent-message'><span>" +  messages[i].text + "</span></div></li>";
  }
  messagesOutput += "</ul>";
  // printing data on screen
  document.getElementById("conversation").innerHTML=messagesOutput;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// events after click on user window in history
$('#users-list').on('click', 'li', function() {
  // remove .active from last li and add to clicked one
  $(".active").removeClass("active");
  $(this).addClass("active");
  // change '.user-container > a' styling after click
  $('a.user-after-click').removeClass('user-after-click');
  $(this).find('.user-container > a').addClass('user-after-click');
  // change username on top-bar
  var name = $(this).find('.name').text();
  $('#current-user-name').text(name);

  // clear the count of unread messages
  // find index of clicked user in users LIST
  var userIndex = $('.active').index();

  // find user in data by index from list (foundation: index from users list = user index in DB)
  var count = data[userIndex].unreadCount;
  // print message history
  printMessageHistory();

  // SETTING THE SCROLLBAR IN CONVERSATION WINDOW
  var conversation = document.getElementById("conversation");
  // var c = 0;
  // first set scrollbar on the bottom of the conversation window
  conversation.scrollTop = conversation.scrollHeight;

  var add = setInterval(function() {
      // allow 1px inaccuracy by adding 1
      var isScrolledToBottom = conversation.scrollHeight - conversation.clientHeight <= conversation.scrollTop + 1;
      // scroll to bottom if isScrolledToBottom
      if(isScrolledToBottom)
        conversation.scrollTop = conversation.scrollHeight - conversation.clientHeight;
  }, 1000);
});



/////////////////////// FUNCTION: ADD INPUTTED MESSAGE TO USER'S MESSAGE HISTORY
var sendMessage = function() {
  // find index of clicked user in users LIST
  var userIndex = $('.active').index();
  // find user in data by index from list (foundation: index from users list = user index in DB)
  var user = data[userIndex];
  // find user messages
  var messages = user.messages;
  // get the message from input
  var inputtedText = $("input.input[type='text']").val();
  if(inputtedText !== ""){
    // clearing input
    $("input.input[type='text']").val("");
    // create a new message object
    var newMessage = {
      date: "Wed",
      sentBy: "owner",
      text: inputtedText
    };
    // add newMessage to user.messages
    messages.push(newMessage);
    // update message history
    printMessageHistory();
    // find span.news below user's name and print there last added message
    $("#users-list li.active").find(".news").text(inputtedText);


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

////////////////////////////////////////////// FUNCTION: FIND USER IN USERS LIST
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
