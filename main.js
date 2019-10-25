var flag = 0;
downloadImage();
var loadImage = function (event) {
    let output = document.getElementById('friends');
    output.src = URL.createObjectURL(event.target.files[0]);
    let desc = document.getElementsByClassName('desc')[0];
    desc.style.opacity = 0;
    flag = 1;
};

function downloadImage() {
    html2canvas(document.getElementById("card"), {
        scale: 1.5
    }).then(canvas => {
        let imageUrl; 
        let temp = canvas.toDataURL().split(';');
        let half0, half1;
        half0 = temp[0].replace('image','application');
        half0 = half0.replace('png','octet-stream');
        half1 = temp[1];
        imageUrl = half0+';'+half1;
        document.getElementsByClassName('primary')[0].href = imageUrl;
    });
}
