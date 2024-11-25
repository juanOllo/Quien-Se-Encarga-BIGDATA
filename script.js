let addTaskBtn = document.querySelector(".add-task");
let inputTask = document.querySelector(".input-task");
// EL TEXTAREA LO IMPLEMENTARE DESP DEL BACKEND
// let inputTaskInformation = document.querySelector(".input-task-information");
const taskList = document.querySelector(".tasks-list");


// localStorage.setItem("user", "juan");
localStorage.setItem("user", "");
let userName = localStorage.getItem("user") || "";

showData();

function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

function showData() {
    taskList.innerHTML = localStorage.getItem("data") || "";
    showSomeBtns();
}

// Usar delegación de eventos en el contenedor padre (taskList)
taskList.addEventListener("click", (e) => {
    const dad = e.target.parentElement;

    if (e.target.classList.contains("task-delete-btn")) {
        if(confirm(`Borrar tarea "${dad.children[1].textContent}" ?`)) {
            e.target.parentElement.remove();
            saveData();
        }
    }

    if (e.target.classList.contains("yo-btn")) {
        if(dad.children[3].value === ""){
            e.target.innerText = `Se encarga ${userName}!!🤚`;
            e.target.value = userName;
            e.target.style.backgroundColor = "var(--azul)";
        }
        saveData();
    }

    if (e.target.classList.contains("abandonar-btn")) {
        const superDad = dad.parentElement;
        if(superDad.children[3].value === userName) {
            superDad.children[3].textContent = `Abandonado por ${userName}..😔 Encargarse?🤔`;
            superDad.children[3].style.backgroundColor = "var(--marron)";
            superDad.children[3].value = "";
        }
        saveData();
    }

    if (e.target.classList.contains("terminado-btn")) {
        const superDad = dad.parentElement;
        if(superDad.children[3].value === userName) {
            superDad.children[3].textContent = `Terminado por ${userName}!!😎👌`;
            superDad.children[3].style.backgroundColor = "var(--verde-claro)";
            superDad.children[3].value = "";
            superDad.children[1].style.textDecoration = "line-through";
            superDad.children[0].classList.add("task-check-btn-checked");
        }
        saveData();
    }
    showSomeBtns();


});

addTaskBtn.addEventListener("click", () => {
    if (inputTask.value !== "") {
        anim(inputTask, "add-task-anim-input 0.4s ease 0s forwards");
        // anim(inputTaskInformation, "add-task-anim-input-information 0.4s ease 0s forwards");
        anim(addTaskBtn ,"add-task-anim 0.4s ease 0s forwards");
        const taskP = inputTask.value;

        setTimeout(()=>{
            inputTask.value = "";
            // inputTaskInformation.value = "";
        }, 200)

        setTimeout(()=>{
            taskList.innerHTML = `
                <li class="task">
                    <div class="task-check-btn"></div>
                    <p class="task-p">${taskP}</p>
                    <button class="task-delete-btn" name="${userName}">X</button>
                    <button class="yo-btn" value="">Encargarse?🤔</button>
                    <div class="more-btns">
                        <button class="terminado-btn">Terminado!🤓</button>
                        <button class="abandonar-btn">Abandonar..😢</button>
                    </div>
                </li>
            ` + taskList.innerHTML;
            saveData();
            anim(taskList.children[0].children[0], "new-task-anim 0.5s ease-in-out 0s forwards");
            anim(taskList.children[0].children[1], "new-task-anim 0.5s ease-in-out 0s forwards");
            anim(taskList.children[0].children[2], "new-task-anim 0.5s ease-in-out 0s forwards");
        }, 180);
    }
});

const anim = (el, str, fin) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = str;
    setTimeout(()=>{
    el.style.animation = "none";
    }, 1000*fin || 1000);
}

function showSomeBtns() {
    const allYoBtns = document.querySelectorAll(".yo-btn");
    for(let b of allYoBtns) {
        if(b.value === userName){
            const auxDad = b.parentElement;
            auxDad.children[4].style.display= "flex";
        } else {
            const auxDad = b.parentElement;
            auxDad.children[4].style.display= "none";
        }
    }

    const allDeleteBtns = document.querySelectorAll(".task-delete-btn");
    for(let db of allDeleteBtns) {
        if(db.name === userName){
            db.style.display = "block"
        } else {
            db.style.display= "none";
        }
    }
}

const newNameBtn = document.querySelector(".new-name-btn");
const newNameInput = document.querySelector(".new-name-input");

newNameBtn.addEventListener("click", () => {
    if(newNameInput.value !== ""){
        localStorage.setItem("user", newNameInput.value);
        userName = newNameInput.value;
        console.log(userName);
        newNameBtn.parentElement.parentElement.style.display = "none";
        start();
        showSomeBtns();
        newNameInput.value = "";
    }
})

const newNameSection = document.getElementById("new-user");
const tasksSection = document.getElementById("main");

function start() {
    const userName = localStorage.getItem("user") || "";

    if(userName !== ""){
        newNameSection.style.display = "none";
        tasksSection.style.display = "block";
    }
}
start();