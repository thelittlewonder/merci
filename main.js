var flag = 0;
var downloadUrl = '';
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

var getScale = function (type) {
    if (type === 'dl') {
        return (window.innerWidth > 640) ? 1.5 : 1;
    } else {
        return 0.3
    }
}

var downloadImage = function () {
    let to = "Letter for " + document.getElementById('person').innerHTML + ".png";
    document.getElementsByClassName('primary')[0].download = to;
    html2canvas(document.getElementById("card"), {
        scale: getScale('dl')
    }).then(canvas => {
        let temp = canvas.toDataURL().split(';');
        let half0, half1;
        half0 = temp[0].replace('image', 'application');
        half0 = half0.replace('png', 'octet-stream');
        half1 = temp[1];
        downloadUrl = half0 + ';' + half1;
        document.getElementsByClassName('primary')[0].href = downloadUrl;
    });

    html2canvas(document.getElementById("card"), {
        scale: getScale('test')
    }).then(canvas => {
        let temp = canvas.toDataURL().split(';');
        let half0, half1;
        half0 = temp[0].replace('image', 'application');
        half0 = half0.replace('png', 'octet-stream');
        half1 = temp[1];
        emailUrl = half0 + ';' + half1;
        document.getElementsByClassName('primary')[0].href = emailUrl;
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

    var headers = {
        "Content-Type": "application/json",
        "Access-Control-Origin": "*"
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
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        });
}

let a = document.getElementsByClassName('editable');
for (i = 0; i < a.length; i++) {
    a[i].addEventListener("focusout", function () {
        downloadImage();
    }, false)
}