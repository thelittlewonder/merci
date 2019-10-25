var flag = 0;
var loadImage = function (event) {
    let output = document.getElementById('friends');
    output.src = URL.createObjectURL(event.target.files[0]);
    let desc = document.getElementsByClassName('desc')[0];
    desc.style.opacity = 0;
    flag = 1;
};

function downloadImage() {
    html2canvas(document.getElementById("card"), {
        scale: 1
    }).then(canvas => {
        console.log(canvas.toDataURL());
    });
}
