const taskBtn = document.querySelector('.addBtn');
taskBtn.addEventListener('click', event => {
    UI.addTask(event.currentTarget.previousElementSibling.value);
});

class UI {
    // This will add the inputed task along with the delete, edit and status btn
    static addTask(task) {
        const tbody = document.querySelector('#tasks');

        const taskRow = document.createElement('tr');
        taskRow.className += 'task';
        taskRow.innerHTML = `
            <td><i class="far fa-check-circle"></i></td>
            <td class="taskItem">${task}</td>
            <td><a href="#" class="btn" id="editBtn"><i class="fas fa-edit edit"></i></a></td>
            <td><a href="#" class="btn" id="deleteBtn"><i class="fas fa-trash delete"></i></a></td>
        `;
        tbody.appendChild(taskRow);
        document.querySelector('#todoInput').value = '';
    }

    static taskEvents(eventTarget) {
        const targetClassName = eventTarget.classList 
        if(targetClassName.contains('taskItem')) {
            targetClassName.toggle('task');
            eventTarget.previousElementSibling.classList.toggle('statusIcon');
        } else if(targetClassName.contains('edit')) {
            // Code to edit the task content
            // things to do here : 
            /*
            on clicking the edit icon, it should change to a save icon until the user clicks it so save the changes.
            check if .task class is added to the taskContent, if yes then remove it. (This is to remove the stylings applied when the user marks the task as completed)
            add new attribute contenteditable and set it to true, after editing the text the save icon should save the edited text
            */
        } else if(targetClassName.contains('delete')) {
            eventTarget.parentElement.parentElement.parentElement.remove();
        }
    }
}

// Ui events 
const tbody = document.querySelector('#tasks');
tbody.addEventListener('click', event => {
    UI.taskEvents(event.target);
})