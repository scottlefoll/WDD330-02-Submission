function choosePhoto(){
    var x = document.getElementById("myFile");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
        txt = "Select a file.";
        } else {
        for (var i = 0; i < x.files.length; i++) {
            txt += "<br><strong>" + (i+1) + ". file</strong><br>";
            var file = x.files[i];
            if ('name' in file) {
            txt += "name: " + file.name + "<br>";
            }
            if ('size' in file) {
            txt += "size: " + file.size + " bytes <br>";
            }
        }
        }
    } 
    else {
        if (x.value == "") {
        txt += "Select a file.";
        } else {
        txt += "The files property is not supported by your browser!";
        txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        }
    }
    document.getElementById("photoImg").src = x.value; 
    // innerHTML = txt;
    
    }

function displayPhoto(img) {
    var displayPhoto = document.getElementById("displayPhoto");
    var imgText = document.getElementById("photoText");
    displayPhoto.src = img.src;
    photoText.innerHTML = img.alt;
    photoImg.parentElement.style.display = "block";
    }

function displayArt(imgs) {
    var imgStyle = document.getElementById("styleImg");
    // alert("function displayArt")
    imgStyle.src = imgs.src;
    }