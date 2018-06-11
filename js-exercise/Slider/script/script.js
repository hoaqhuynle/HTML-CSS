var img = document.getElementById("img");

var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");
var img3 = document.getElementById("img3");
var img4 = document.getElementById("img4");

var imgList = [img1, img2, img3, img4];

/**
 * Get index of image that is showed.
 */
function getCurrentImgID() {
    for (imgIndex = 0; imgIndex < imgList.length; imgIndex++) {
        var element = imgList[imgIndex];
        if (img.src === element.src) {
            return imgIndex;
        }
    }
}

/**
 * Show image by index.
 * @param {Index of image} imgID 
 */
function showImg(imgID) {
    img.src = imgList[imgID].src;
}

/**
 * Change index of image when click on another image or auto changing image.
 */
function changeIndex() {
    var index = getCurrentImgID();
    
    for (imgIndex = 0; imgIndex < imgList.length; imgIndex++) {
        if (imgIndex == index) {
            imgList[index].style.opacity = "1";
        } else {
            imgList[imgIndex].style.opacity = "0.5";
        }
    }
}

/**
 * Change current image by next or previous image
 * @param {if next = true, index of image +1. Else, -1} next 
 */
function changeImg(next = true) {
    var currentImgID = getCurrentImgID();

    if (next == true) {
        currentImgID = currentImgID + 1;
    } else {
        currentImgID = currentImgID - 1;
    }

    if (currentImgID < 0) {
        currentImgID = imgList.length - 1;
    } else if (currentImgID > imgList.length - 1) {
        currentImgID = 0;
    }

    showImg(currentImgID);
    changeIndex();
}

var id = setInterval(changeImg, 3000);

var next = document.getElementById("next");
next.addEventListener("click", function() { 
    clearInterval(id);
    changeImg(true);
    id = setInterval(changeImg, 3000);
});

var previous = document.getElementById("previous");
previous.addEventListener("click", function() { 
    clearInterval(id);
    changeImg(false);
    id = setInterval(changeImg, 3000);
});

img1.addEventListener("click", function() {
    clearInterval(id);

    showImg(0);
    changeIndex();

    id = setInterval(changeImg, 3000);
});

img2.addEventListener("click", function() {
    clearInterval(id);

    showImg(1);
    changeIndex();

    id = setInterval(changeImg, 3000);
});

img3.addEventListener("click", function() {
    clearInterval(id);

    showImg(2);
    changeIndex();

    id = setInterval(changeImg, 3000);
});

img4.addEventListener("click", function() {
    clearInterval(id);

    showImg(3);
    changeIndex();

    id = setInterval(changeImg, 3000);
});
