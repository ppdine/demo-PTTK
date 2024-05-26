document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});

let products = [
  {
    id: 1,
    name: "Nước Hoa Chanel",
    price: "1500$",
    description: "Hương thơm quyến rũ",
    image: "anh/1.png",
  },
  {
    id: 2,
    name: "Son Môi Dior",
    price: "1000$",
    description: "Trải nghiệm sự quyến rũ và thanh lịch",
    image: "anh/2.png",
  },
  {
    id: 3,
    name: "Bộ Quà Tặng",
    price: "2000$",
    description: "Quà tặng hoàn hảo dành cho người thân",
    image: "anh/3.png",
  },
  {
    id: 4,
    name: "Chanel No.5",
    price: "4000$",
    description: "Hương thơm nồng nàn và quyến rũ",
    image: "anh/4.png",
  },
  {
    id: 5,
    name: "Dior Jadore",
    price: "3000$",
    description: "Hương thơm hoa cỏ sang trọng",
    image: "anh/5.png",
  },
  {
    id: 6,
    name: "Tom Ford Black Orchid",
    price: "2000$",
    description: "Hương thơm mạnh mẽ và gợi cảm",
    image: "anh/6.png",
  },
];

function renderProducts() {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = "";
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "product-item";
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>Giá : ${product.price}</p>
      <button onclick="showDescription('${product.name}', '${product.description}')">Mua Ngay</button>
      <button class="edit-button" onclick="openEditProductDetailsModal(${product.id})" style="display: none;">Chỉnh Sửa <i class="fas fa-edit"></i></button>
      <button class="delete-button" onclick="deleteProduct(${product.id})" style="display: none;">Xóa <i class="fas fa-trash"></i></button>
    `;
    productGrid.appendChild(productElement);
  });
}

function showDescription(title, description) {
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-description").innerText = description;
  document.getElementById("description-modal").style.display = "flex";
  // khi người dùng bấm OK ẩn poup tại mua
  document.getElementById("buy-button").addEventListener("click", function () {
    closeModal();
  });
}

function closeModal() {
  document.getElementById("description-modal").style.display = "none";
}

function toggleAddProductForm() {
  const formContainer = document.getElementById("add-product-form-container");
  formContainer.style.display =
    formContainer.style.display === "none" ? "block" : "none";
}

function closeAddProductModal() {
  document.getElementById("add-product-modal").style.display = "none";
}

function openEditProductModal() {
  document.getElementById("edit-product-modal").style.display = "flex";
}

function closeEditProductModal() {
  document.getElementById("edit-product-modal").style.display = "none";
}

function openEditPopup() {
  document.getElementById("edit-popup-modal").style.display = "flex";
}

function closeEditPopup() {
  document.getElementById("edit-popup-modal").style.display = "none";
}

document
  .getElementById("add-product-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const description = document.getElementById("product-description").value;
    const image = document.getElementById("product-image").value;

    const newProduct = {
      id: products.length + 1,
      name,
      price,
      description,
      image,
    };

    products.push(newProduct);
    renderProducts();
    toggleAddProductForm();
    this.reset();
  });

function openEditProductDetailsModal(productId) {
  const product = products.find((product) => product.id === productId);
  if (product) {
    document.getElementById("edit-product-id").value = product.id;
    document.getElementById("edit-product-name").value = product.name;
    document.getElementById("edit-product-price").value = product.price;
    document.getElementById("edit-product-description").value =
      product.description;
    document.getElementById("edit-product-image").value = product.image;
    openEditProductModal();
  }
}

document
  .getElementById("edit-product-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const id = parseInt(document.getElementById("edit-product-id").value);
    const name = document.getElementById("edit-product-name").value;
    const price = document.getElementById("edit-product-price").value;
    const description = document.getElementById(
      "edit-product-description"
    ).value;
    const image = document.getElementById("edit-product-image").value;

    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      products[productIndex] = { id, name, price, description, image };
      renderProducts();
      closeEditProductModal();
    }
  });

function handleEditProductButtonClick() {
  const editActions = document.getElementById("edit-actions");
  const isDisplayed = editActions.style.display === "block";
  editActions.style.display = isDisplayed ? "none" : "block";
  if (!isDisplayed) {
    toggleEditButtons(false);
    toggleDeleteButtons(false);
  }
}

function toggleEditDeleteMode() {
  toggleEditButtons(true);
  toggleDeleteButtons(true);
  closeEditPopup(); // Close the edit popup modal when user chooses edit/delete mode
}

function toggleEditButtons(show) {
  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button) => {
    button.style.display = show ? "inline-block" : "none";
  });
}

function toggleDeleteButtons(show) {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.style.display = show ? "inline-block" : "none";
  });
}

function deleteProduct(productId) {
  products = products.filter((product) => product.id !== productId);
  renderProducts();
}

