window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input")
    const list_el = document.querySelector("#tasks");
   

    if(localStorage.length != 0)
   { 
    var last_index = JSON.parse(localStorage.getItem("Tasks")).length;
    for (let index = 0; index < last_index; index++) {
       
        const task_el = document.createElement("div"); // create a task 
        task_el.classList.add("task");

        const task_content_el = document.createElement("div"); // set the content of the task 
        task_content_el.classList.add("content")

        // creatimg the text input 
        // intead of just adding the input task we style it 
        //and then append it as a child

        const task_input_el = document.createElement("input"); // creating an iput field
        task_input_el.classList.add("text");
        task_input_el.type = "text"
        
        // console.log(storesize);
        task_input_el.value = JSON.parse(localStorage.getItem("Tasks"))[index];
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        task_el.appendChild(task_content_el); // you attach the content of the tast to the task


        //create the div that holds edit and delete 
        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button"); // the edit button 
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button"); // the delete buttom 
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";
        
        task_actions_el.appendChild(task_edit_el); // appeend the actions to the action div 
        task_actions_el.appendChild(task_delete_el); 

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el); // you add the task to the list 

        input.value = "";
      
        let the_list = JSON.parse(localStorage.getItem('Tasks'));
        let j = 0

        task_edit_el.addEventListener('click', ()=> {
           

            if(task_edit_el.innerText.toLocaleLowerCase() == "edit"){
               
                while(task_input_el.value.toLocaleLowerCase() != the_list[j].toLocaleLowerCase()){
                    j++;
                }

                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            }
            else{
                task_input_el.setAttribute("readonly","readonly");
                the_list[j]= task_input_el.value;
                localStorage.setItem('Tasks', JSON.stringify(the_list));
                task_edit_el.innerText = "Edit";
            }
        });

        task_delete_el.addEventListener('click', ()=>{
                list_el.removeChild(task_el);

                while(task_input_el.value.toLocaleLowerCase() != the_list[j].toLocaleLowerCase()){
                    j++;
                }

                the_list.splice(j, 1);
                    

                localStorage.setItem('Tasks', JSON.stringify(the_list));

                const reload = document.location.reload(1);


        });

       
    }}

    form.addEventListener('submit', (e)=>{
        e.preventDefault();


        const task = input.value;
//
        if(!task){
            alert("add task");
            return;
        }

        if(localStorage.getItem('Tasks') == null) {
            localStorage.setItem('Tasks','[]');
        }

        var old_list = JSON.parse( localStorage.getItem('Tasks'));
        old_list.push(task);

        localStorage.setItem('Tasks',JSON.stringify(old_list));
        
//
        
        

    const reload = document.location.reload(1);
    })
})