const regexIsEmpty = /^\s*$/;
        let hasErrors = false;

        document.addEventListener('DOMContentLoaded', () => {
            const txtPrimerNombre = document.getElementById("txtPrimerNombre");
            const txtEmail = document.getElementById("txtEmail");
            const formSolicitud = document.getElementById("formSolicitud");

            function onSubmit_formSolicitud(e) {
                const errors = {};
                hasErrors = false;

                // Validar nombre
                if (regexIsEmpty.test(txtPrimerNombre.value)) {
                    errors["txtPrimerNombre"] = "El nombre no puede ir vacío";
                    hasErrors = true;
                }

                
                if (regexIsEmpty.test(txtEmail.value)) {
                    errors["txtEmail"] = "El correo no puede ir vacío";
                    hasErrors = true;
                } else if (!txtEmail.value.includes("@") || !txtEmail.value.includes(".")) {
                    errors["txtEmail"] = "El correo no es válido";
                    hasErrors = true;
                }

                e.preventDefault();
                e.stopPropagation();

                if (hasErrors) {
                    
                    const oldErrors = document.querySelectorAll('.error');
                    oldErrors.forEach(err => err.remove());

                    const errorKeys = Object.keys(errors);
                    for (const errorKey of errorKeys) {
                        const errorDivHolder = document.getElementById(`div${errorKey.replace("txt", "")}`);
                        const input = document.getElementById(errorKey);

                        if (errorDivHolder && input) {
                            input.classList.add('error');

                            const errorDivMessage = document.createElement("div");
                            errorDivMessage.classList.add('error');
                            errorDivMessage.textContent = errors[errorKey];
                            errorDivHolder.appendChild(errorDivMessage);
                        }
                    }
                }
            }

            formSolicitud.addEventListener("submit", onSubmit_formSolicitud);
        });
