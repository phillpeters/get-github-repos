'use strict';

const baseUrl = 'https://api.github.com/users/';

function displayRepos(responseJson, user) {
  $('.js-empty').empty();
  $('.js-repos').text(`${user}'s repositories`);
  
  for (let i = 0; i < responseJson.length; i++) {
    $('.js-repos-list').append(
      `<li><h3>${responseJson[i].name}</h3>
       <a href=${responseJson[i].html_url}>${responseJson[i].html_url}</a></li>`
    )
  }  
  $('.js-display-repos').show();
}

function getRepos(user) {
  const url = baseUrl + user + '/repos';
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(responseJson => {
      console.log(responseJson);
      displayRepos(responseJson, user);
    })
    .catch(err => {
      $('.js-display-repos').hide();
      $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const user = $('#js-user').val();
    $('#js-user').val('');
    getRepos(user);
  });
}

console.log('test');

$(watchForm);