
// =====================================
// AGRO BILLING APP V4
// app.js - PART 1
// =====================================

// ---------------------------
// LOCAL STORAGE DATABASE
// ---------------------------

const DB = {

getProducts() {
return JSON.parse(
localStorage.getItem("products") || "[]"
);
},

saveProducts(data) {
localStorage.setItem(
"products",
JSON.stringify(data)
);
},

getCustomers() {
return JSON.parse(
localStorage.getItem("customers") || "[]"
);
},

saveCustomers(data) {
localStorage.setItem(
"customers",
JSON.stringify(data)
);
},

getBills() {
return JSON.parse(
localStorage.getItem("agroBills") || "[]"
);
},

saveBills(data) {
localStorage.setItem(
"agroBills",
JSON.stringify(data)
);
},

getCompany() {
return JSON.parse(
localStorage.getItem("company") || "{}"
);
},

saveCompany(data) {
localStorage.setItem(
"company",
JSON.stringify(data)
);
}

};

// ---------------------------
// DEMO DATA
// ---------------------------

function seedData(){

if(DB.getProducts().length===0){

DB.saveProducts([

{
id:1,
product:"Urea",
packing:"50kg",
technical:"Carbamide",
price:266
},

{
id:2,
product:"Urea",
packing:"25kg",
technical:"Carbamide",
price:140
},

{
id:3,
product:"DAP",
packing:"50kg",
technical:"Diammonium Phosphate",
price:1350
},

{
id:4,
product:"NPK 20:20:0",
packing:"50kg",
technical:"Nitrogen Phosphorus Potassium",
price:1250
}

]);

}

if(DB.getCustomers().length===0){

DB.saveCustomers([

{
id:1,
name:"Walk-in Customer",
location:"Ahmedabad",
mobile:"9999999999"
}

]);

}

}

// ---------------------------
// DASHBOARD
// ---------------------------

function updateDashboard(){

const products =
DB.getProducts();

const customers =
DB.getCustomers();

const bills =
DB.getBills();

let totalSales = 0;

bills.forEach(bill=>{

totalSales += Number(
bill.total || 0
);

});

const totalBillsEl =
document.getElementById(
"totalBills"
);

const totalCustomersEl =
document.getElementById(
"totalCustomers"
);

const totalProductsEl =
document.getElementById(
"totalProducts"
);

const totalSalesEl =
document.getElementById(
"totalSales"
);

if(totalBillsEl)
totalBillsEl.textContent =
bills.length;

if(totalCustomersEl)
totalCustomersEl.textContent =
customers.length;

if(totalProductsEl)
totalProductsEl.textContent =
products.length;

if(totalSalesEl)
totalSalesEl.textContent =
"₹" + totalSales;

}

// ---------------------------
// COMPANY SETTINGS
// ---------------------------

function saveCompany(){

const company = {

name:
document.getElementById(
"companyName"
).value,

address:
document.getElementById(
"companyAddress"
).value,

mobile:
document.getElementById(
"companyMobile"
).value,

gst:
document.getElementById(
"companyGST"
).value,

email:
document.getElementById(
"companyEmail"
).value

};

DB.saveCompany(company);

alert(
"Company Saved Successfully"
);

}

function loadCompany(){

const company =
DB.getCompany();

if(!company) return;

const companyName =
document.getElementById(
"companyName"
);

const companyAddress =
document.getElementById(
"companyAddress"
);

const companyMobile =
document.getElementById(
"companyMobile"
);

const companyGST =
document.getElementById(
"companyGST"
);

const companyEmail =
document.getElementById(
"companyEmail"
);

if(companyName)
companyName.value =
company.name || "";

if(companyAddress)
companyAddress.value =
company.address || "";

if(companyMobile)
companyMobile.value =
company.mobile || "";

if(companyGST)
companyGST.value =
company.gst || "";

if(companyEmail)
companyEmail.value =
company.email || "";

}

// ---------------------------
// INVOICE NUMBER
// ---------------------------

function generateInvoiceNumber(){

const bills =
DB.getBills();

const next =
bills.length + 1;

const year =
new Date().getFullYear();

return "AGR-${year}-${String(next).padStart(5,"0")}";

}

// ---------------------------
// APP INIT
// ---------------------------

function initApp(){

seedData();

loadCompany();

updateDashboard();

console.log(
"Agro Billing App Started"
);

}

document.addEventListener(
"DOMContentLoaded",
initApp
);
