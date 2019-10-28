var flag = 0;
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

function downloadImage() {
    let to = "Letter for " + document.getElementById('person').innerHTML + ".png";
    document.getElementsByClassName('primary')[0].download = to;
    html2canvas(document.getElementById("card"), {
        scale: 1.5
    }).then(canvas => {
        let imageUrl;
        let temp = canvas.toDataURL().split(';');
        let half0, half1;
        half0 = temp[0].replace('image', 'application');
        half0 = half0.replace('png', 'octet-stream');
        half1 = temp[1];
        imageUrl = half0 + ';' + half1;
        document.getElementsByClassName('primary')[0].href = imageUrl;
    });
}


document.getElementById('friends')