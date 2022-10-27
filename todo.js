let mySchedule = []
   
let allUsers = JSON.parse(localStorage.getItem("localStringUsers")) 
let activeUser = localStorage.getItem('activeUser')

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

                mySchedule = JSON.parse(localStorage.getItem("localStringUsersTodo"))
                myOutput() 

                console.log(mySchedule)
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
        mySchedule.push(userTodo)
        // mySchedule.reverse()
        console.log(mySchedule)
        myOutput() 
        let stringAllUsersTodo = JSON.stringify(mySchedule)
        localStorage.setItem("localStringUsersTodo", stringAllUsersTodo)
    }   
}

// to delete/clear all todo items
function clearAll() {
  let confirmation= confirm('Are you sure you want to delete All Todo items?')
    if (confirmation) {
        mySchedule.splice(0,mySchedule.length)
        console.log(mySchedule)
        myOutput() 
        updateTodo()   
    }
}


function myOutput() {
    dispbox.innerHTML = ""
    for (let index = 0; index < mySchedule.length; index++) {
        let serialNum = index +1
        if (mySchedule[index].done) {
            // i.e if we are done, value of done is true
            dispbox.innerHTML += `
            <tr id="tee">
            <td id="tee">${serialNum}</td>
            <td id="tee"><h6 style="color:green">${mySchedule[index].name}</h6></td>
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
            <td id="tee"><h6 style="color:red">${mySchedule[index].name}</h6></td>
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
    // document.getElementById("showcount").innerHTML =`You have  ${mySchedule.length} upcoming activities in your schedule`
    let counting
    for (let index = 0; index < mySchedule.length; index++) {
       if (!mySchedule[index].done) {
            counting+=1
            document.getElementById("showcount").innerHTML =`You have  ${counting} upcoming activities in your schedule`
       }  
    }
    // if (mySchedule.length<1) {
    //     document.getElementById("showcount").innerHTML =`You have no upcoming activities in your schedule`
    // }
    // else if(mySchedule.length>0){
    //     document.getElementById("showcount").innerHTML =`You have  ${mySchedule.length} upcoming activities in your schedule`
    // }
    // if( mySchedule[index].done) {
    //      let counting=mySchedule.length
    //      counting = mySchedule.length-1
    //      document.getElementById("showcount").innerHTML =`You have  ${counting} upcoming activities in your schedule`   
    // }
}

// to delete/clear a specific todo item
function delTodo(index) {
    let confirmation= confirm('Are you sure you want to remove this from your Todo?')
    if (confirmation) {
        mySchedule.splice(index, 1)
        console.log(mySchedule) 
        myOutput()  
        updateTodo()          
    }
}

// to edit/replace a specific todo item
function editTodo(index) {
    var newTodo = prompt("Edit your todo here")
    if (newTodo) {
        mySchedule.splice(index, 1, newTodo)
        // Alternative to splice method:
        // mySchedule[index] =newTodo
        console.log(mySchedule) 
        myOutput() 
        updateTodo()         
    }
}

function updateTodo() {
    let stringAllUsersTodo = JSON.stringify(mySchedule)
    localStorage.setItem("localStringUsersTodo", stringAllUsersTodo)
} 

function markTodo(index) {
    alert('sure?')
    mySchedule[index].done = true
    myOutput()
    updateTodo() 
    console.log(mySchedule[index])          
}

// Alternatives to prompt method:
// bootstrap modal can also be used to generate input from users just like prompt PaymentMethodChangeEvent, read more about it, 

// we can also use the original input field to generate data to edit/replace the existing one, then update it (probably a button would do the update function)
