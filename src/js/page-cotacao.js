(() => {
    "use strict";
    const formBudgetStep1 = document.getElementById("form-budget-step-1");

    formBudgetStep1.addEventListener("submit", (event) => {
        event.preventDefault();

        const { currentTarget } = event;

        if (currentTarget.checkValidity()) {
            const data = new FormData(currentTarget);

            updateURLParams(data.get("email"))
            toggleFromsAnimate();
        }
    });

    const formBudgetStep2 = document.getElementById("form-budget-step-2");

    formBudgetStep2.addEventListener("submit", (event) => {
        event.preventDefault();

        const { currentTarget } = event;

        if (currentTarget.checkValidity()) {
            console.log("end form");
            openModal("modal-success");
        }
    });

    function toggleFromsAnimate() {
        gsap.to("#hero", {
            display: "none",
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                gsap.to("#collaborators", {
                    display: "block",
                    opacity: 1,
                    duration: 0.2,
                });
            },
        });
    }

    function openModal(id) {
        const staticBackdrop = document.getElementById(id);
        const myModal = new bootstrap.Modal(staticBackdrop);
        myModal.show();
    }

    function updateURLParams(value) {
        const url = new URL(window.location.href);
      
        url.searchParams.set("email", value);

        window.history.replaceState({}, "", url);
    }

    function getParamsURL() {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const email = url.searchParams.get("email") ?? "";

        if(email) {
            toggleFromsAnimate();
        }
    }
    getParamsURL();
})();
