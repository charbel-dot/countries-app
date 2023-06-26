const countriesContainer = document.querySelector(".countries-container");
const countriesSearchInput = document.querySelector(".search-countries");

const URL = "https://restcountries.com/v3.1/all";

// Fetch request
const fetchData = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => showData(data))
    .catch((err) => console.log(err));
};

// Call fetch on page load
window.onload = () => {
  fetchData();
};

const createFlag = (source) => {
  const flag = document.createElement("img");
  flag.classList.add("flags");
  flag.src = source;
  flag.loading = "lazy";
  return flag;
};

// Show data on the page
const showData = (data) => {
  // Sorting countries a-z
  data.sort((a, b) => {
    var nameA = a.name.common.toUpperCase();
    var nameB = b.name.common.toUpperCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });

  // Adding countries
  data.forEach((country) => {
    let flagsPng = country["flags"]["png"];
    let name = country["name"]["common"];
    // let languages = country["languages"];
    // let capital = country["capital"];

    const flagsContainer = document.createElement("div");
    flagsContainer.classList.add("flags-container");
    flagsContainer.append(createFlag(flagsPng));

    // Search mechanism for countries
    countriesSearchInput.addEventListener("input", (e) => {
      let value = e.target.value.toLowerCase();
      const isVisible = name.toLowerCase().includes(value);

      isVisible
        ? flagsContainer.classList.remove("hide")
        : flagsContainer.classList.add("hide");
    });

    // flagsContainer.addEventListener("click", () => {
    //   // var googleLink = `https://www.google.com/search?q=${name}`;
    //   // window.location.href = googleLink;
    // let countryLanguages = Object.values(languages).join(", ");
    // });

    const flagName = document.createElement("span");
    flagName.textContent = name;
    flagName.classList.add("country-name");
    flagsContainer.append(flagName);

    countriesContainer.append(flagsContainer);
  });
};
