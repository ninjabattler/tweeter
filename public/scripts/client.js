/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json


const getDate = function(time){

  const difference = Math.floor((new Date().getTime() - time) / (1000 * 3600 * 24));

  if(difference < 7){
    return `${Math.round((difference) * 10) / 10} days ago`;
  } else if(difference < 30){
    return `${Math.round((difference/7) * 10) / 10} weeks ago`;
  } else if(difference < 365){
    return `${Math.round((difference/30) * 10) / 10} months ago`;
  } else {
    return `${Math.round((difference/365) * 10) / 10} years ago`;
  }

}

const createTweetElement = function(tweet) {
  let $tweet = $(`<article class="tweet"></article>`);
  let $header = $(`<header class='tweet horizontalDisplay'></header>`);
  let $content = $(`<p class='content'>`).text(tweet.content.text);
  let $footer = $(`<footer class='tweet horizontalDisplay'></footer>`);
  let $avatar = $(`<div class='avatar'><img src='${tweet.user.avatars}'><span>${tweet.user.name}</span></div>`);

  $header.append($avatar);
  $header.append(`<span class="handler">${tweet.user.handle}</span>`);

  $footer.append(`<span class="handler">${getDate(tweet.created_at)}</span>`);
  $footer.append('<div><span><i class="icon fab fa-font-awesome-flag"></i><i class="icon fas fa-exchange-alt"></i><i class="icon fas fa-heart"></i></span></div>');

  $tweet.append($header);
  $tweet.append($content);
  $tweet.append($footer);

  return $tweet;
}

const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for(const tweet of tweets){
    const post = createTweetElement(tweet);
    $('#tweets-container').append(post);
  }
}

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets.reverse());
    });
}
$(() =>{
  loadTweets();

  $('#tweetForm').on('submit', function (event) {
    event.preventDefault();
    console.log('Button clicked, performing ajax call...');
    const textArea = this.children[1];
    if(this.children[1].value.length > 0 && this.children[1].value.length <= 140){
      $.ajax('/tweets', { method: 'POST', data: $(this).serialize()})
      .then(function () {
        console.log('Success: ', $(this).serialize());
        $('#errorDisplay').attr("id","errorHide")
        textArea.value = '';  
        loadTweets();
      });
    } else {
      if(this.children[1].value.length > 140){
        $('#noError').attr("id","errorDisplay")
        $('#errorDisplay').html('Ahoy Spongeboi me bob, yer string is to long argargargargargargar')
        console.error('Ahoy Spongeboi me bob, yer string is to long argargargargargargar')
      }
      if(this.children[1].value.length <= 0){
        $('#noError').attr("id","errorDisplay")
        $('#errorDisplay').html('Ahoy Spongeboi me bob, yer string is empty argargargargargargar')
        console.error('Ahoy Spongeboi me bob, yer string is empty argargargargargargar');
      }
    }
  });
  $('#newTweet').on('click', function(event){
    if($('#tew').attr('shrunk') === 'false'){
      $("#tew").animate({ height: "0px", opacity: 0 });
      $('#tew').attr('shrunk','true');
    } else {
      $("#tew").animate({ height: "250px", opacity: 1 });
      $('#tew').attr('shrunk', 'false');
    }
  })
})