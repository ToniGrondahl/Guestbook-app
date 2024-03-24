const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

function validateForm() {
    var name = document.getElementById("name").value;
    var country = document.getElementById("country").value;
    var message = document.getElementById("comment").value;

    if (name.trim() == "" || country.trim() == "" || message.trim() == "") {
        alert("Please fill out all fields!");
        return false;
    }
    return true;
}