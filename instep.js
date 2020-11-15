
//To show the randomly generated id
const randomise = document.querySelector(".random_id");
let l = randomise.addEventListener("click", generateid);
const clear = document.querySelector(".game-btn");
let la = clear.addEventListener("click", clearall);

const credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "eu-west-2:793871cb-c8a9-45bf-b20d-97df75ddbce7"
});
AWS.config = new AWS.Config({
  credentials,
  region: "eu-west-2"
});

const lambda = new AWS.Lambda();
let parsed = "";
//let students_names = ["Daniel","Edward","Dan","Suzanne","Eric","Eliza","Gurtrude"];
let intervalID;

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
            if (JSON.parse(data.Payload).body == "ClassIDSet") {
                showPage2();
                var displayall = document.getElementById("topelement")
                displayall.innerHTML = "<span> Class ID: "+ 
                user_id;"</span>"
                /* for (i=0; i < students_names.length; i++) {
                    var y = students_names[i];
                    parsed += y + ": " + "\n";
                }
                let p = document.getElementById("show2")
                p.innerHTML = "<span>" + parsed;"</span>" */
                 
                intervalID = setInterval(() => {
                    lambda.invoke({
                        FunctionName: 'dataDelivery',
                        Payload: JSON.stringify({
                            classID: user_id
                        })
                    }, (err2, data2) => {
                        if (err2) {
                            console.log(err2, err2.stack);
                        }
                        else {
                            const result = JSON.parse(data2.Payload).body;
                            const names = result.names;
                            const values = result.values;

                            for(let i = 0; i < names.length; i++) {
                                const name = names[i];
                                const value = values[i];

                                parsed += name + ": " + value + "\n";
                            }
                            let p = document.getElementById("show2")
                            p.innerHTML = "<span>" + parsed;"</span>"
                        }
                    });
                }, 1000);

                

            }
            else {
                var error = document.getElementById("error")
                error.innerHTML = "<span style='color: red;'>"+ 
                "Class ID taken, please enter another</span>"
              

            }
        }
    });
    
}
function clearall(event) {
    event.preventDefault();
    clearInterval(intervalID);
}
