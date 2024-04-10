/** This is my Dog Catalog project built on SEA Data Catalog sample. Dog data is fetching from thedogapi API. 
 * There is a separate breeds enpoints and images endpoints. I used images enpoints that have info about breed. 
 * With auth_key I could get maximum 100 dog info per requests. 
 * The code is doing 30 requests, which generates approx. 170 different dog breeds.I kept original code in comments as well.
 * 
 * 1. I used thefollowing data structures:
 *      -Dog class, 
 *      -arrays of dogs and,
 *      -dictionary with dog names as a key and dog objext as a value
 * 2. I have the following features:
 *      - search by keyword
 *      - sort ascending or descending
 *      - reset initial loaded cards
 * 
 * 
 * 
 * */


/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */


// const FRESH_PRINCE_URL = "https://upload.wikimedia.org/wikipedia/en/3/33/Fresh_Prince_S1_DVD.jpg";
// const CURB_POSTER_URL = "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg";
// const EAST_LOS_HIGH_POSTER_URL = "https://static.wikia.nocookie.net/hulu/images/6/64/East_Los_High.jpg";

// This is an array of strings (TV show titles)
// let titles = [
//     "Fresh Prince of Bel Air",
//     "Curb Your Enthusiasm",
//     "East Los High"
// ];
// Your final submission should have much more data than this, and 
// you should use more than just an array of strings to store it all.


// This function adds cards the page to display the data in the array
// function showCards() {
//     const cardContainer = document.getElementById("card-container");
//     cardContainer.innerHTML = "";
//     const templateCard = document.querySelector(".card");
    
//     for (let i = 0; i < titles.length; i++) {
//         let title = titles[i];

//         // This part of the code doesn't scale very well! After you add your
//         // own data, you'll need to do something totally different here.
//         let imageURL = "";
//         if (i == 0) {
//             imageURL = FRESH_PRINCE_URL;
//         } else if (i == 1) {
//             imageURL = CURB_POSTER_URL;
//         } else if (i == 2) {
//             imageURL = EAST_LOS_HIGH_POSTER_URL;
//         }

//         const nextCard = templateCard.cloneNode(true); // Copy the template card
//         editCardContent(nextCard, title, imageURL); // Edit title and image
//         cardContainer.appendChild(nextCard); // Add new card to the container
//     }
// }

// function editCardContent(card, newTitle, newImageURL) {
//     card.style.display = "block";

//     const cardHeader = card.querySelector("h2");
//     cardHeader.textContent = newTitle;

//     const cardImage = card.querySelector("img");
//     cardImage.src = newImageURL;
//     cardImage.alt = newTitle + " Poster";

//     // You can use console.log to help you debug!
//     // View the output by right clicking on your website,
//     // select "Inspect", then click on the "Console" tab
//     console.log("new card:", newTitle, "- html: ", card);
// }

// This calls the addCards() function when the page is first loaded
// document.addEventListener("DOMContentLoaded", showCards);

// **********************************************My Code******************************************


var initialLoadDogs = [];
var sortedDogs = [];
var filteredDogs = [];
var currentDogs = [];
var dogsDict = {}; // Created dictionary for storing unique dog names in dictionary keys. Needed as get from API duplicate dogs with different image URLs
var loadingSteps=0;


// Dog class
class Dog {
    constructor(name, img, life, weight, bredFor, breedGroup, height, temperament) {
        this.name = name;
        this.img = img;
        this.life=life;
        this.weight=weight;
        this.bredFor = bredFor;
        this.breedGroup = breedGroup;
        this.height = height;
        this.temperament = temperament;
    }
}

//Fetching dogs from thedogapi.com API. Doing 30 get requests, each request 100 dogs.
const fetchDogBreed = async () => {
    for (let i=1; i<=30; i++) {
        loadingSteps=parseInt(100*i/30);
        const responseBreeds = await fetch("https://api.thedogapi.com/v1/images/search?api_key=live_JTPFF0F23xHHEPZVfDYktIsefkwJynxEwBWDXB8wREjTnU5kwbhAcnjcW7QR3sgq&has_breeds=1&page="+i+"&limit=100")
        const dogBreeds = await responseBreeds.json();
        console.log("https://api.thedogapi.com/v1/images/search?api_key=live_JTPFF0F23xHHEPZVfDYktIsefkwJynxEwBWDXB8wREjTnU5kwbhAcnjcW7QR3sgq&has_breeds=1&page="+i+"&limit=100");
      
        for (const dog of dogBreeds) {
            var newDog = new Dog(dog.breeds[0].name, dog.url, dog.breeds[0].life_span, 
                                dog.breeds[0].weight.imperial, dog.breeds[0].bred_for, 
                                dog.breeds[0].breed_group, dog.breeds[0].height.imperial,
                                dog.breeds[0].temperament );
            dogsDict[newDog.name]=newDog; // to store unique dog names
        }
    }

    for (const key in dogsDict) {
        initialLoadDogs.push(dogsDict[key]);
    }
        currentDogs=initialLoadDogs.slice();
    
    showCards(initialLoadDogs);
}

const showCards = async (dogsArr) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
    
    for (let i = 0; i < dogsArr.length; i++) {
        const nextCard = templateCard.cloneNode(true); // Copy the template card
        editCardContent(nextCard, dogsArr[i]); // Edit title and image
        cardContainer.appendChild(nextCard); // Add new card to the container
    }
    // Select the element where you want to display the count
    const searchResultsCountElement = document.getElementById("searchResultsCount");
    searchResultsCountElement.textContent = `Found ${dogsArr.length} results`;
    console.log(dogsArr.length);
}

function editCardContent(card, dog) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = dog.name;

    const cardImage = card.querySelector("img");
    cardImage.src = dog.img;
    cardImage.style.display = "block"; // Ensure image is a block element
    cardImage.style.margin = "0 auto"; // Center the image horizontally
    // cardImage.alt = newTitle + " Poster";

    const cardBullet1 = card.querySelector("#bp1");
    cardBullet1.innerHTML = "<span style='font-weight: bold;'>Life span:</span> " + dog.life;

    const cardBullet2 = card.querySelector("#bp2");
    cardBullet2.innerHTML = "<span style='font-weight: bold;'>Weight range:</span> " + dog.weight + " lb";

    const cardBullet3 = card.querySelector("#bp3");
    cardBullet3.innerHTML = "<span style='font-weight: bold;'>Height range:</span> " + dog.height + " inch";

    const cardBullet4 = card.querySelector("#bp4");
    if (dog.breedGroup==null || dog.breedGroup=="")
        dog.breedGroup = "N/A";
    cardBullet4.innerHTML = "<span style='font-weight: bold;'>Breed group:</span> " + dog.breedGroup;

    const cardBullet5 = card.querySelector("#bp5");
    if (dog.bredFor==null || dog.bredFor=="")
        dog.bredFor = "N/A";
    cardBullet5.innerHTML = "<span style='font-weight: bold;'>Bred for:</span> " + dog.bredFor;
    

    const cardBullet6 = card.querySelector("#bp6");
    if (dog.temperament==null || dog.temperament=="")
        dog.temperament = "N/A";
    cardBullet6.innerHTML = "<span style='font-weight: bold;'>Temperament:</span> " + dog.temperament;

    // You can use console.log to help you debug!
    // View the output by right clicking on your website,
    // select "Inspect", then click on the "Console" tab
    // console.log("new card:", newTitle, "- html: ", card);
}

// Function to sort the cards based on the selected option
function sortCards(sortOrder) {
    if (sortOrder === 'ascending') {
        currentDogs.sort((a, b) => a.name.localeCompare(b.name)); // Sort ascending
    } else {
        currentDogs.sort((a, b) => b.name.localeCompare(a.name)); // Sort descending
    }

    showCards(currentDogs);
}

// Reset filters and show initial loaded dog cards
function reset() {
    document.getElementById('ascending').checked=false;
    document.getElementById('descending').checked=false;
    currentDogs = initialLoadDogs.slice();
    showCards(currentDogs);
}

// Serches keyword in dog name, breed group, bred for and temperament
function search() {
    filteredDogs = [];
    currentDogs = [];
    document.getElementById('ascending').checked=false;
    document.getElementById('descending').checked=false;
    
    // Get the search query from the input field
    const query = document.getElementById('searchInput').value;
    for (let i = 0; i < initialLoadDogs.length; i++) {
        if (initialLoadDogs[i].name.toLowerCase().includes(query.toLowerCase()) || 
            initialLoadDogs[i].temperament.toLowerCase().includes(query.toLowerCase()) || 
            initialLoadDogs[i].bredFor.toLowerCase().includes(query.toLowerCase()) ||
            initialLoadDogs[i].breedGroup.toLowerCase().includes(query.toLowerCase()))
            // console.log(dogs[i].name); // Return index if substring is found
                filteredDogs.push(initialLoadDogs[i]);
        
    }

    currentDogs = filteredDogs;

    // Update the text content of the selected element with the count
    console.log(currentDogs.length);
    // searchResultsCountElement.textContent = `Found ${sortedDog.length} results`;
    showCards(currentDogs);
}

document.addEventListener("DOMContentLoaded", function() {
    const loadingAnimation = document.getElementById('loading-animation');

    // Show loading animation
    loadingAnimation.style.display = 'block';
    
    // Setting interval to run updating loading percentage every half second, loading steps are calculated based on number of requests to API
    const loadingInterval = setInterval(() => {
        if (loadingSteps >= 100) {
            clearInterval(loadingInterval);
        }
        else {
            console.log(loadingSteps);
            updateLoadingPercentage(loadingSteps);  
        }
    }, 500);

    // Function to update loading percentage
    function updateLoadingPercentage(percentage) {
        const loadingPercentageElement = document.getElementById("loading-percentage");
        loadingPercentageElement.textContent = `${percentage}%`;
    }
    fetchDogBreed(); // Loading dogs from theDogapi.com API, does 30 get requests

    // Event listener for radio buttons to detect changes
    document.querySelectorAll('input[name="sortOrder"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const sortOrder = document.querySelector('input[name="sortOrder"]:checked').value;
            sortCards(sortOrder); // Sort cards based on the selected option
        });
    });

    // Trigger search when "Enter" button pressed after typing in search box
    document.getElementById("searchInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            search();
        }
    });
});
// document.addEventListener("DOMContentLoaded", showCards);

// *****************************************End of my Code******************************************

function barkAlert() {
    console.log("Button Clicked!")
    alert("Haf-haf!");
}

function removeLastCard() {
    currentDogs.pop(); // Remove last item in titles array
    showCards(currentDogs); // Call showCards again to refresh
}
