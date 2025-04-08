const regexIsEmpty = /^\s*$/;

document.addEventListener('DOMContentLoaded', () => {
    const formSolicitud = document.getElementById("formSolicitud");
    const txtPrimerNombre = document.getElementById("txtPrimerNombre");
    const txtApellidoPaterno = document.getElementById("txtApellidoPaterno");
    const txtCorreo = document.getElementById("txtCorreo");

    function onSubmit_formSolicitud (e) {
        const errors = {};
        let hasErrors = false;

        txtPrimerNombre.classList.remove('error');
        txtApellidoPaterno.classList.remove('error');
        txtCorreo.classList.remove('error');

        if (regexIsEmpty.test(txtPrimerNombre.value)){
            hasErrors = true;
            errors["PrimerNombre"] = "El nombre no puede ir vacío.";
        }

        if (regexIsEmpty.test(txtApellidoPaterno.value)){
            hasErrors = true;
            errors["ApellidoPaterno"] = "El apellido no puede ir vacío.";
        }

        if (regexIsEmpty.test(txtCorreo.value)){
            hasErrors = true;
            errors["Correo"] = "El correo no puede ir vacío.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(txtCorreo.value)) {
            hasErrors = true;
            errors["Correo"] = "El correo no es válido.";
        }

        if (hasErrors) {
            const errorKeys = Object.keys(errors);
            let focusAssigned = false;
            for (const errorKey of errorKeys) {
                const errorDivHolder = document.getElementById(`div${errorKey}`);
                if(errorDivHolder) {
                    let errorDivMessage = document.getElementById(`${errorKey}Error`);
                    if (errorDivMessage) {
                        errorDivMessage.textContent = errors[errorKey];
                    } else {
                        errorDivMessage = document.createElement("DIV");
                        errorDivMessage.id = `${errorKey}Error`;
                        errorDivMessage.textContent = errors[errorKey];
                        errorDivMessage.classList.add('error');
                        errorDivHolder.appendChild(errorDivMessage);
                    }
                    let inputObject = errorDivHolder.querySelector('input');
                    inputObject.classList.add('error');
                    if( !focusAssigned) {
                        inputObject.focus();
                        focusAssigned = true;
                    }
                }
            }
            e.preventDefault();
            e.stopPropagation();
        }
    }

    formSolicitud.addEventListener("submit", onSubmit_formSolicitud);
});
