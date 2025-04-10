const dropdownElm = document.querySelector(".dropdown-content")
const caretIcon = document.querySelector(".fa-caret-down")

const dropDownElm = document.querySelector("nav .dropbtn")
dropDownElm.addEventListener("click", dropdownKlikk)

function dropdownKlikk(event) {
    // Toggle dropdown visibility
    if (dropdownElm.style.display === "flex") {
        dropdownElm.style.display = "none"
        caretIcon.classList.remove("rotate")
    } else {
        dropdownElm.style.display = "flex"
        caretIcon.classList.add("rotate")
    }
}

// Hide the navbar dropdown when clicking anywhere in the document:
document.body.addEventListener("click", documentKlikk)

function documentKlikk(event) {
    // Hide the navbar dropdown if clicking anywhere:
    if (event.target != dropDownElm) {
        dropdownElm.style.display = "none"
        caretIcon.classList.remove("rotate")
    }
}

const inputEl = document.querySelector(".input")
const navnEl = document.querySelector(".navn")

const largetNavn = localStorage.getItem("brukernavn")
if(largetNavn){
    navnEl.textContent = largetNavn
}

inputEl.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const inputnavn = inputEl.value
        navnEl.textContent = inputEl.value
        localStorage.setItem("brukernavn", inputnavn)

       
    }
})




