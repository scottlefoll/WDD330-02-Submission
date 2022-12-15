// api url
const api_url = "https://aravinds1811-neural-style-transfer.hf.space/+/api/predict/";
  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url + ", " + params);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}
// Calling that async function
// getapi(api_url);
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('loading').innerHTML = "Success!!";
    alert("check console for data")
}
// Function to define innerHTML for HTML table
function show(data) {
    let tab = "Test";
    
    // Setting innerHTML as tab variable
    document.getElementById("employees").innerHTML = tab;
}

// Response format:

//   {

//         "data": [ str ],
    
//         "durations": [ float ], # the time taken for the prediction to complete
    
//         "avg_durations": [ float ] # the average time taken for all predictions so far (used to estimate the runtime)
    
//       }