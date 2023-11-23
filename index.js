const form = document.getElementById("btn");
form.addEventListener("click", AddProduct);
function AddProduct(e) {
  e.preventDefault();
  const amount = document.getElementById("amt").value;
  const description = document.getElementById("desc").value;
  const category = document.getElementById("category").value;
  if (amount.trim() === "") {
    alert("Please Enter Valid Amount");
  } else if (description.trim() === "") {
    alert("Please Enter Valid Text");
  } else if (category == "Select Category") {
    alert("Please Select Valid Category");
  } else {
    const obj = {
      Amount: amount,
      Description: description,
      Category: category,
    };
    axios
      .post(
        "https://crudcrud.com/api/2dea1fdbe45145a9b2f0d47d174f42a3/Admin",
        obj
      )
      .then(function (response) {
        createElement(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }
}
function clear() {
  document.getElementById("amt").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("category").value = "Select Category";
}

window.addEventListener("DOMContentLoaded", display);

function display() {
  axios
    .get("https://crudcrud.com/api/2dea1fdbe45145a9b2f0d47d174f42a3/Admin")
    .then(function (response) {
      const productData = response.data;
      for (let i = 0; i < productData.length; i++) {
        createElement(productData[i]);
      }
    });
}
function deleteData(id) {
  axios
    .delete(
      `https://crudcrud.com/api/2dea1fdbe45145a9b2f0d47d174f42a3/Admin/${id}`
    )
    .then(function (response) {
      console.log(response);
      console.log(id);
    })
    .catch(function (err) {
      console.log(err);
    });
}
function createElement(user) {
  let list;
  const amount = user.Amount;
  const description = user.Description;
  const category = user.Category;
  if (category == "Electronic") {
    list = document.getElementById("electronic");
  } else if (category == "Food") {
    list = document.getElementById("food");
  } else {
    list = document.getElementById("skincare");
  }

  const item = document.createElement("li");
  item.id = user._id;
  item.innerText = amount + " " + description + " " + category + "  ";
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "Delete";

  item.appendChild(deleteBtn);

  list.appendChild(item);
  //deleteBtn.setAttribute("onclick",deleteData(user._id));
  deleteBtn.onclick = () => {
    deleteData(user._id);
  };
}
