const options = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer 563492ad6f917000010000012b1c469382154555a6fb1dcefbedec69",
  },
};

let queryPrimary = "cat";
let querySecondary = "dog";
let notBeenClicked = true;

const secondButtons = document.querySelectorAll(".btn-group > button:nth-child(2)")
const CARDS = document.querySelectorAll(".card")
for (let i = 0; i < secondButtons.length; i++) {
    secondButtons[i].innerHTML = "Hide"
    secondButtons[i].addEventListener("click", () => {
        CARDS[i].classList.add("d-none");
    })
}

const setButtons = document.querySelectorAll(".input-group-append > btn");

const setQuery = num => {
    if (num == 1) {
        queryPrimary = document.getElementById("queryInput").value;
        document.getElementById("queryInput").value = "";
        alert("Query1 set to '" + queryPrimary + "'");
    } else {
        querySecondary = document.getElementById("queryInput").value;
        document.getElementById("queryInput").value = "";
        alert("Query2 set to '" + querySecondary + "'");
    }
}

const picID = document.querySelectorAll(".text-muted")

const loadPictures = (query) => {
  fetch("https://api.pexels.com/v1/search?query=" + query, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const pictures = data.photos;
      console.log(pictures);

      if (notBeenClicked) {
        const CARD_IMGS = document.querySelectorAll("svg");
        for (let i = 1; i < CARD_IMGS.length; i++) {
          const NEW_IMAGE = document.createElement("img");
          NEW_IMAGE.src = pictures[i].src.large;
          picID[i+1].innerHTML = pictures[i].id.toString();
          CARD_IMGS[i].parentNode.replaceChild(NEW_IMAGE, CARD_IMGS[i]);
        }
        
      } else {
        const IMAGES = document.getElementsByTagName("img");
        for (let v = 0; v < IMAGES.length; v++) {
          IMAGES[v].src = pictures[v].src.large;
          picID[v+2].innerHTML = pictures[v].id.toString();
        }
      }
      notBeenClicked = false;

    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};
