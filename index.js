import * as Carousel from './Carousel.js';
// You have axios, you don't need to import it
console.log(axios);

// The breed selection input element.
const breedSelect = document.getElementById('breedSelect');
// The information section div element.
const infoDump = document.getElementById('infoDump');
// The progress bar div element.
const progressBar = document.getElementById('progressBar');
// The get favourites button element.
const getFavouritesBtn = document.getElementById('getFavouritesBtn');

// Step 0: Store your API key here for reference and easy access.
const API_KEY = 'live_qmNyw6IveiNDKI8TzJqqYiIJ4nuuMhd5GPclueh3hKeSXtsCJlQ2X38hsTchPWYn';

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

async function initialLoad() {
  try {
       const res = await fetch('https://api.thecatapi.com/v1/breeds');
       const data = await res.json();
       console.log(data);

       for (const breed of data)
       {
        const option = document.createElement('option');
        option.setAttribute("value", breed.id);
        option.textContent = breed.name;
        breedSelect.append(option);
       }
       
  }catch (err){
  console.log(err);
  }
}

initialLoad();

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */


//an event handler for breedSelect 
breedSelect.addEventListener("change", retrieveBreed);

//Retrieve information on the selected breed from the cat API using fetch()
 async function retrieveBreed() {
  const selectedBreed = breedSelect.value;
 
  try {
    // Clear previous carousel images and info
    Carousel.clear();

    // Fetch breed details
    let breedURL = `https://api.thecatapi.com/v1/breeds/${selectedBreed}`;
    const breedResponse = await fetch(breedURL);
    const breedData = await breedResponse.json();
  
    let imageURL = `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreed}`;
    const imageResponse = await fetch(imageURL); // Removed headers
    const imageData = await imageResponse.json();

    // Loop through the images and append them to the carousel
    imageData.forEach(image => {
      const imageItem = Carousel.createCarouselItem(image.url, `Image of ${breedData.name}`);
      Carousel.appendCarousel(imageItem);
    });

    Carousel.start();
  
    const breedInfo = document.getElementById('infoDump');
    breedInfo.innerHTML = `
      <h2>${breedData.name}</h2>
      <p>${breedData.description}</p>    
    `;

  } 
  catch (error) {
    console.error( error);
  

  }
}

/**
 * For Step 3 of the Lab which wants you to fork the CodeSandbox that you're working in, presuming you successfully migrated your code over to VS Code, we're going to do something different instead.
Once you reach Step 3, go ahead and push your code up to this point up to a new GitHub repository
After successfully pushing your code, git clone the repository to create a copy of it
In the cloned repo, replace any GET requests done using fetch() with axios instead and continue the rest of the lab from there. Push this new code to a new GitHub repository
For the Assignment Submission, submit the GitHub repo with the code where you used axios. In the comment of the submission feel free to include the URL to the first repo that was using fetch
NOTE: If you want, you can also choose to just comment out the line with the fetch() and underneath it create a new line that uses axios instead.
For Step 5, 6 and 7 which mention interceptors, be sure to review the section on interceptors from module 308A lesson 4, and today's recording.
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */