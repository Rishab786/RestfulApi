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
        "https://crudcrud.com/api/7220c17e9d0141679c48a389b8d9061c/Admin",
        obj
      )
      .catch(function (error) {
        console.log(error);
      });
      let list;
      if(category=='Electronic')
      {
        list= document.getElementById("electronic");
         }
      else if(category=='Food')
      {
        list= document.getElementById("food");
      }
      else{
        list= document.getElementById("skincare");
      }
     
    const item = document.createElement("li");
    item.className = "";
    item.innerText = amount + " " + description + " " + category + "  ";
    const deleteBtn = document.createElement("button");
    
    deleteBtn.textContent = "Delete";
    
    item.appendChild(deleteBtn);
    
    list.appendChild(item);
    deleteBtn.onclick = () => {
      deleteData(item.id);
    };

    clear();
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
    .get(
      "https://crudcrud.com/api/7220c17e9d0141679c48a389b8d9061c/Admin"
    )
    .then(function (response) {
      const productData = response.data;
      for (let i = 0; i < productData.length; i++) {
        const amount = productData[i].Amount;
        const description = productData[i].Description;
        const category = productData[i].Category;
        let list;
        if(category=='Electronic')
        {
          list= document.getElementById("electronic");
           }
        else if(category=='Food')
        {
          list= document.getElementById("food");
        }
        else{
          list= document.getElementById("skincare");
        }
        const item = document.createElement("li");
        item.id = productData[i]._id;
        item.className = "";
        item.innerText = amount + " " + description + " " + category + "  ";
        const deleteBtn = document.createElement("button");
        
        deleteBtn.textContent = "Delete";
        item.appendChild(deleteBtn);
        list.appendChild(item);
        deleteBtn.onclick = () => {
          deleteData(item.id);
        };
       
      }
    });
}
function deleteData(id) {
  const URL = `https://crudcrud.com/api/7220c17e9d0141679c48a389b8d9061c/Admin/${id}`;

  axios
    .delete(URL)
    .then(function () {
      console.log("deleted Successfully");
    })
    .catch(function (err) {
      console.log(err);
    });
}

