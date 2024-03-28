const wrapper = document.querySelector(".wrapper");
const API_URL = "https://fakestoreapi.com/users";

const loading = document.querySelector(".loading");
const loadingCards = document.querySelector(".loading-cards");
let arr = Array(10).fill("");
let fragment = document.createDocumentFragment();
arr.forEach((el, i) => {
  let div = document.createElement("div");
  div.classList.add("loading-card");
  div.innerHTML = `
  <div class="loading-card">
    <div class="div1"></div>
    <div class="div2"></div>
    <div class="div3"></div>
    <div class="divs">
      <div class="div4"></div>
      <div class="div5"></div>
    </div>
  </div>
  `;
  fragment.appendChild(div);
});
loadingCards.append(fragment);

async function fetchData(api) {
  let getData = await fetch(api);
  getData
    .json()
    .then((res) => CreateCard(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
    });
}
fetchData(API_URL);

function CreateCard(data) {
  while (wrapper.firstChild) {
    wrapper.firstChild.remove();
  }
  let fragment = document.createDocumentFragment();
  data.forEach((product) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
<div data-id=${product.id}>
<div class="elips"></div>
<div class="usernames">
  <h1 class="user__name">${product.name.firstname}</h1>
  <h1 class="last__name">${product.name.lastname}</h1>
</div>
  <p class="email">${product.email}</p>
  <p class="adress">Adress:${product.address.city}</p>
<p class="phone">Phone:${product.phone}</p>
<div class="card-btns">
  <button name="product-wish">Like</button>
  <button>Cart</button>
</div>
</div>
    `;
    fragment.appendChild(card);
  });
  wrapper.appendChild(fragment);
}

const SingleRoate = (id) => {
  window.open(`/pages/product.html?id=${id}`, "_self");
};

const setWish = async (id) => {
  let getData = await fetch(`${API_URL}/${id}`);
  getData
    .json()
    .then((res) => {
      let wishes = JSON.parse(localStorage.getItem("wishes")) || [];
      let index = wishes.findIndex((el) => el.id === +id);
      if (index < 0) {
        localStorage.setItem("wishes", JSON.stringify([...wishes, res]));
      }
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
    });
};

wrapper.addEventListener("click", (e) => {
  let { name } = e.target;
  if (name === "product-img") {
    let id = e.target.closest("[data-id]").dataset.id;
    SingleRoate(id);
  } else if (name === "product-wish") {
    console.log("OK");
    let id = e.target.closest("[data-id]").dataset.id;
    setWish(id);
  }
});

// ============= Navbar toggle START ================
const navbarCollection = document.querySelector(".navbar__collection");
const navbarMenu = document.querySelector(".navbar__menu");

navbarMenu.addEventListener("click", () => {
  navbarCollection.classList.toggle("show");
});
// ============= Navbar toggle END ================
