
//To show the randomly generated id
const randomise = document.querySelector(".random_id");
let l = randomise.addEventListener("click", generateid);

const credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "eu-west-2:793871cb-c8a9-45bf-b20d-97df75ddbce7"
});
AWS.config = new AWS.Config({
  credentials,
  region: "eu-west-2"
});

const lambda = new AWS.Lambda();

async function generateid(event) {
    event.preventDefault();
    let user_id = document.getElementById("randomidgen").value;
    //document.getElementById("show").innerHTML = user_id;
    //const url = "https://dxdunwhca3.execute-api.eu-west-2.amazonaws.com/classIDCreate";
    const params = {"classID": user_id};
    lambda.invoke({
        FunctionName: 'classIDCreate',
        Payload: JSON.stringify({
            classID: user_id
        })
    }, (err, data) => {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            if (console.Payload == "ClassIDSet") {
                showPage2();
            }
            else {
                var error = document.getElementById("error")
                error.innerHTML = "<span style='color: red;'>"+ 
                "Class ID taken, please enter another</span>"

            }
        }
    });
    
}
