(() => {
    "use strict";
    const formBudgetStep1 = document.getElementById("form-budget-step-1");

    formBudgetStep1.addEventListener("submit", (event) => {
        event.preventDefault();

        const { currentTarget } = event;

        if (currentTarget.checkValidity()) {
            const data = new FormData(currentTarget);

            document.getElementById("email-send").innerText = data.get("email")

            toggleFromsAnimate();
        }
    });

    const formBudgetStep2 = document.getElementById("form-budget-step-2");

    formBudgetStep2.addEventListener("submit", (event) => {
        event.preventDefault();

        const { currentTarget } = event;

        if (currentTarget.checkValidity()) {
            console.log("end form");
        }
    });

    function toggleFromsAnimate() {
        gsap.to("#hero", {
            display: "none",
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                gsap.to("#form-2ft", {
                    display: "block",
                    opacity: 1,
                    duration: 0.2,
                });
            },
        });
    }
})();
