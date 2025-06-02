const gallerySection = document.querySelector(".projects");
const gallery = document.querySelector(".projects__gallery");
//Data of all gallery photos
// name - file name
// caption - description in lightbox popup

const projects = [
  { name: "Photo1-270", caption: "Fajne zdjecie" },
  { name: "Photo1-271", caption: "Fajne zdjecie" },
  { name: "Photo1-272", caption: "Fajne zdjecie" },
  { name: "Photo1-273", caption: "Fajne zdjecie" },
  { name: "Photo1-274", caption: "Fajne zdjecie" },
  { name: "Photo1-275", caption: "Fajne zdjecie" },
  { name: "Photo1-277", caption: "Fajne zdjecie" },
  { name: "Photo1-270", caption: "Fajne zdjecie" },
  { name: "Photo1-271", caption: "Fajne zdjecie" },
  { name: "Photo1-272", caption: "Fajne zdjecie" },
  { name: "Photo1-273", caption: "Fajne zdjecie" },
  { name: "Photo1-274", caption: "Fajne zdjecie" },
  { name: "Photo1-275", caption: "Fajne zdjecie" },
  { name: "Photo1-277", caption: "Fajne zdjecie" },
  { name: "Photo1-270", caption: "Fajne zdjecie" },
  { name: "Photo1-271", caption: "Fajne zdjecie" },
  { name: "Photo1-272", caption: "Fajne zdjecie" },
  { name: "Photo1-273", caption: "Fajne zdjecie" },
  { name: "Photo1-274", caption: "Fajne zdjecie" },
  { name: "Photo1-275", caption: "Fajne zdjecie" },
  { name: "Photo1-277", caption: "Fajne zdjecie" },
];

projects.forEach((image) => {
  let tempdiv = document.createElement("div");
  tempdiv.classList.add("gallery__item");
  gallery.appendChild(tempdiv);
  let img = document.createElement("img");
  img.src = `./assets/images/projects/${image.name}.png`;
  img.classList.add("gallery__item-img");
  // img.width = "200";
  // img.height = "200";
  img.setAttribute("data-imagebox", "projects");
  img.setAttribute("data-imagebox-caption", `${image.caption}`);
  tempdiv.appendChild(img);
});

const macy = Macy({
  container: "#projects__gallery",
  trueOrder: false,
  waitForImages: false,
  margin: 35,
  columns: 3,
  breakAt: {
    1440: 3,
    940: 2,
  },
});

// console.log(macy);

const galleryExpand = document.querySelector(".projects__gallery-expand");
galleryExpand.addEventListener("click", () => {
  toggleExpand(galleryExpand);
});

// const gallerySection = document.querySelector(".projects__gallery");
const ins = document.querySelector(".gallery-mask");

function toggleExpand(div) {
  if (div.classList.contains("ar-down")) {
    //Expanding
    div.classList.remove("ar-down");
    div.classList.add("ar-up");
    div.classList.add("btn-beige");
    galleryExpand.textContent = "Zwiń";
    gallery.classList.remove("projects__gallery-closed");
    ins.classList.remove("gallery-mask-closed");
    ins.style.height = macy.rows[0] + "px";
    console.log(macy.rows[0]);
  } else {
    //Collapsing
    div.classList.remove("ar-up");
    div.classList.remove("btn-beige");
    div.classList.add("ar-down");
    galleryExpand.textContent = "Rozwiń";
    gallery.classList.add("projects__gallery-closed");
    ins.classList.add("gallery-mask-closed");
    ins.style.height = "1300px";
    window.scrollTo({ top: gallerySection.offsetTop, behavior: "instant" });
  }
}

function scrollPage(div) {
  let divPlace = document.querySelector(`.${div}`);
  window.scrollTo({ top: divPlace.offsetTop, behavior: "smooth" });
}
