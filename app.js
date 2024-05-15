// Initialize Firebase with your config
firebase.initializeApp({
    apiKey: "AIzaSyAqpDcSarPTXrjKD_xT0oWiR0uI8k5wlXM",
    authDomain: "waigi-apps.firebaseapp.com",
    projectId: "waigi-apps",
    storageBucket: "waigi-apps.appspot.com",
    messagingSenderId: "1054431342386",
    appId: "1:1054431342386:web:cf9a99c602cd05284bb12b"
});

const db = firebase.firestore();

// Function to add a task
function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();

    var taskId = document.getElementById("task-id").value;
    if (task && taskId !== "") {
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore. FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
    }
}

// Function to render tasks

function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item"
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

// Real-time listener for tasks
db.collection("tasks")
.orderBy("timestamp", "desc")
.onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    });
});

// Function to delete a task

function deleteTask(id) {
    db.collection("tasks").doc(id).delete();

}

