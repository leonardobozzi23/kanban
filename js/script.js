let tarefas = document.querySelectorAll('.task');
let progress = document.getElementById('progress');
let dropzone = document.querySelectorAll('.dropzone');

let trash = document.querySelector('.trash');


function taskEach(v){
    v.forEach(element => {
        element.addEventListener('dragstart', () => {
            element.classList.add('is-dragging');
            element.classList.remove('progressCard');
            element.classList.remove('reviewCard');
            element.classList.remove('completeCard');
            trash.style.display = 'block';
            
        });
        function classBorderStatus(){
            if(element.parentElement.classList.contains('progress')){
                element.classList.add('progressCard');
            }else if(element.parentElement.classList.contains('review')){
                element.classList.add('reviewCard');
            }else if(element.parentElement.classList.contains('complete')){
                element.classList.add('completeCard');
            }
        }
        element.addEventListener('dragend', () => {
            element.classList.remove('is-dragging');
            classBorderStatus();
            trash.style.display = 'none';
            removeTask();
            
        })
        classBorderStatus();
    });
}

taskEach(tarefas);

dropzone.forEach(droptarget => {
    droptarget.addEventListener('dragover', () => {
        droptarget.classList.add('ondiv');
        const cardIsDragging = document.querySelector('.is-dragging');
        droptarget.appendChild(cardIsDragging);
    });

    droptarget.addEventListener('dragleave', () => {
        droptarget.classList.remove('ondiv');
    });  
});


function addNewTask(){
    let createNewTask = document.createElement('div');
    createNewTask.setAttribute('class', 'task');
    createNewTask.setAttribute('draggable', 'true');

    let nameUser = document.querySelector('input[id=nameUser]').value;
    let taskinput = document.querySelector('input[id=taskInput]').value;

    let txtTask = '';
    txtTask = taskinput;
    let pTask = document.createElement('p');

    pTask.innerHTML = txtTask;

    createNewTask.appendChild(pTask);

    let ajax = new XMLHttpRequest();
    ajax.open('GET', `https://api.github.com/users/${nameUser}`);
    ajax.send(null);

    ajax.onreadystatechange = function(){
        let paragraf1 = document.createElement('p');
        let pUser = '';

        if(ajax.readyState === 4){
            if(ajax.status === 200){
                let user = '';

                user = JSON.parse(ajax.responseText);

                if(user['name'] !== null){
                    pUser = document.createTextNode(user['name']);

                    let img = document.createElement('img');
                    img.setAttribute('src', user['avatar_url']);
                    img.setAttribute('alt', user['name']);
                    img.setAttribute('width', '25px');
                    img.setAttribute('height', '25px');

                    createNewTask.appendChild(img);
                }
            }
        }
        console.log(pUser);
        let savingText = document.innerHTML = pUser;

        paragraf1.appendChild(savingText);
        createNewTask.appendChild(paragraf1);
    }

    dropzone[1].appendChild(createNewTask);
    if(createNewTask.parentNode.classList.contains('progress')){
        createNewTask.classList.add('progressCard');
    }
}

let btnAddTask = document.querySelector('#add-task');
btnAddTask.addEventListener('click', function adding(event){
    addNewTask();
    let tarefasRefresh = document.querySelectorAll('.task');
    event.preventDefault();
    
    taskEach(tarefasRefresh);
    document.querySelector('input[id=nameUser]').value = '';
    document.querySelector('input[id=taskInput]').value = '';

});

function removeTask(){
    let taskRemove = document.querySelector('.task');
    if(taskRemove.parentNode.classList.contains('trash')){
        taskRemove.classList.add('removing');
    }
    trash.removeChild(taskRemove);
}