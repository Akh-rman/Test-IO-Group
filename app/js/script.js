var txt = document.getElementById("textarea-notes"),
    hiddenDiv = document.getElementsByClassName("textarea-hidden")[0],
    content = null,
    height = null;

txt.onkeyup = function () {
    content = txt.value;
    content = content.replace(/\n/g, '<br>');
    height = window.getComputedStyle(hiddenDiv, null).height;
    hiddenDiv.innerHTML = content;
    txt.style.height = height;
    console.log(height);
}

