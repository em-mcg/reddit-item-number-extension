
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
    let items = document.querySelectorAll('.scrollerItem:not(.Blank)');

    Array.prototype.slice.call(items).every(function (element, index) {
        console.log(element);
        try {
            if (element.classList.contains("Blank")) {
                return true;
            }

            if (!element.firstChild.lastChild.classList.contains(numberedClass)) {
                let div = document.createElement("div");
                div.innerHTML = "<span class='rank'>" + (index+1) + "</span>";
                div.classList.add(numberedClass);
                element.firstChild.appendChild(div);
                // console.log("numbered " + index);
            }

            return true;
        } catch(err) {
            console.log("Got error:", err);
            return false;
        }
    });
}

let scrollLock = false;
let scrolled = 0;
let nextScroll = 30;

console.log("Injected scroll script");
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

