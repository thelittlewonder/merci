var flag = 0;
var downloadUrl = '';
var emailUrl = '';
var loadImage = function (input) {
    var preview = document.getElementById('friends');
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            preview.setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    } else {
        preview.setAttribute('src', './assets/placeholder.png');
    }
    let desc = document.getElementsByClassName('desc')[0];
    desc.style.opacity = 0;
    flag = 1;
};

var showDesc = function () {
    if (flag === 1) {
        let desc = document.getElementsByClassName('desc')[0];
        desc.style.opacity = 1;
    }
}

var hideDesc = function () {
    if (flag === 1) {
        let desc = document.getElementsByClassName('desc')[0];
        desc.style.opacity = 0;
    }
}

var getScale = function () {
    return (window.innerWidth > 640) ? 1.5 : 1;
}

var downloadImage = function () {
    let to = "Letter for " + document.getElementById('person').innerHTML + ".png";
    document.getElementsByClassName('primary')[0].download = to;
    html2canvas(document.getElementById("card"), {
        scale: getScale()
    }).then(canvas => {
        let temp = canvas.toDataURL().split(';');
        let half0, half1;
        emailUrl = temp[1].split(',')[1];
        half0 = temp[0].replace('image', 'application');
        half0 = half0.replace('png', 'octet-stream');
        half1 = temp[1];
        downloadUrl = half0 + ';' + half1;
        document.getElementsByClassName('primary')[0].href = downloadUrl;
    });
}


var triggerEmail = function () {
    document.getElementById('trig').style.display = 'none';
    document.getElementById('email').style.display = 'flex';
}

var sendEmail = function () {
    event.preventDefault();
    downloadImage();
    let emailAddress, reqUrl;
    emailAddress = document.getElementById('address').value;
    reqUrl = 'https://thanksjhalwa.herokuapp.com/'
    document.getElementById('sendbtn').style.display = 'none';
    document.getElementById('loader').style.display = 'inline-block';
    var headers = {
        "Content-Type": "application/json",
        "Access-Control-Origin": "no-cors"
    }

    var data = {
        "email": emailAddress,
        "image": emailUrl
    }

    fetch(reqUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(function (response) {
            console.log(status);
            if (status === 200) {
                document.getElementById('sendbtn').style.display = 'block';
                document.getElementById('loader').style.display = 'none';
            }
        });
}

let a = document.getElementsByClassName('editable');
for (i = 0; i < a.length; i++) {
    a[i].addEventListener("focusout", function () {
        downloadImage();
    }, false)
}