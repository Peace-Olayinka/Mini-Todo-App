var allUsers = []
const getPreviousDetails=()=>{
    if (localStorage.localStringUsers) {
        allUsers = JSON.parse(localStorage.getItem("localStringUsers"))
        console.log(allUsers)
         
    }  
}
// Validation
let regexforFName = /^([A-Z][\w]+)$/
let regexforLName = /^([A-Z][\w]+)$/
let regexforMail  = /^([\w]+)([@])([\w]+)([.])([\w]+)$/
let regexforPass  = /^([\w]{6,9})$/
const mySignUp=()=> {
        var myGender = myGen.value
        var myuserID =Math.round(Math.random()*1000000)
        var regDate = new Date()
        
        let newUsers = {
            firstname: fName.value,
            lastname:lName.value,
            email:inpMail.value,
            password:passW.value,
            gender: myGender,
            DOB: doBirth.value,
            userIdNum: myuserID,
            registrationDate: regDate,
            mySchedule:[]
        }

        if (fName.value=='' || lName.value=='' || inpMail.value==''|| passW.value=='') {
            mywarning.innerHTML = `<small class="text-danger"> fill out empty fields to continue!</small>`
            // alert('fill out this field to sign up')  
        }
        else if (!regexforMail.test(inpMail.value)) {
            mywarning.innerHTML = `<small class="text-danger"> Invalid Email Address!!!</small>`
            inpMail.className ="form-control is invalid"
            console.log(' Email Adress is not correct!')
        }
        else if (!regexforPass.test(passW.value)) {
            mywarning.innerHTML = `<small class="text-danger"> Invalid  Password!!! <br> Password must contain minimum of 6 characters and maximum of 9 characters</small>`
            passW.className ="form-control is invalid"
            console.log(' Password is not correct')
            
        }
        else if (!regexforFName.test(fName.value)) {
            mywarning.innerHTML = `<small class="text-danger"> First Name must start with CAPITAL LETTER!!!</small>`
            fName.className ="form-control is invalid"
            console.log(' First Name is not correct')   
        }
        else if (!regexforLName.test(lName.value)) {
            mywarning.innerHTML = `<small class="text-danger"> Last Name must start with CAPITAL LETTER!!!</small>`
            lName.className ="form-control is invalid"
            console.log('Last Name not correct')     
        }
        else{
            allUsers.push(newUsers)
            console.log(allUsers)
            fName.value =''
            lName.value =''
            inpMail.value =''
            passW.value =''
           let stringAllUsers = JSON.stringify(allUsers)
           localStorage.setItem("localStringUsers", stringAllUsers)
    
           window.location.href= "loginPage.html"
        }       
}


// const personalTodo=()=>{
//     if (localStorage.localStringUsersTodo) {
//         mySchedule = JSON.parse(localStorage.getItem("localStringUsersTodo"))
//         console.log(mySchedule)
       
//         dispbox.innerHTML = ""
//         for (let index = 0; index < mySchedule.length; index++) {
//                 dispbox.innerHTML += `
//                 <tr id="tee">
//                 <td id="tee">${index}</td>
//                 <td id="tee"><h6>${mySchedule[index]}</h6></td>
//                 <td id="tee"><button id="yellowbtn"onclick="editTodo(${index})" >Edit</button></td>
//                 <td id="tee"><button id="redbtn" onclick="delTodo(${index})">Delete</button></td>
//                 </tr>
//                 `
//         }          
//     }    
// }


