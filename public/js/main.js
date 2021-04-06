const deleteBtn = document.querySelectorAll('.del');
const todoItem = document.querySelectorAll('.todoItem span');
const toComplete = document.querySelectorAll('.todoItem span completed');

Array.from(deleteBtn).forEach((btn) => {
  btn.addEventListener('click', deleteToDo);
});

Array.from(todoItem).forEach((item) => {
  item.addEventListener('click', markComplete);
});

Array.from(toComplete).forEach((item) => {
  item.addEventListener('click', undoTask);
});

async function deleteToDo() {
  const todoText = this.parentNode.childNodes[1].innerText;
  try {
    const response = await fetch('deleteTask', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: todoText,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markComplete() {
  const todoText = this.parentNode.childNodes[1].innerText;
  try {
    const response = await fetch('markComplete', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: todoText,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
