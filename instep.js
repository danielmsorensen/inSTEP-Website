
//To show the randomly generated id
const randomise = document.querySelector(".random_id");
let l = randomise.addEventListener("click", generateid);

async function generateid(event) {
    event.preventDefault();
    let user_id = document.getElementById("randomidgen").value;
    //document.getElementById("show").innerHTML = user_id;
    const url = "https://dxdunwhca3.execute-api.eu-west-2.amazonaws.com/classIDCreate";
    const params = {"classID": user_id};
    const result = await fetch (url,
       {
           method: "POST",
           cache: "no-cache",
           credentials: "same-origin",
           headers: {
               "Content-Type": "application/json",
           },
           body: JSON.stringify(params)
           
       });
       if (result.ok) {
           const dat = await result.json();
       }
       else {
           if(result.status === 400){
               console.warn(result.statusText);
           }
       }



}