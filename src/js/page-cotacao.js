(() => {
    "use strict";
    document.getElementById("phone")?.addEventListener("input", mask_phone);
    document.getElementById("cnpj")?.addEventListener("input", mask_cnpj);

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
            const fromData = new FormData(currentTarget);

            const url_string = window.location.href;
            const url = new URL(url_string);
            const email = url.searchParams.get("email");

            const baseURL = "https://4120qp8ra6.execute-api.us-east-1.amazonaws.com/prod/pill-pass";
            const data = {
                email: email,
                full_name: fromData.get("full-name"),
                phone: fromData.get("phone").replace(/\D/g, ""),
                cnpj: fromData.get("cnpj"),
                num_workers: Number(fromData.get("num_workers"))
            };

            const buttonSubmit = document.getElementById("send_quotation");
            buttonSubmit.setAttribute("disabled", "disabled");
            buttonSubmit.innerText = "Enviando..."

            fetch(baseURL, {
                method: "POST",
                body: JSON.stringify(data)
            }).then(async (response) => {
                const { status } = response

                if(status != 200) throw new Error("Error ao enviar o formulário.");

                openModal("modal-success");    

                buttonSubmit.removeAttribute("disabled");
                buttonSubmit.innerText = "Enviar";
            }).catch((e) => {
                console.log({erro: e})

                buttonSubmit.removeAttribute("disabled");
                buttonSubmit.innerText = "Enviar"

                gsap.to("#alert-error-form", {
                    display: "block",
                    opacity: 1,
                })
            })
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
