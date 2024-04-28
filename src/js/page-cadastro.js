(() => {
    "use strict";
    const baseURL = "https://ouxnadpkm4.execute-api.us-east-1.amazonaws.com/shopify";
    const formBudgetStep1 = document.getElementById("form-budget-step-1");
    const MESSAGE = {
        500: "Ops, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde ou entre em contato com nosso time.",
        password: "As senhas fornecidas não são iguais. Por favor, verifique e tente novamente."
    };

    formBudgetStep1.addEventListener("submit", async (event) => {
        event.preventDefault();
        const { currentTarget } = event;

        if (!currentTarget.checkValidity()) return;

        const buttonSubmit = currentTarget.querySelector(`button[type="submit"]`);
        buttonSubmit.disabled = true;
        buttonSubmit.innerText = "Enviando...";

        const data = new FormData(currentTarget);
        const email = data.get("email");

        try {
            const response = await verifyEmail(email);
            const { status, message } = JSON.parse(response);
            
            if (Number(status) === 200) {
                document.getElementById("email-send").innerText = email;
                toggleFromsAnimate("#hero", "#form-2ft");
            } else if (Number(status) >= 500) {
                showMessage("alert-send-email", MESSAGE[500]);
            } else if (Number(status) >= 300) {
                showMessage("alert-send-email", message);
            }
        } catch (error) {
            console.error(error);
            showMessage("alert-send-email", MESSAGE[500]);
        } finally {
            buttonSubmit.disabled = false;
            buttonSubmit.innerText = "Iniciar Cadastro";
        }
    });

    const formBudgetStep2 = document.getElementById("form-budget-step-2");

    formBudgetStep2.addEventListener("submit", async (event) => {
        event.preventDefault();
        const { currentTarget } = event;

        if (!currentTarget.checkValidity()) return;

        const buttonSubmit = currentTarget.querySelector(`button[type="submit"]`);
        buttonSubmit.disabled = true;
        buttonSubmit.innerText = "Validando...";

        const data = new FormData(currentTarget);
        const codes = {};
        for (let i = 1; i <= 6; i++) {
            codes[`c${i}`] = data.get(`code${i}`);
        }

        const code = Object.values(codes).join('');
        const email = document.getElementById("email-send").innerText;

        try {
            const response = await validateEmail(email, code);
            const { status, message } = JSON.parse(response);
            
            if (Number(status) === 200) {
                document.getElementById("code-singup").value = code;
                document.getElementById("email-singup").value = email;

                toggleFromsAnimate("#form-2ft", "#form-singup");
            } else if (Number(status) >= 500) {
                showMessage("alert-validade-code", MESSAGE[500]);
            } else if (Number(status) >= 300) {
                showMessage("alert-validade-code", message);
            }
        } catch (error) {
            console.error(error);
            showMessage("alert-validade-code", MESSAGE[500]);
        } finally {
            buttonSubmit.disabled = false;
            buttonSubmit.innerText = "Validar token";
        }
    });

    const formSingup = document.getElementById("form-budget-step-3");

    formSingup.addEventListener("submit", async (event) => {
        event.preventDefault();
        const { currentTarget } = event;

        if (!currentTarget.checkValidity()) return;

        const buttonSubmit = currentTarget.querySelector(`button[type="submit"]`);
        buttonSubmit.disabled = true;
        buttonSubmit.innerText = "Criando...";

        const data = new FormData(currentTarget);
        const password = data.get("password");
        const password_confirm = data.get("confirm-password");

        if (password != password_confirm) {
            buttonSubmit.disabled = false;
            buttonSubmit.innerText = "Criar conta";

            showMessage("alert-singup", MESSAGE.password);
            return;
        }

        const body = {
            code: data.get("code"),
            email: data.get("email"),
            first_name: data.get("first_name"),
            last_name: data.get("last_name"),
            cpf: data.get("cpf"),
            birthday: data.get("birth-data"),
            gender: data.get("gender"),
            phone: data.get("phone"),
            password: data.get("password"),
            password_confirm: data.get("confirm-password"),
            optin: data.get("optin") === "on" ? 1 : 0,
        }

        try {
            const response = await singup(body);
            const { status, message } = JSON.parse(response);
            
            if (Number(status) === 200) {
                currentTarget.reset();

                openModal("modal-success");
            } else if (Number(status) >= 500) {
                showMessage("alert-singup", MESSAGE[500]);
            } else if (Number(status) >= 300) {
                showMessage("alert-singup", message);
            }
        } catch (error) {
            console.error(error);
            showMessage("alert-singup", MESSAGE[500]);
        } finally {
            buttonSubmit.disabled = false;
            buttonSubmit.innerText = "Criar conta";
        }
    });

    async function verifyEmail(email) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({ email }),
            redirect: "follow"
        };

        const response = await fetch(`${baseURL}/verify`, requestOptions);

        if (!response.ok) throw new Error("Network response was not ok.");

        return response.text();
    };

    async function validateEmail(email, code) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({ email, code }),
            redirect: "follow"
        };

        const response = await fetch(`${baseURL}/validate`, requestOptions);

        if (!response.ok) throw new Error("Network response was not ok.");

        return response.text();
    };

    async function singup(data) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: "follow"
        };

        const response = await fetch(`${baseURL}/validate`, requestOptions);

        if (!response.ok) throw new Error("Network response was not ok.");

        return response.text();
    }

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
    };

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

    function openModal(id) {
        const staticBackdrop = document.getElementById(id);
        const myModal = new bootstrap.Modal(staticBackdrop);
        myModal.show();
    }

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
})();
