let input = document.querySelector("#input");
let add = document.querySelector("#add");
let ul = document.querySelector("#ul");




//--add task
function addTask() {
    if(input.value.trim() !== "") {

        let li = document.createElement("li");
        li.innerHTML = `
        <i class="grab fa-solid fa-grip-vertical"></i>
        <div class="task">
        <span class="check-text">
            <i class="check fa-regular fa-square"></i>
            <input class="task-input" value="${input.value.trim()}" disabled autocomplete="off" spellcheck="false">
        </span>
        <span class="icons">
            <i class="edit fa-regular fa-pen-to-square"></i>
            <i class="clone fa-regular fa-clone"></i>
            <i class="delete fa-regular fa-trash-can"></i>
        </span>
        </div>
        `;
        li.setAttribute("class","li")
        ul.append(li);
        input.value ="";
        
        updateCount();
    }
    if(ul.children.length > 1) {
        ul.querySelector(".default").remove();
    }
    
};

add.addEventListener("click", addTask);

input.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        addTask();
    }
});

//--check
ul.addEventListener("click", (e) => {
    if(e.target.classList.contains("check") ) {
        e.target.classList.toggle("fa-regular");
        e.target.classList.toggle("fa-square");
        e.target.classList.toggle("fa-solid");
        e.target.classList.toggle("fa-square-check");
        
        let div = e.target.closest("div");
        div.classList.toggle("done");

        let edit = div.querySelector(".edit");
        edit.classList.toggle("none");

        let clone = div.querySelector(".clone");
        clone.classList.toggle("none");

//-delete        
    }else if(e.target.classList.contains("delete")) {
        e.target.closest("li").remove();
        if(ul.children.length == 0) {
            ul.innerHTML=`<p class="default">- No Tasks Yet -</p>`;
        }

        updateCount();
}



//--clone
    else if(e.target.classList.contains("clone")) {
        let cloner = e.target.closest("li");
        let cloned = cloner.cloneNode(true);

        cloner.insertAdjacentElement("afterend", cloned);
        updateCount();
    }



//--edit
    else if(e.target.classList.contains("edit")) {
        let div = e.target.closest("div");
        let input2 = div.querySelector(".task-input");
        
        div.querySelector(".clone").classList.toggle("none");
        div.querySelector(".check").classList.toggle("none");
        
        e.target.classList.toggle("fa-regular");
        e.target.classList.toggle("fa-pen-to-square");
        
        e.target.classList.toggle("fa-solid");
        e.target.classList.toggle("fa-check");

        input2.classList.toggle("editable");
        
        
        if(input2.hasAttribute("disabled")) {
            input2.removeAttribute("disabled");
            input2.focus();
            let lastChar = input2.value.length;
            input2.setSelectionRange(lastChar, lastChar);
        }else if(input2.value.trim() === "") {
            e.target.closest("li").remove();
            if(ul.children.length == 0){
                ul.innerHTML=`<p class="default">- No Tasks Yet -</p>`;
            }
        }else {
            input2.setAttribute("disabled", "disabled");
        }
        updateCount();
    }   
});



//--clear all
let head = document.querySelector(".list-head");

head.addEventListener("click", (e) => {
    if(e.target.className.includes("clear")) {
        let allCheck = document.querySelectorAll(".check");
        allCheck.forEach(check => {
            check.classList.remove("fa-solid", "fa-square-check");
            check.classList.add("fa-regular", "fa-square");
        });

        let alldivs = document.querySelectorAll(".task");
        alldivs.forEach(div => {
            div.classList.remove("done");
        });


        let edits = document.querySelectorAll(".edit");
        edits.forEach(edit => {
            edit.classList.remove("none");
        });

        
        let clones = document.querySelectorAll(".clone");
        clones.forEach(clone => {
            clone.classList.remove("none");
        });

}


//--delete all
    else if(e.target.className.includes("delete")){
        let alltasks = document.querySelectorAll(".li");
        alltasks.forEach(task => {
            task.remove();
            if(ul.children.length == 0) {
                ul.innerHTML=`<p class="default">- No Tasks Yet -</p>`;
            }
        });
        updateCount();
    }
});

//--count 

function updateCount() {
    let count = ul.querySelectorAll(".li").length;
    let total = document.querySelector(".total");

    total.textContent = count;
} 


//--sort
new Sortable(ul, {
    handle: '.grab', 
    animation: 150,  
});


