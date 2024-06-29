var productNameInput = document.getElementById('ProductNameInput');
var productPriceInput = document.getElementById('productPriceInput');
var productCategoryInput = document.getElementById('productCategoryInput');
var productDescInput = document.getElementById('productDescInput');
var productIndexInput = document.getElementById('productIndexInput');
var productButton = document.getElementById('productButton');

var ProductContainer = [];

if (localStorage.getItem('product') != null) {
    ProductContainer = JSON.parse(localStorage.getItem('product'));
    DisplayInTable();
}

function clearform() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
    productIndexInput.value = "";
    productButton.textContent = "Add Product";
    productButton.onclick = Addproduct;
}

function DisplayInTable() {
    var cartoona = ``;
    for (var i = 0; i < ProductContainer.length; i++) {
        cartoona += `<tr>
            <td>${i}</td>
            <td>${ProductContainer[i].name}</td>
            <td>${ProductContainer[i].price}</td>
            <td>${ProductContainer[i].category}</td>
            <td>${ProductContainer[i].description}</td>
            <td><button onclick="updateitem(${i})" class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="deleteproduct(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>`;
    }
    document.getElementById('TableBody').innerHTML = cartoona;
}

function Addproduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescInput.value
    };
    
    
    if (productIndexInput.value === "") {
    
        ProductContainer.push(product);
    } else {
    
        ProductContainer[productIndexInput.value] = product;
    }

    localStorage.setItem('product', JSON.stringify(ProductContainer));
    DisplayInTable();
    clearform();
}

function deleteproduct(productIndex) {
    ProductContainer.splice(productIndex, 1);
    localStorage.setItem('product', JSON.stringify(ProductContainer));
    DisplayInTable();
}

function searchproduct(searchItem) {
    var notFound = "not found";
    var cartoona = ``;

    for (var i = 0; i < ProductContainer.length; i++) {
        if (ProductContainer[i].name.toLowerCase().includes(searchItem.toLowerCase())) {
            cartoona += `<tr>
                <td>${i}</td>
                <td>${ProductContainer[i].name}</td>
                <td>${ProductContainer[i].price}</td>
                <td>${ProductContainer[i].category}</td>
                <td>${ProductContainer[i].description}</td>
                <td><button onclick="updateitem(${i})" class="btn btn-outline-warning">Update</button></td>
                <td><button onclick="deleteproduct(${i})" class="btn btn-outline-danger">Delete</button></td>
            </tr>`;
        } else {
            document.getElementById('searchinput').innerHTML = notFound;
        }
    }
    document.getElementById('TableBody').innerHTML = cartoona;
}

function updateitem(indexItem) {
    productNameInput.value = ProductContainer[indexItem].name;
    productPriceInput.value = ProductContainer[indexItem].price;
    productCategoryInput.value = ProductContainer[indexItem].category;
    productDescInput.value = ProductContainer[indexItem].description;
    productIndexInput.value = indexItem;
    productButton.textContent = "Update Product";
    productButton.onclick = Addproduct;
}