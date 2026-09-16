    let tasks = JSON.parse(localStorage.getItem("tasks")) ||[
    {
        id: 101,
        title: "Create Login Page",
        assignee: "Rahul",
        status: "In Progress",
        priority: "High",
        tags: ["Frontend", "React"]
    },
    {
        id: 102,
        title: "Create Payment API",
        assignee: "Aman",
        status: "Todo",
        priority: "Medium",
        tags: ["Backend", "API"]
    },

    {
        id: 103,
        title: "Fix Dashboard Bug",
        assignee: "Priya",
        status: "Completed",
        priority: "Low",
        tags: ["Bug", "Frontend"]
    },
    {
        id: 104,
        title: "Create Dashboard",
        assignee: "Priya",
        status: "Completed",
        priority: "Low",
        tags: ["Frontend", "HTML"]
    }
    ];
    function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
    // Total Tasks
    function filterByStatus(status) { 
        return tasks.filter((i) => { return i.status === status;}); }
    function upDatedTask (){
        const total = tasks.length;
        const todo = filterByStatus("Todo");
        const progress = filterByStatus("In Progress");
        const completed = filterByStatus("Completed");
        document.getElementById("total").innerHTML =
            "Total Tasks = " + total;
        document.getElementById("do").innerHTML =
            "Todo = " + todo.length;
        document.getElementById("progress").innerHTML =
            "In Progress = " + progress.length;
        document.getElementById("Completed").innerHTML =
            "Completed = " + completed.length;
    }
 //rendering the task   
    function rednderTasks(data =tasks){
    const show = data.map((i)=>{
    return `
        <tr>
        <td>${i.id}</td>
        <td>${i.title}</td>
        <td>${i.assignee}</td>
        <td>${i.status}</td>
        <td>${i.priority}</td>
        <td>${i.tags}</td>
        <td>
        <button onClick="handleedit(${i.id})">Edit</button>
        <button onClick="handledelete(${i.id})">Delete</button> </td>
        </tr> `;
    });
    document.getElementById("show").innerHTML = show.join(" "); }
//on function create rather than calling 3 function
    function refresh(){
        rednderTasks();
        saveTasks();
        upDatedTask();
    };
    //delete
    function handledelete(id){ 
    tasks =  tasks.filter((i)=>{
        return i.id !== id;})
        refresh();
    }
    //Edit
    function handleedit(id){
        const task = tasks.find((item)=>item.id === id)
         document.getElementById("TaskId").value = task.id;
         document.getElementById("title").value = task.title;
         document.getElementById("assignee").value = task.assignee;
         document.getElementById("status").value = task.status;
         document.getElementById("priority").value = task.priority;
         document.getElementById("tags").value = task.tags.join(" , ");
    }
  // Filter dropdown change
document.getElementById("searchBy").addEventListener("change", function () {
    const type = this.value;
    const value = document.getElementById("value");
    const search = document.getElementById("search");
    if (type === "status") {
        value.innerHTML = `
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        `;
        value.style.display = "inline-block";
        search.style.display = "none";
    }
    else if (type === "priority") {
        value.innerHTML = `
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        `;
        value.style.display = "inline-block";
        search.style.display = "none";
    }
    else {
        value.style.display = "none";
        search.style.display = "inline-block";
        search.value = "";
    }
});
// Apply Filter
document.getElementById("filterBtn").addEventListener("click", function () {
    const type = document.getElementById("searchBy").value;
    const searchText = document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();
    const selectedValue = document
        .getElementById("value")
        .value
        .toLowerCase();

    const filtered = tasks.filter(task => {
        if (type === "status") {
            return task.status.toLowerCase() === selectedValue;
        }
        if (type === "priority") {
            return task.priority.toLowerCase() === selectedValue;
        }
        if (type === "tags") {
            return task.tags
                .join(" ")
                .toLowerCase()
                .includes(searchText);
        }
        return task[type || "" ]
            .toString()
            .toLowerCase()
            .includes(searchText);
    });
    rednderTasks(filtered);
});
//add new task
const input = document.getElementById("taskForm");
input.addEventListener("submit", function(f) {
const newtask = {
        id: Number(document.getElementById("TaskId").value),
        title: document.getElementById("title").value,
        assignee: document.getElementById("assignee").value,
        status: document.getElementById("status").value,
        priority: document.getElementById("priority").value,
        tags: document.getElementById("tags").value.split(",")
    };
    const exists = tasks.findIndex((task) => {
        return task.id === newtask.id;
    });
    if (exists !== -1) {
        tasks[exists] = newtask;
    } else {
        tasks.push(newtask);
    }
   refresh();
});

refresh()
