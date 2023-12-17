// Get a reference to the video element
const video = document.getElementById('myVideo');

// Add an event listener to wait for the video to be loaded
video.addEventListener('loadedmetadata', function() {
  // Once the video is loaded, play it
  if (window.innerWidth > '1024') {
    video.play();
  }
});

// Get references to tab links and tab contents
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

// Function to open a specific tab
function opentab(tabName) {
    var educationTab = document.getElementById('education');
    var experienceTab = document.getElementById('experience');
    var eduContent = document.getElementById('edu_content');
    var expContent = document.getElementById('exp_content');

    if (tabName === 'education') {
        // Add 'active-link' class to education tab link
        educationTab.classList.add('active-link');
        // Remove 'active-link' class from experience tab link
        experienceTab.classList.remove('active-link');
        // Add 'active-tab' class to education tab content
        eduContent.classList.add('active-tab');
        // Remove 'active-tab' class from experience tab content
        expContent.classList.remove('active-tab');
    } else if (tabName === 'experience') {
        // Remove 'active-link' class from education tab link
        educationTab.classList.remove('active-link');
        // Add 'active-link' class to experience tab link
        experienceTab.classList.add('active-link');
        // Remove 'active-tab' class from education tab content
        eduContent.classList.remove('active-tab');
        // Add 'active-tab' class to experience tab content
        expContent.classList.add('active-tab');
    }
}

// Get references to the elements
var sidemenu = document.getElementById("sidemenu");
var fullname = document.getElementById("logo");
const nextSection = document.querySelector('#about');
const background_image = document.querySelector('.background-image');

// Add an event listener to handle video autoplay failure
video.addEventListener('error', function() {
  // Handle autoplay failure
  // For example, display a background image instead
  video.style.opacity = "0";
  video.style.display = "none";
  background_image.style.opacity = '1';
});

// Function to open the side menu
function openmenu() {
    sidemenu.style.right = "0";
}

// Function to close the side menu
function closemenu() {
    sidemenu.style.right = "-200px";
}

// Get reference to the header element
const header = document.querySelector('.header-nav');

// Add scroll event listener to the document
document.addEventListener('scroll', () => {
    var scroll_position = window.scrollY;

    // Change background color of the header/navbar when scroll_position goes below the first opened website frame
    if (scroll_position > 100 || window.innerWidth <= '1024') {
        header.style.backgroundColor = '#7371CB';
        fullname.style.color = '#EBDAD7';
        // Display background image instead of video
        video.style.opacity = "0";
        video.style.display = "none";
        background_image.style.opacity = "1";
    } else {
        header.style.backgroundColor = '#7371CB';
        fullname.style.color = "#EBDAD7";
        // Play video
        video.style.opacity = "1";
        video.currentTime = 0;
        video.play();
    }

    // Check if the scroll position is greater than the video height or if the screen is mobile/tablet
    if (window.pageYOffset > video.clientHeight || window.innerWidth <= 1024) {
      // Show background image
        background_image.style.opacity = "1";
    }
});


// Get a reference to the header text element
const headerText = document.querySelector('.header-text');
headerText.style.opacity = "0";

// Define a function that adds the text to the page
function showHeaderText() {
  // Set the video element's z-index to -1 to move it behind other elements
  video.style.zIndex = "-1";
  // Set the header text element's z-index to 10 to bring it to the front
  headerText.style.zIndex = "10";
  // Set the opacity of the header text element to 1 to make it visible
  headerText.style.opacity = "1";
}

// Call the showHeaderText function after a delay of 4 seconds (4000 milliseconds)
// If the screen width is greater than 1024 pixels
if (window.innerWidth > 1024) {
  setTimeout(showHeaderText, 4000);
} else {
  // If the screen width is less than or equal to 1024 pixels, call the function immediately
  showHeaderText();
}

// Define a function to show extra projects
function showExtraProjects() {
  // Get references to the work items and the "See More" button
  const workItems = document.querySelectorAll('.extra-project');
  const seeMoreButton = document.getElementById('seemore');

  // Hide the "See More" button
  seeMoreButton.style.display = 'none';

  // Loop through each work item
  workItems.forEach(workItem => {
    // Output a console log message
    console.log('here');
    const layer = workItem.querySelector('.layer');

    // Check the screen width and set the display style accordingly
    if (window.innerWidth > 768) {
      workItem.style.display = 'flex';
    } else {
      workItem.style.display = 'block';
    }
  });
}


  
// Set the Google Apps Script URL for submitting the form data
const scriptURL = 'https://script.google.com/macros/s/AKfycbywsKXq-38C4KP5ooMoWWiVEWC-Tctq1Nn4rjDZCRAvlggTiMTaK6tsSw9g_9RUFzM/exec';

// Get a reference to the form element
const form = document.forms['submit-to-google-sheet'];

// Get a reference to the message element
const msg = document.getElementById("msg");

// Add a submit event listener to the form
form.addEventListener('submit', e => {
  e.preventDefault();
  // Send a POST request to the Google Apps Script URL with the form data
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        // Display a success message and reset the form
        msg.innerHTML = "Message sent successfully";
        setTimeout(function(){
            msg.innerHTML = "";
        }, 5000);
        form.reset();
    })
    .catch(error => console.error('Error!', error.message));
});

// Define an array of images with their respective timeouts
var images = [{src: 'images/user1.jpeg', timeout: 5000}, {src:'images/user2.jpeg', timeout: 5000}, {src:'images/user.jpg', timeout: 5000}];

// Get a reference to the image element and store its original source
var img = document.getElementById('clickable');
var origSrc = img.src;

// Initialize index and timeout variables
var index = 0;
var timeout = setTimeout(changeImage, images[index].timeout);

// Add a click event listener to the image
img.addEventListener('click', function(){
    // Check if the section is visible
    if (isSectionVisible()) {
        // Clear the current timeout
        clearTimeout(timeout);
        // Increment the index and wrap around to the beginning of the array
        index = (index + 1) % images.length;
        // Update the image source with the next image
        img.src = images[index].src;
        // Set the timeout for the next image
        timeout = setTimeout(changeImage, images[index].timeout);
    }
});

// Function to change the image and set the next timeout
function changeImage() {
  if (isSectionVisible()) {
    index = (index + 1) % images.length; // Increment the index and wrap around
    img.src = images[index].src;
  }
  timeout = setTimeout(changeImage, images[index].timeout); // Set the next timeout
}

// Function to check if the section is visible on the screen
function isSectionVisible() {
  // Get the section element and its position
  var section = document.getElementById('skills-section');
  var rect = section.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  // Check if the section is visible on the screen
  return rect.top < windowHeight && rect.bottom >= 0;
}

// Get a reference to the about section
const aboutSection = document.querySelector('#about-section');

// Check if the about section is visible on the screen
function isSectionVisible() {
  // Get the position of the about section
  const sectionRect = aboutSection.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  // Check if the section is visible on the screen
  return !(sectionRect.bottom < 0 || sectionRect.top - windowHeight >= 0);
}

// // Show the list items one by one if the about section is visible
// function showListItems() {
//   // Get all list items within the about section
//   const listItems = document.querySelectorAll('.about-col-2 li');
//   let delay = 0;

//   // Apply a delay to show each list item
//   for (let i = 0; i < listItems.length; i++) {
//     setTimeout(() => {
//       listItems[i].classList.add('show');
//     }, delay);
//     delay += 500;
//   }
// }

// Check if the about section is visible when the page loads
if (isSectionVisible()) {
  showListItems();
} else {
  // Show the list items if the section becomes visible later
  window.addEventListener('scroll', () => {
    if (isSectionVisible()) {
      showListItems();
      // Remove the event listener once the animation has run
      window.removeEventListener('scroll', showListItems);
    }
  });
}




