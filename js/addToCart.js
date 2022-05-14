// const total = [];
(function () {
  const cartInfo = document.getElementById("cart-info");
  console.log(cartInfo);
  const cart = document.getElementById("myDropdown");
  cartInfo.addEventListener("click", (e) => {
    e.preventDefault();
    cart.classList.toggle("show");
  });
  cart.addEventListener("click", (e) => {
    e.stopPropagation();
  });
})();
(function () {
  const cartBtn = document.querySelectorAll(".btn-AddCart");
  cartBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.parentElement.classList.contains("content")) {
        let fullPath =
          e.target.parentElement.previousElementSibling.getAttribute("src") ||
          e.target.parentElement.previousElementSibling.firstElementChild.getAttribute(
            "src"
          );
        const item = {};
        item.img = fullPath;
        let name = e.target.parentElement.firstElementChild.textContent;
        let price =
          e.target.parentElement.children[1].firstElementChild.textContent ||
          e.target.parentElement.children[3].firstElementChild.textContent;
        let firstPrice = price.slice(1).trim();
        item.name = name;
        item.price = firstPrice;
        console.log(item);
        const cart = document.getElementById("myDropdown");
        let html = `<div class="cart-item">
          <img src=${item.img} style="border: 2px solid #ddd;
         border-radius: 5px;
             box-shadow: 0px 0px 2px 0px #ccc;height: 50px;
             width: 100px;
             object-fit: contain;" alt=${item.img} >
            <div style="display: flex;
             flex-direction: column;">
           <span class="name-item">${item.name}</span>
          <span class="price-item">$<span class="price-cart">${item.price}</span></span>
            </div>
             <i class="fas fa-trash fa-xl"></i>
         </div>`;
        cart.insertAdjacentHTML("afterbegin", html);
        showTotals();

        Swal.fire({
          position: "top-end",
          padding: "0",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        const deleteItem = document.querySelectorAll(".fa-trash");
        const deleteAllItem = document.querySelector(".clear_Cart");
        const deleteAllItemInCart = document.querySelectorAll(".cart-item");
        deleteItem.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            e.target.parentElement.remove();
            showTotals();
          });
        });

        deleteAllItem.addEventListener("click", (e) => {
          e.stopPropagation();
          deleteAllItemInCart.forEach((items) => {
            items.remove();
            showTotals();
          });
        });
      }
    });
  });
  function showTotals() {
    let total = 0;
    const items = document.querySelectorAll(".price-cart");
    const totalPrice = document.querySelector(".total");
    items.forEach(function (item) {
      let total_content = parseFloat(item.textContent);
      total += total_content;
    });
    // const totalMoney = total.reduce((total, item) => {
    //   total += item;
    //   return total;
    // }, 0);
    let finalMoney = total.toFixed(2);
    totalPrice.innerHTML = finalMoney;
  }
})();

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
