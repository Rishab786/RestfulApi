const price = document.getElementById("price");
const product = document.getElementById("product");
const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const foodItems = document.getElementById("food");
const skinCareItems = document.getElementById("skincare");
const electronicItems = document.getElementById("electronic");
addBtn.addEventListener("click", function () {
  const myObj = {
    Price: price.value,
    Product: product.value,
    Category: category.value,
  };

  if (myObj.Price <= 0) {
    alert("please enter correct price");
  } else if (myObj.Product === "") {
    alert("please enter a product name");
  } else if (myObj.Category === "" || myObj.Category === "Select Category") {
    alert("please select a category");
  } else {
    saveData(myObj);
    clear();
  }
});
const saveData = (myObj) => {
  axios
    .post(
      "https://crudcrud.com/api/595c94b108e8488599d651748ebe2a4f/Admin",
      myObj
    )
    .then((res) => {
      createElement(res.data);
    })
    .catch((err) => console.log(err));
};

const createElement = (user) => {
  const li = document.createElement("li");
  li.id = user._id;
  li.innerText = `${user.Price} -> ${user.Product} -> ${user.Category} `;
  const deleteBtn = document.createElement("button");

  deleteBtn.appendChild(document.createTextNode("Delete Product"));
  li.append(deleteBtn);
  switch (user.Category) {
    case "Electronics":
      electronicItems.appendChild(li);
      break;
    case "Food":
      foodItems.appendChild(li);
      break;
    case "SkinCare":
      skinCareItems.appendChild(li);
  }
  deleteElement(deleteBtn, user, li);
};
const deleteElement = (deleteBtn, user, li) => {
  deleteBtn.onclick = () => {
    let userId = user._id;
    if (confirm("Are You Sure?")) {
      let element = document.getElementById(`${userId}`);
      element.remove();
      deleteData(userId);
    }
  };
};

const deleteData = (id) => {
  axios
    .delete(
      `https://crudcrud.com/api/595c94b108e8488599d651748ebe2a4f/Admin/${id}`
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};
const displayData = () => {
  axios
    .get("https://crudcrud.com/api/595c94b108e8488599d651748ebe2a4f/Admin")
    .then((res) => {
      res.data.forEach((element) => {
        createElement(element);
      });
    })
    .catch((err) => console.log(err));
};
function clear() {
  price.value = "";
  product.value = "";
  category.value = "";
}

displayData();
