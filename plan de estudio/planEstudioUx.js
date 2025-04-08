
document.addEventListener("DOMContentLoaded", () => {
    const jsonUrl = 'js/planEstudioICC.json';

    const planNodeTree = {};
    fetch(jsonUrl)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                return new Promise((resolve) => resolve({}));
            }
        }).then((data) => {
            console.log("Data del Server:", JSON.stringify(data, null, 2));
            createContainer(data);
        })
        .catch(
            (err) => {
                console.log("error fetching json", err);
            }
        );

    function createContainer(data) {
        const container = document.createElement("SECTION");
        container.classList.add("plan-container");
        const header = document.createElement("SECTION");
        header.classList.add("plan-header");
        const title = document.createElement("H1");
        title.textContent = data.titulo;
        header.appendChild(title);
        const subtitle = document.createElement("H2");
        subtitle.textContent = data.codigo;
        header.appendChild(subtitle);
        container.appendChild(header);

        data.plan.forEach(
            (bloque) => {
                container.appendChild(createBlock(bloque));
            }
        );

        const rootContainer = document.getElementById('root');
        rootContainer.appendChild(container);
    }

    function createBlock(blockData) {
        const blockContainer = document.createElement("DIV");
        blockContainer.classList.add("plan-block");
        const blockLabel = document.createElement("DIV");
        blockLabel.classList.add("plan-block-label");
        blockLabel.textContent = blockData.bloque;
        blockContainer.appendChild(blockLabel);
        const blockClasses = document.createElement("DIV");
        blockClasses.classList.add("plan-block-classes");

        blockData.asignaturas.forEach((asignatura) => {
            const asignaturaContainer = document.createElement("DIV");
            asignaturaContainer.classList.add("asignatura");
            asignaturaContainer.setAttribute("data-codigo", asignatura.codigo);
            asignaturaContainer.setAttribute("data-requisitos", asignatura.requisitos.join(","));
            asignaturaContainer.setAttribute("data-abre", "");

            const asignaturaLabel = document.createElement("DIV");
            asignaturaLabel.textContent = `(${asignatura.codigo}) ${asignatura.descripcion}`;
            const asignaturaCreditos = document.createElement("DIV");
            asignaturaCreditos.textContent = `Créditos: ${asignatura.creditos}`;
            asignaturaContainer.appendChild(asignaturaLabel);
            asignaturaContainer.appendChild(asignaturaCreditos);

            planNodeTree[asignatura.codigo] = {
                asignatura: asignaturaContainer,
                requisitos: [],
                apertura: [],
            };

            blockClasses.appendChild(asignaturaContainer);
        });

        blockData.asignaturas.forEach((asignatura) => {
            asignatura.requisitos.forEach((requisito) => {
                if (planNodeTree[requisito]) {
                    planNodeTree[asignatura.codigo].requisitos.push(planNodeTree[requisito].asignatura);
                    planNodeTree[requisito].apertura.push(planNodeTree[asignatura.codigo].asignatura);
                }
            });
        });

        Object.values(planNodeTree).forEach((nodo) => {
            const abreCodigos = nodo.apertura.map(node => node.getAttribute("data-codigo")).join(",");
            nodo.asignatura.setAttribute("data-abre", abreCodigos);
        });

        Object.entries(planNodeTree).forEach(([codigo, nodo]) => {
            nodo.asignatura.addEventListener("mouseenter", () => {
                nodo.requisitos.forEach((reqNode) => reqNode.classList.add("requisito"));
                nodo.apertura.forEach((abrNode) => abrNode.classList.add("apertura"));
                nodo.asignatura.classList.add("active");
            });

            nodo.asignatura.addEventListener("mouseleave", () => {
                nodo.requisitos.forEach((reqNode) => reqNode.classList.remove("requisito"));
                nodo.apertura.forEach((abrNode) => abrNode.classList.remove("apertura"));
                nodo.asignatura.classList.remove("active");
            });
        });

        blockContainer.appendChild(blockClasses);
        return blockContainer;
    }
});
