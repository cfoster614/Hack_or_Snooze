"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  getAndShowStoriesOnStart();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  // hideNavComponents();
  $loginForm.show();
  $signupForm.show();
}
$navLogin.on("click", navLoginClick);

function navLogOutClick(evt) {
  console.debug("navLogOutClick", evt);
  hideNavComponents();
}

$body.on('click', '#nav-logout', navLogOutClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".nav-link").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function storyClick(evt) {
  console.debug("storyClick", evt);
  hidePageComponents();
  $storyForm.show();

}

$navStory.on("click", storyClick);


function favoritesClick(evt) {
  console.debug("favoritesClick", evt);
 hidePageComponents();
  putFavoritesListOnPage()
  
  
  if($('#favorites-list li').length === 0){
    $favoritesList.append("<li>You don't have any favorites yet!</li>")
  } 

}
$navFavorites.on("click", favoritesClick);

function userStoriesClick(evt) {
  console.debug("userStoryClicks", evt);
  hidePageComponents();
  putUserStoriesOnPage();
  if($('#user-stories-list li').length === 0){
    $userStoriesList.append("<li>You don't have any stories yet!</li>")
  } 
}

$navUserStories.on('click', userStoriesClick);