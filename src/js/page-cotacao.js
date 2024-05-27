(() => {
    "use strict";

    document.querySelectorAll(".alert .btn-close").forEach((button) => {
        button.addEventListener("click", () => {
            const containerAlert = button.closest(".alert");

            gsap.to(containerAlert, {
                display: "none",
                opacity: 0,
                duration: 0.3,
            });
        })
    });

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

        const clearClose = document.querySelector("#alert-send .btn-close");
        if(clearClose){
            clearClose.click();
        }

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

            //verify Phone
            if(!validatePhone(fromData.get("phone"))){
                buttonSubmit.innerText = "Enviar";
                showMessage("alert-send", "Formato de celular inválido");
                buttonSubmit.removeAttribute("disabled");
                return;
            }

            //verify CNPJ
            if(!validateCNPJ(fromData.get("cnpj"))){
                buttonSubmit.innerText = "Enviar";
                showMessage("alert-send", "Formato de CNPJ inválido");
                buttonSubmit.removeAttribute("disabled");
                return;
            }

            //Verify workers
            if (!fromData.get("num_workers") || fromData.get("num_workers") <= 0) {
                buttonSubmit.disabled = false;
                buttonSubmit.innerText = "Enviar";

                showMessage("alert-send", "Nº de colaboradores deve ser maior que 0");
                buttonSubmit.removeAttribute("disabled");
                return;
            }
        
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

    function validatePhone(phone){
        let result = phone.replace(/\D/g, "");
        result = result.replace(/^0/, "");
    
        result = result.replace(/(\d{2})(\d{1})/, "($1) $2");
        result = result.replace(/(\d{5})(\d{1})/, "$1-$2");

        if (!/\(\d{2}\)\s?\d{5}-\d{4}/.test(result)) {
            return false
        } 
        return true;
    }

    function validateCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
    
        if (cnpj.length !== 14) {
            return false;
        }
    
        // Verifica se todos os dígitos são iguais (caso comum de CNPJ inválido)
        var digitsAreEqual = /^(.)\1+$/.test(cnpj);
        if (digitsAreEqual) {
            return false;
        }
    
        // Validação do CNPJ usando o algoritmo
        var size = cnpj.length - 2;
        var numbers = cnpj.substring(0, size);
        var digits = cnpj.substring(size);
        var sum = 0;
        var pos = size - 7;
    
        for (var i = size; i >= 1; i--) {
            sum += numbers.charAt(size - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
    
        var result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== parseInt(digits.charAt(0))) {
            return false;
        }
    
        size = size + 1;
        numbers = cnpj.substring(0, size);
        sum = 0;
        pos = size - 7;
    
        for (var j = size; j >= 1; j--) {
            sum += numbers.charAt(size - j) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
    
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== parseInt(digits.charAt(1))) {
            return false;
        }
    
        return true;
    }

    function showMessage(id, message) {
        const alertContainer = document.getElementById(id);
        const containerMessage = alertContainer.querySelector(".alert-message");

        containerMessage.innerText = message;

        gsap.to(alertContainer, {
            display: "block",
            opacity: 1,
            duration: 0.3,
        });
    };

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
