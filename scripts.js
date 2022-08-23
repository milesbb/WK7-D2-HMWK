// setting http object
const options = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer 563492ad6f917000010000012b1c469382154555a6fb1dcefbedec69",
  },
};

// assigning initial values to query variables
let queryPrimary = "cat";
let querySecondary = "dog";

// checks if buttons have been clicked before
let notBeenClicked = true;

const MODAL_IMAGE = document.querySelectorAll(".modal-body > img")[0];
const viewButtons = document.querySelectorAll(
  ".btn-group > button:nth-child(1)"
);

const secondButtons = document.querySelectorAll(
  ".btn-group > button:nth-child(2)"
);
const CARDS = document.querySelectorAll(".card");
// HIDE button functionality, hides card when clicked
for (let i = 0; i < secondButtons.length; i++) {
  secondButtons[i].innerHTML = "Hide";
  secondButtons[i].addEventListener("click", () => {
    CARDS[i].classList.add("d-none");
  });
}

const setButtons = document.querySelectorAll(".input-group-append > btn");
// changes query variables to contents of search field on button click
const setQuery = (num) => {
  if (num == 1) {
    queryPrimary = document.getElementById("queryInput").value;
    document.getElementById("queryInput").value = "";
    alert("Query1 set to '" + queryPrimary + "'");
  } else {
    querySecondary = document.getElementById("queryInput").value;
    document.getElementById("queryInput").value = "";
    alert("Query2 set to '" + querySecondary + "'");
  }
};

const picID = document.querySelectorAll(".text-muted");

// temporary Alert function
const tempAlert = (msg, duration) => {
  var el = document.createElement("div");
  el.setAttribute(
    "style",
    "position:fixed;top:0;left:50%;background-color:white;"
  );
  el.innerHTML = msg;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration);
  document.body.appendChild(el);
};

// Main Picture Load Function, sends GET request and uses response to set card pics and IDs
const loadPictures = (query) => {
  fetch("https://api.pexels.com/v1/search?query=" + query, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const pictures = data.photos;
      console.log(pictures);

      // URL and ID Map and Reduce methods q11,13
      let URLArray = pictures.map((pics) => {
        return pics.url;
      });
      let IDArray = pictures.map((pics) => {
        return pics.id;
      });

      console.log("URL Array: ", URLArray);
      console.log("ID Array: ", IDArray);
      let totalID = IDArray.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      );
      console.log("Sum of all ID's: " + totalID.toString());


    //   Ex 12, Filtered Pics
      let newPictures = pictures.filter(checkAuthor);

      function checkAuthor (pics) {
        return (pics.photographer == "Pixabay");
      }

      console.log("Filtered Array:", newPictures);

      //   sets card photos
      if (notBeenClicked) {
        // runs if not been clicked before, SVG -> IMG
        const CARD_IMGS = document.querySelectorAll("svg");
        for (let i = 1; i < CARD_IMGS.length; i++) {
          const NEW_IMAGE = document.createElement("img");
          NEW_IMAGE.src = pictures[i].src.medium;

          //   sets ID string
          picID[i + 1].innerHTML = pictures[i].id.toString();

          //   replaces SVGs with IMG elements
          CARD_IMGS[i].parentNode.replaceChild(NEW_IMAGE, CARD_IMGS[i]);

          //   Adds event listeners to VIEW buttons, sets modal photo
          viewButtons[i - 1].addEventListener("click", () => {
            MODAL_IMAGE.src = NEW_IMAGE.src;
          });
        }
      } else {
        // runs if been clicked before, IMG -> IMG
        const IMAGES = document.getElementsByTagName("img");
        for (let v = 0; v < IMAGES.length; v++) {
          // replaces IMG src
          IMAGES[v].src = pictures[v].src.medium;

          //   sets ID string
          picID[v + 2].innerHTML = pictures[v].id.toString();

          //   Adds event listeners to VIEW buttons, sets modal photo
          viewButtons[v].addEventListener("click", () => {
            MODAL_IMAGE.src = IMAGES[v].src;
          });
        }
      }

      notBeenClicked = false;

      //   runs temporary alert code
      tempAlert(
        pictures.length.toString() +
          " images loaded, 9 displayed, query: " +
          query,
        5000
      );
    })
    .catch((err) => {
      // error catch
      console.log("ERROR:", err.message);
    });
};

// Forest Picture carousel fetch code
const CAROUSEL_IMAGES = document.querySelectorAll(".carousel-item > img");

fetch("https://api.pexels.com/v1/search?query=forest", options)
  .then((response) => response.json())
  .then((data) => {
    const forestPics = data.photos;
    // sets carousel pictures
    for (let i = 0; i < CAROUSEL_IMAGES.length; i++) {
      CAROUSEL_IMAGES[i].src = forestPics[i].src.landscape;
    }
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });
