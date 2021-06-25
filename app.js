const taskBtn = document.querySelector('.addBtn');
const todoInput = document.querySelector('#todoInput')
todoInput.addEventListener('keypress', event => {
    if(event.keyCode === 13) {
        if(event.target.value == '') {
            alert('Input should not be empty')
        } else if(hasNumber(event.target.value)) {
            alert('Input should not contain any numbers')
        } 
        else {
            UI.addTask(event.target.value)
        }
    }
})
taskBtn.addEventListener('click', event => {
    const userInput = event.currentTarget.previousElementSibling.value;

    const validatedInput = hasNumber(userInput)

    if(!validatedInput && userInput != '') {
        UI.addTask(userInput)
    } else if(userInput == ''){
        alert('input should not be empty')
    } else if (validatedInput) {
        alert('input should not contain any numbers')
    }
});
// function to check whether input contains number
function hasNumber(val) {
    return /\d/.test(val);
}


class UI {
    // dummy data; for now.
    static displayTasks() {
        const tasks = ['Take out trash', 'Do laundry', 'Visit park'];

        tasks.forEach(task => UI.addTask(task));
    }

    static addTask(task) {
        const tbody = document.querySelector('#tasks');

        const taskRow = document.createElement('tr');
        taskRow.className += 'task';
        taskRow.innerHTML = `
            <td><i class="far fa-check-circle complete"></i></td>
            <td>${task}</td>
            <td><a href="#" class="btn" id="editBtn"><i class="fas fa-edit edit"></i></a></td>
            <td><a href="#" class="btn" id="deleteBtn"><i class="fas fa-trash delete"></i></a></td>
        `;
        tbody.appendChild(taskRow);
        document.querySelector('#todoInput').value = '';
    }

    static taskEvents(event) {
        const eventTarget = event.target
        const targetClassName = event.target.classList 
        
        if(targetClassName.contains('complete')) {
            targetClassName.toggle('statusIcon');
            eventTarget.parentElement.nextElementSibling.classList.toggle('task');
        } 
        
        else if(targetClassName.contains('edit')) {
            let textEditableStatus = eventTarget.parentElement.parentElement.previousElementSibling;
            textEditableStatus.contentEditable=true;
            eventTarget.className = "fas fa-save save" 
        } else if (eventTarget.classList.contains('save')) {
            let textEditableStatus = eventTarget.parentElement.parentElement.previousElementSibling
            textEditableStatus.contentEditable = false
            eventTarget.className = "fas fa-edit edit"
        }
        
        else if(targetClassName.contains('delete')) {
            eventTarget.parentElement.parentElement.parentElement.remove();
        }
    }
}

// Ui events 
document.addEventListener('DOMContentLoaded', UI.displayTasks);

const tbody = document.querySelector('#tasks');
tbody.addEventListener('click', event => {
    UI.taskEvents(event);
})
