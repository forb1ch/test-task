let tabs = Array.from(document.querySelectorAll(".fonts__tab_btn"));
let contents = Array.from(document.querySelectorAll(".fonts__block"));

tabs.forEach((element) => {
    element.addEventListener("click", (event) => {
        tabs.forEach((ele) => ele.setAttribute("aria-selected", "false"));
        event.target.setAttribute("aria-selected", "true");

        let findTab = event.target.getAttribute('id');

        contents.forEach((content) => {
            content.setAttribute("aria-hidden", "true");

            if (content.getAttribute('aria-labelledby') == findTab)
                content.setAttribute("aria-hidden", "false");
        });
    });
});