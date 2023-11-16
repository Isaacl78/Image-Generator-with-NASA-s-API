let dateinject = document.getElementById("dateInject");              //Allows the dateInject to work with the html Id by the dame name
const buttons = document.querySelectorAll("input[type='button']");   //Allows the funtion( in html)bottons to work with the different scrips

//The Url is split to allow to make changes in the date and other's.
let apiName = "https://api.nasa.gov" 
let apiEndpoint = "/planetary/apod?" 
let apiDate = "date="                
let apiKey = "&api_key=3y6F9kkyzGbi1VIqRSjj10D1IuHHJcTlHSw4lSXP" 
let Day = new Date()                 //Creat and element Date to work with the Date Fuction
let currentImageElement = null;      // Store a reference to the current image element

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentImageElement) {
            // Remove the previous image element
            dateinject.removeChild(currentImageElement);
        }

        if (button.value === "Today's Image") {
            fetchFunction(apiName + apiEndpoint + apiDate + currentDayImage() + apiKey);
        } else if (button.value === "Random Image") {
            fetchFunction(apiName + apiEndpoint + apiDate + randomImage() + apiKey);
        }
    });
});

async function fetchFunction(url)
{
    const response = await fetch(url)
    if(response.ok)
    {
        let jsonData = await response.json();
            displayData(jsonData)
    }
}

function displayData(data){
    let img = document.createElement("img");
    img.setAttribute('src', data.url);
    img.className = "img-fluid maxHeigh";

    // Store the reference to the current image element
    currentImageElement = img;

    dateinject.appendChild(img);
}

function currentDayImage(){     //This function get the current day.
    let currentDay = Day.getFullYear() + "-" + Day.getMonth() + "-" + Day.getDate()
    return currentDay
}

function randomImage(){        //This funtion get a random day(With it's year limit 2000-01-01 - current)
    let genereteRandomDay = Math.floor(getRandomArbitrary(1, 31))
    let genereteRandomMonth = Math.floor(getRandomArbitrary(1, 13))
    let genereteRandomYear = Math.floor(getRandomArbitrary(0, 24))
    let randomday = "20" + test() + "-" + genereteRandomMonth + "-" + genereteRandomDay
    
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function test(){
        function isSingleDigit(value) {
            return String(value).length === 1;
        }
        if (isSingleDigit(genereteRandomYear)){
            return "0" + genereteRandomYear
        }
        else {
            return genereteRandomYear
        }
    }
    return randomday
}