(() => {
    "use strict";
    const baseURL = "https://ouxnadpkm4.execute-api.us-east-1.amazonaws.com/shopify";
    const formBudgetStep1 = document.getElementById("form-budget-step-1");

    formBudgetStep1.addEventListener("submit", (event) => {
        event.preventDefault();

        const { currentTarget } = event;

        if (currentTarget.checkValidity()) {
            const data = new FormData(currentTarget);

            document.getElementById("email-send").innerText = data.get("email");

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "email": data.get("email"),
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch(`${baseURL}/verify`, requestOptions)
                .then(async (response) => {
                    const { status, body } = response
                    const data = await response.body.json();

                    console.log({ status, body, data })
                })
                .catch((error) => console.error(error));

            // toggleFromsAnimate("#hero", "#form-2ft");
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

    function toggleFromsAnimate(prev, next) {
        gsap.to(prev, {
            display: "none",
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                gsap.to(next, {
                    display: "flex",
                    opacity: 1,
                    duration: 0.2,
                });
            },
        });
    }
})();
