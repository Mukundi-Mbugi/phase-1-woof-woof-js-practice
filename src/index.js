function dognames() {
  document.getElementById("dog-bar").innerHTML = "";
  return fetch("http://localhost:3000/pups")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((dataElement) => {
        let parentDiv = document.getElementById("dog-bar");
        let btn = document.createElement("button");
        btn.innerHTML = `${dataElement.name}`;
        parentDiv.appendChild(btn);
        btn.addEventListener("click", () => {
          document.getElementById("dog-info").innerHTML = "";
          let dogDescription = document.getElementById("dog-info");

          let img = document.createElement("div");

          let good;
          if (dataElement.isGoodDog === true) {
            good = "good dog";
          } else {
            good = "bad dog";
          }

          img.innerHTML = `<img src = '${dataElement.image}'>
               <h3> ${dataElement.name}</h3>
               <button> ${good} </button>
               `;
          dogDescription.appendChild(img);
        });
      });
    });
}

document.addEventListener("DOMContentLoaded", displayInfo);

function displayInfo() {
  dognames();
  let filterButton = document.getElementById("good-dog-filter");

  filterButton.addEventListener("click", () => {
    document.getElementById("dog-bar").innerHTML = "";

    if (filterButton.innerText === "Filter good dogs: OFF") {
      filterButton.innerText = "Filter good dogs: ON";
      document.getElementById("dog-info").innerHTML = "";

      fetch("http://localhost:3000/pups")
        .then((res) => res.json())
        .then((data) => {
          let newArray = [];
          function filterData() {
            data.forEach((dataElement) => {
              if (dataElement.isGoodDog === true) {
                newArray.push(dataElement);
              }
            });
          }
          filterData();

          newArray.forEach((dataElement) => {
            let parentDiv = document.getElementById("dog-bar");
            let btn = document.createElement("button");
            btn.innerHTML = `${dataElement.name}`;
            parentDiv.appendChild(btn);
            btn.addEventListener("click", () => {
              document.getElementById("dog-info").innerHTML = "";
              let dogDescription = document.getElementById("dog-info");

              let dogImage = document.createElement("div");

              let good = "Good Dog";

              dogImage.innerHTML = `<img src = '${dataElement.image}'>
                       <h3> ${dataElement.name}</h3>
                       <button> ${good} </button>
                       `;
              dogDescription.appendChild(dogImage);
            });
          });
        });
    } else {
      document.getElementById("dog-info").innerHTML = "";
      filterButton.innerText = "Filter good dogs: OFF";
      dognames();
    }
  });
}
