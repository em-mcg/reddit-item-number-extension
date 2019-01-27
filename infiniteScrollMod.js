
// source: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeId(n) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < n; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

let numberedClass = 'numbered-' + makeId(8);

function numberRedditPosts() {
    console.log("scrolling...");
    document.querySelectorAll('.scrollerItem').forEach(function (element, index) {
        if (!element.firstChild.lastChild.classList.contains(numberedClass)) {
            let div = document.createElement("div");
            div.innerHTML = "<span class='rank'>" + (index+1) + "</span>";
            div.classList.add(numberedClass);
            element.firstChild.appendChild(div);
        }
    });
}

let scrollLock = false;
let scrolled = 0;
let nextScroll = 30;

numberRedditPosts();
document.onscroll = function() {
    scrolled = (scrolled + 1) % nextScroll;
    if (scrollLock || scrolled < nextScroll-1) {
        return;
    }

    scrollLock = true;
    numberRedditPosts();
    scrollLock = false;
};

