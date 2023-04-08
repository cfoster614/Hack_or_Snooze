"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $favoritesList = $("#favorites-list");
const $userStoriesList = $("#user-stories-list");
const $favorite = $(".fa-star");


const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $storyForm = $("#story-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $navStory = $("#nav-story");
const $navFavorites = $('#nav-favorites');
const $navUserStories = $('#nav-user-stories');

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hideNavComponents() {
  const components = [
    $navStory,
    $navFavorites,
    $navUserStories,
  ];
  components.forEach(c => c.hide());
}

function hidePageComponents() {
  const components = [
    $storyForm,
    $favoritesList,
    $userStoriesList,
    $allStoriesList,
    $loginForm,
    $signupForm,
  ];
  activeList = false;
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) {updateUIOnUserLogin()}
  else {
    hideNavComponents();
  };
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);
