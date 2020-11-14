
//To show the randomly generated id
const randomise = document.querySelector(".random_id");
let l = randomise.addEventListener("click", generateid);

function generateid(event) {
    event.preventDefault();
    let user_id = document.getElementById("randomidgen").value;
    document.getElementById("show").innerHTML = user_id;
}