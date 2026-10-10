const products = [
  { id: "fc-1888", name: "Flux Capacitor" },
  { id: "ps-2000", name: "Power Sander 2000" },
  { id: "pg-300",  name: "Pro Gig Bag 300" },
  { id: "dc-550",  name: "DustCollector 550" },
  { id: "tc-4000", name: "ToolChest 4000" },
  { id: "lw-200",  name: "Laser Workbench 200" },
  { id: "bw-125",  name: "BenchWise 125" }
];

// Populate select options from product array
const select = document.getElementById("product-name");

products.forEach(function (product) {
  const option = document.createElement("option");
  option.value = product.id;
  option.textContent = product.name;
  select.appendChild(option);
});

// Footer dates
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  "Last Modification: " + document.lastModified;
