let wishes = JSON.parse(localStorage.getItem("wishes"));
let wrapper = document.querySelector(".wrapper");

function CreateWishes(data) {
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
    <button name="product-wish">Dislike</button>
    <button>Cart</button>
  </div>
  </div>
      `;
    fragment.appendChild(card);
  });
  wrapper.appendChild(fragment);
}
CreateWishes(wishes);

const removeWishes = (id) => {
  let filterData = wishes.filter((el) => el.id !== +id);
  localStorage.setItem("wishes", JSON.stringify(filterData));
  CreateWishes(filterData);
  window.location.reload();
};

wrapper.addEventListener("click", (e) => {
  if (e.target.name === "product-wish") {
    let id = e.target.closest("[data-id]").dataset.id;
    removeWishes(id);
  }
});

// ============= Navbar toggle START ================
const navbarCollection = document.querySelector(".navbar__collection");
const navbarMenu = document.querySelector(".navbar__menu");

navbarMenu.addEventListener("click", () => {
  navbarCollection.classList.toggle("show");
});
// ============= Navbar toggle END ================
