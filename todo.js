let allUsers = JSON.parse(localStorage.getItem("localStringUsers")) 
let activeUser = localStorage.getItem('activeUser')
let userIndex = localStorage.getItem('userIndex')
// let personalTodo = JSON.parse(localStorage.getItem("localStringUsersTodo"))

const getPreviousSchedule=()=>{   
    if (activeUser) {
        allUsers = JSON.parse(localStorage.getItem("localStringUsers"))
        for (let index = 0; index < allUsers.length; index++) {
            if (allUsers[index].email == activeUser) {
                myWelcome.innerHTML =`
                <h3> Welcome, ${allUsers[index].firstname} ${allUsers[index].lastname}</h3>
                <h6> Add new activities and update your Scedule</h6>      
                ` 
                console.log(allUsers[index].firstname, allUsers[index].lastname)
                console.log(index)
                
            } 
        }
    }
    if (userIndex) {
        for (let index = 0; index < allUsers.length; index++) {
            if (index==userIndex) {
                myOutput() 
                console.log(userIndex)
                console.log(allUsers)
            }
            
        }
    }
}

// NOTE:
// mySchedule.unshift(userTodo) opposite of push method, it add new item to an array from the start
// console.log(mySchedule)
//note: using reverse method after .push will re-arrange my array to make the last item come first (an alternative to unshift method) i.e:
// mySchedule.push(userTodo)
// mySchedule.reverse()

function addHere() {
    let userTodoName = userInp.value
    let userTodo ={name: userTodoName, done:false}
    userInp.value= ""
    if (!userTodoName) {
        alert('Todo field cannot be empty!')
        return
    }
    else{
        allUsers[userIndex].personalTodo.push(userTodo)
        //allUsers[userIndex].personalTodo.reverse()
        console.log(allUsers[userIndex].personalTodo)
        myOutput() 
        // updateTodo()
        let stringAllUsers = JSON.stringify(allUsers)
        localStorage.setItem("localStringUsers", stringAllUsers)
  
    } 
}

// to delete/clear all todo items
function clearAll() {
  let confirmation= confirm('Are you sure you want to delete All Todo items?')
    if (confirmation) {
        allUsers[userIndex].personalTodo.splice(0,allUsers[userIndex].personalTodo.length)
        console.log(allUsers[userIndex].personalTodo)
        myOutput() 
        updateTodo()   
    }
}

// to delete/clear a specific todo item
function delTodo(index) {
    let confirmation= confirm('Are you sure you want to remove this from your Todo?')
    if (confirmation) {
        allUsers[userIndex].personalTodo.splice(index, 1)
        console.log(allUsers[userIndex].personalTodo) 
        myOutput()  
        updateTodo()          
    }
}

// to edit/replace a specific todo item
function editTodo(index) {
    var newTodo = prompt("Edit your todo here")
    if (newTodo) {
        allUsers[userIndex].personalTodo[index].name = newTodo
        console.log(allUsers[userIndex].personalTodo) 
        myOutput() 
        updateTodo()         
    }
}

function markTodo(index) {
    alert('Are you sure ypu have completed this task and ready to mark as done?')
    allUsers[userIndex].personalTodo[index].done = true
    myOutput()
    updateTodo() 
    console.log(allUsers[userIndex].personalTodo[index])          
}

function updateTodo() {
    let stringAllUsers = JSON.stringify(allUsers)
    localStorage.setItem("localStringUsers", stringAllUsers)
} 

function myOutput() {
    dispbox.innerHTML = ""
    for (let index = 0; index < allUsers[userIndex].personalTodo.length; index++) {
        let serialNum = index +1
        if (allUsers[userIndex].personalTodo[index].done) {
            // i.e if we are done, value of done is true
            dispbox.innerHTML += `
            <tr id="tee">
            <td id="tee">${serialNum}</td>
            <td id="tee"><h6 style="color:green">${ allUsers[userIndex].personalTodo[index].name}</h6></td>
            <td id="tee"><button id="greenbtn" >Task Done</button></td>
            <td id="tee"><button id="yellowbtn" onclick="editTodo(${index})" >Edit</button></td>
            <td id="tee"><button id="redbtn" onclick="delTodo(${index})">Delete</button></td>
            </tr>
            `   
        }else{
            // i.e we are not done,value of done is false
            dispbox.innerHTML += `
            <tr id="tee">
            <td id="tee">${serialNum}</td>
            <td id="tee"><h6 style="color:red">${ allUsers[userIndex].personalTodo[index].name}</h6></td>
            <td id="tee"><button id="ashbtn" onclick="markTodo(${index})" >Mark as Done</button></td>
            <td id="tee"><button id="yellowbtn" onclick="editTodo(${index})" >Edit</button></td>
            <td id="tee"><button id="redbtn" onclick="delTodo(${index})">Delete</button></td>
            </tr>
            `   
        }
    } 
    showCount()  
}

function showCount(){
    if (allUsers[userIndex].personalTodo.length<1) {
        document.getElementById("showcount").innerHTML =`Your schedule is not updated, add new task to update your schedule`
    }
    let counting = 0
    for (let index = 0; index <allUsers[userIndex].personalTodo.length; index++) {
         if(!allUsers[userIndex].personalTodo[index].done) {
            counting +=1
            document.getElementById("showcount").innerHTML =`You have  ${counting} pending task in your schedule`
        }
        if (counting<1) {
            document.getElementById("showcount").innerHTML =`<span class="text-success"> All tasks DONE. You have no pending task in your schedule </span>` 

        }
    }
       
}

const myLogOut =()=>{
    localStorage.removeItem("activeUser")
    localStorage.removeItem("userIndex")
    window.location.href = "loginPage.html"
}




// Alternatives to prompt method:
// bootstrap modal can also be used to generate input from users just like prompt PaymentMethodChangeEvent, read more about it, 

// we can also use the original input field to generate data to edit/replace the existing one, then update it (probably a button would do the update function)
