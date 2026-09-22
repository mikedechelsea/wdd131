
const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const listElement = document.querySelector("#list");

button.addEventListener("click", function () {

    // Check that the input is not blank
    if (input.value.trim() !== "") {

        // Create a new list item
        const li = document.createElement("li");

        // Add the chapter title
        li.textContent = input.value.trim();

        // Create the delete button
        const deleteButton = document.createElement("button");

        // Add the delete symbol
        deleteButton.textContent = "❌";

        // Remove the chapter when the delete button is clicked
        deleteButton.addEventListener("click", function () {
            listElement.removeChild(li);
            input.focus();
        });

        // Add the delete button to the list item
        li.append(deleteButton);

        // Add the list item to the unordered list
        listElement.append(li);

        // Clear the input field
        input.value = "";
    }

    // Return focus to the input field
    input.focus();
});