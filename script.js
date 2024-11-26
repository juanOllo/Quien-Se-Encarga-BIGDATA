const addTaskBtn = document.querySelector(".add-task");
const inputTask = document.querySelector(".input-task");
const taskList = document.querySelector(".tasks-list");

let userName = localStorage.getItem("user") || "";
// let userName = "";

const newNameSection = document.getElementById("new-user");
    const loginBtn = document.querySelector(".login-btn");
    const nameInput = document.querySelector(".name-input");
    const passInput = document.querySelector(".pass-input");

    const newNameInput = document.querySelector(".new-name-input");
    const newPassInput = document.querySelector(".new-pass-input");
    const createUserBtn = document.querySelector(".create-user-btn");
    

const tasksSection = document.getElementById("main");


let usersArr = [];


start();
showData();

async function saveData() {
    let objData = { "HTMLlist": taskList.innerHTML.toString().replace(/\n/g, '') };
    let jsonData = JSON.stringify(objData);

    await fetch('http://192.168.0.111:3000/transaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    });
    showSomeBtns(); // Asegurarse de que los botones se muestren correctamente
}

let auxTargetId = "";

async function showData() {
    try {
        const response = await fetch('http://192.168.0.111:3000/transaction');
        const data = await response.json();
        taskList.innerHTML = data.HTMLlist || "";
        showSomeBtns(); // Mostrar botones después de cargar datos
    } catch (error) {
        console.error('Error:', error);
    }

    if(auxTargetId === ""){
        taskList.addEventListener("click", async (e) => {
            auxTargetId = e.target.id;
            console.log("auxtarget: ", auxTargetId);
            await showData();
            actuar(auxTargetId); //a esto le habia puesto un await no se pa q
        })
        addTaskBtn.addEventListener("click", async () => {
            auxTargetId = "algo";
            console.log("auxtarget: ", auxTargetId);
            await showData();
            addTaskFunction(); //a esto le habia puesto un await no se pa q
        })
        auxTargetId = "";
    }

}

const actuar = async (elemId) => {

    const targetElem = document.getElementById(elemId);
    // console.log("target: ", targetElem);


    const dad = targetElem.parentElement;

    if (targetElem.classList.contains("task-delete-btn")) {
        if (confirm(`Borrar tarea "${dad.children[1].textContent}" ?`)) {
            targetElem.parentElement.remove();
            await saveData();
        }
    }

    if (targetElem.classList.contains("yo-btn")) {
        if (dad.children[3].value === "") {
            targetElem.innerText = `Se encarga ${userName}!!🤚`;
            targetElem.value = userName;
            targetElem.style.backgroundColor = "var(--azul)";
        }
        await saveData();
    }

    if (targetElem.classList.contains("abandonar-btn")) {
        const superDad = dad.parentElement;
        if (superDad.children[3].value === userName) {
            superDad.children[3].textContent = `Abandonado por ${userName}..😔 Encargarse?🤔`;
            superDad.children[3].style.backgroundColor = "var(--marron)";
            superDad.children[3].value = "";
        }
        await saveData();
    }

    if (targetElem.classList.contains("terminado-btn")) {
        const superDad = dad.parentElement;
        if (superDad.children[3].value === userName) {
            superDad.children[3].textContent = `Terminado por ${userName}!!😎👌`;
            superDad.children[3].style.backgroundColor = "var(--verde-claro)";
            superDad.children[3].value = "terminado";
            superDad.children[1].style.textDecoration = "line-through";
            superDad.children[0].classList.add("task-check-btn-checked");
        }
        await saveData();
    }
};

const addTaskFunction = async () => {
    if (inputTask.value !== "") {
        anim(inputTask, "add-task-anim-input 0.4s ease 0s forwards");
        anim(addTaskBtn, "add-task-anim 0.4s ease 0s forwards");
        const taskP = inputTask.value;
        // hacer algo para que no se puedan repetir tareas (el elem p al menos) porq se rompe

        setTimeout(() => {
            inputTask.value = "";
        }, 200);

        setTimeout(async () => {
            taskList.innerHTML = `
                <li class="task">
                    <div class="task-check-btn"></div>
                    <p class="task-p">${taskP}</p>
                    <button id="${taskP}-task-delete-btn" class="task-delete-btn" name="${userName}">X</button>
                    <button id="${taskP}-yo-btn" class="yo-btn" value="">Encargarse?🤔</button>
                    <div class="more-btns">
                        <button id="${taskP}-terminado-btn" class="terminado-btn">Terminado!🤓</button>
                        <button id="${taskP}-abandonar-btn" class="abandonar-btn">Abandonar..😢</button>
                    </div>
                </li>
            ` + taskList.innerHTML;
            await saveData();
            await anim(taskList.children[0].children[0], "new-task-anim 0.5s ease-in-out 0s forwards");
            await anim(taskList.children[0].children[1], "new-task-anim 0.5s ease-in-out 0s forwards");
            await anim(taskList.children[0].children[2], "new-task-anim 0.5s ease-in-out 0s forwards");
        }, 180);
    }
};

const anim = (el, str, fin) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = str;
    setTimeout(() => {
        el.style.animation = "none";
    }, 1000 * fin || 1000);
};

function showSomeBtns() {
    const allYoBtns = document.querySelectorAll(".yo-btn");
    for (let b of allYoBtns) {
        const auxDad = b.parentElement;
        if (b.value === userName) {
            auxDad.children[4].style.display = "flex";
        } else {
            auxDad.children[4].style.display = "none";
        }
    }

    const allDeleteBtns = document.querySelectorAll(".task-delete-btn");
    for (let db of allDeleteBtns) {
        if (db.name === userName) {
            db.style.display = "block";
        } else {
            db.style.display = "none";
        }
    }
}

const reloadBtn = document.querySelector(".reload-btn");
reloadBtn.addEventListener("click", () => {
    showData()
    anim(reloadBtn, "reload-btn-anim 0.3s ease-in-out 0s forwards");
});

const logoutBtn = document.querySelector(".logout-btn");
logoutBtn.addEventListener("click", () => {
    anim(logoutBtn, "reload-btn-anim 0.3s ease-in-out 0s forwards");

    setTimeout(() => {
        if(confirm("Estas seguro que quieres la cerrar secion de usuario?")){
            userName = "cerrarSecion";
            localStorage.setItem("user", "");
            start();
        }
    }, 300)
});























function start() {
    // const userName = localStorage.getItem("user") || "";
    if (userName !== "") {
        newNameSection.style.display = "none";
        tasksSection.style.display = "block";
    }
    if(userName === "cerrarSecion"){
        location.reload();
        userName = "";
    }
}


getUsers();

async function getUsers() {
    await fetch('http://192.168.0.111:3000/users')
        .then(x => x.json())
        .then(y => {
            usersArr = y;
            console.log(y);
        });
}

loginBtn.addEventListener("click", async () => {
    if (nameInput.value !== "") {

        let usuario = "";
        const nombre = nameInput.value;
        const contraseña = passInput.value;
        usuario = usersArr.find((u) => u.name === nombre) || "";
        console.log("el usuario es", usuario);

        if(usuario){
            if(usuario.clave === contraseña){
                console.log("ENTRO");
                localStorage.setItem("user", nameInput.value);
                userName = nameInput.value;
                // console.log(userName);
                loginBtn.parentElement.parentElement.style.display = "none";
                start();
                showSomeBtns(); // Actualizar botones después de cambiar el nombre de usuario
                nameInput.value = "";
            } else {
                console.log("CONTRASEÑA INCORRECTA");
                passInput.value = "";
            }
        } else {
            console.log("USUARIO NO REGISTRADO");
        }
    }
});




async function postNewUser(nUser) {
    // let objData = { "HTMLlist": taskList.innerHTML.toString().replace(/\n/g, '') };
    let jsonData = JSON.stringify(nUser);
    console.log("nuevo usuario por pushear: ", jsonData);

    await fetch('http://192.168.0.111:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    });
    showSomeBtns(); // Asegurarse de que los botones se muestren correctamente
}

createUserBtn.addEventListener("click", async () => {
    if (newNameInput.value !== "" && newPassInput.value !== "") {

        let usuario = "";
        const nombre = newNameInput.value;
        const contraseña = newPassInput.value;
        usuario = usersArr.find((u) => u.name === nombre);
        console.log("el usuario es", usuario);

        if(usuario === undefined){
            console.log("SE PUEDE CREAR");
            const newUserCreated = {
                id : generarCódigoAleatorio(20),
                name: newNameInput.value,
                clave: newPassInput.value
            }

            postNewUser(newUserCreated);
            userName = newUserCreated.name;
            usersArr.push(newUserCreated);
            start();
            
        } else {
            console.log("NOMBRE DE USUARIO EN USO");
        }

    }
});

const switchUserBtn = document.querySelector(".login-create-switch-btn");
const userSpans = document.querySelector(".inputs-spans");
switchUserBtn.addEventListener("click", () => {
    if(switchUserBtn.value === '1'){
        userSpans.children[0].style.display = "flex";
        userSpans.children[1].style.display = "none";
        switchUserBtn.textContent = "Crear nuevo usuario";
        switchUserBtn.value = '0';
    } else {
        userSpans.children[0].style.display = "none";
        userSpans.children[1].style.display = "flex";
        switchUserBtn.textContent = "Ya tengo cuenta";
        switchUserBtn.value = '1';
    }
})

function generarCódigoAleatorio(longitud) {
    const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let código = '';
    for (let i = 0; i < longitud; i++) {
      código += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return código;
}