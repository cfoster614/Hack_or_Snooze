"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
let activeList;


/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  putStoriesOnPage();
  
 
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const showStar = Boolean(currentUser);
  return $(`
      <li id="${story.storyId}">
        <div>
        ${showStar ? getTrash(story, currentUser) : ""}
        ${showStar ? getStar(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        </div>
      </li>
    `);
}

function getTrash(story, user) {
  const isOwnStory = user.isOwnStory(story);
  console.log(isOwnStory);
  if(isOwnStory && activeList){

    return `<span class="delete">
      <i class="fas fa-trash-alt"></i>
      </span> `
  } else {
    return "";
  }
}

function getStar(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" :"far";
  return `
  <span class="star">
  <i class="${starType} fa-star"></i>
</span>`;
  
}
/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
  
}

async function addStory(evt) {
  console.debug("addStory", evt);
  evt.preventDefault();

  const $author = $('#story-author').val();
  const $title = $('#story-title').val();
  const $url = $('#story-url').val();
  console.log(currentUser);
  await storyList.addStory(currentUser, { title: $title, author: $author, url: $url });

  //automatically show new story at the top without refreshing page
  getAndShowStoriesOnStart();
}
$storyForm.on("submit", addStory);


async function toggleFavorites(evt) {
  console.debug("toggleFavorites", evt);
  activeList = true;

 const closeLi = evt.target.closest('li');
 const storyId = closeLi.id;
 const story = storyList.stories.find(s => s.storyId === storyId);

 if($(evt.target).hasClass("fas")) {
  await currentUser.removeFavorite(story);
  $(evt.target).removeClass("fas").addClass("far");
    if($favoritesList && activeList) {
      closeLi.remove();
      if($('#favorites-list li').length === 0){
        $favoritesList.append("<li>You don't have any favorites yet!</li>")
      } 
    }
 } else {
   await currentUser.addFavorite(story);
   $(evt.target).removeClass("far").addClass("fas");
 }
 
 
 
}


function putFavoritesListOnPage() {
  console.debug("putFavoritesOnPage");
 
  $favoritesList.empty();

  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    console.log(story);
    $favoritesList.append($story);
  }
  $favoritesList.show();

}
$body.on('click', '.fa-star', toggleFavorites);

function putUserStoriesOnPage() {
  console.debug("putUserStoriesOnPage");
  activeList = true;
  $userStoriesList.empty();

  for (let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story);
    console.log(story);
    $userStoriesList.append($story);
  }
  $userStoriesList.show();
}


async function deleteStory(evt){
  console.debug("deleteStory");
  const closeLi = evt.target.closest('li');
  const storyId = closeLi.id;
  const story = storyList.stories.find(s => s.storyId === storyId);
  await currentUser.deleteStory(story);
  closeLi.remove();

  if($('#user-stories-list li').length === 0){
    $userStoriesList.append("<li>You don't have any stories yet!</li>")
  } 

  

}
$body.on('click', '.delete', deleteStory);