
async function getCategories() {
    let url = "https://northwind.now.sh/api/categories";

    try {
        let res = await fetch(url);
        return await res.json();

    }
    catch {
        console.log(console.error);
    }
}

async function renderCategories() {
    let categories = await getCategories();

    let html = "";
    categories.forEach(category => {//` altgr + , , basılacak

        let htmlSegment = `<div class="user"><h2>${category.id} ${category.name} ${category.description}</h2></div>`;

        html += htmlSegment;
    });

    let container = document.querySelector(".container");
    container.innerHTML = html;
}

async function getProducts() {
    let url = "https://northwind.vercel.app/api/products"
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(console.error);
    }
}

async function getSuppliers() {
    let url = "https://northwind.vercel.app/api/suppliers"
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(console.error);
    }
}

async function renderProducts() {
    let products = await getProducts();

    let html = "";

    let categories = await getCategories();

    let suppliers = await getSuppliers();

    html = "<table>";
    html += "<tr><th>ID</th><th>Product Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Supplier</th></tr>";


    products.forEach(product => {

        let category = categories.find(c => c.id === product.categoryId);

        let supplier = suppliers.find(s => s.id === product.supplierId);

        let stockColor = 'snow';
        if (product.unitsInStock < 10) {
            stockColor = 'red';
        } else if (product.unitsInStock < 20) {
            stockColor = 'yellow';
        } else {
            stockColor = 'green';
        }

        htmlSegment = `<tr style="background-color: ${stockColor};"><td>${product.id}</td>
    <td>${product.name}</td>
    <td>${category ? category.name : 'N/A'}</td>
    <td>${product.unitPrice}</td>
    <td>${product.unitsInStock}</td>
    <td>${supplier ? supplier.companyName : 'N/A'}</td>
</tr>`;

        html += htmlSegment;
    });
    html += "</table>";
    let container = document.querySelector(".container");
    container.innerHTML = html;
}



renderProducts();