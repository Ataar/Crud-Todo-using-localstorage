let cl = console.log;

let userForm = document.getElementById("userForm") 
// userForm id used with from  for binding submit event.

let todoInput = document.getElementById("todoInput")
// todoInput id is used with input element for getting the value from input feild

let mainUI = document.getElementById("mainUI") 
// 

let sBtn = document.getElementById('sBtn')

let uBtn = document.getElementById('uBtn')







 let todoArr = [
   {userName : 'Sameer Shaikh',userId : 1}
]
cl(todoArr)






const onCreate = (eve)=>{
   eve.preventDefault();  // to refresh the page is a by-default behavior of submit event.
   // so to stop that we use preventDefault().
   
   let newUser = {
      userName : todoInput.value,
      userId : generateUUID()
    };
    cl(newUser)
  
    todoArr.push(newUser)
    cl(todoArr)

  
   

   localStorage.setItem('adduser',JSON.stringify(todoArr))
   //We store the data in local storage because the page data is cleared as soon as we refresh.
   
   
   // here eve represent submit event and target represent userForm id on which we bined event.
   // after submiting value reset() will clear the input control.
   eve.target.reset()
  //  cl(todoArr)
   templatingUI(todoArr)
   
}






function generateUUID() {
   let d = new Date().getTime();
   let d2 = (performance && performance.now && performance.now() * 1000) || 0;
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     let r = Math.random() * 16; 
     if (d > 0) {
       r = (d + r) % 16 | 0;
       d = Math.floor(d / 16);
     } else {
       r = (d2 + r) % 16 | 0;
       d2 = Math.floor(d2 / 16);
     }
     return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
   });
 }
 //  console.log(generateUUID());
 

// **************************************************************************************************************************


 let templatingUI = (arr)=>{
  cl(arr)
  let result = `<ul class = 'list-group'>`;
  arr.forEach(add => {
     result+=`
     
       <li class = 'list-group-item' id ='${add.userId}'>
       
       <span>${add.userName}</span>

       <span>
       <button class="btn btn-primary px-3" onclick="onEdit(this)">Edit</button>
       <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
       </span>
       
       </li>
       `
     });
     result+=`</ul>`
     mainUI.innerHTML = result
       
  }

  if(localStorage.getItem('adduser')){ 
    // if there is the data in localstorage
    
    todoArr = JSON.parse(localStorage.getItem('adduser'))
    // get the data and store into todoArr 
    
  }

  templatingUI(todoArr)



  
// ****************************************************************************************************************




   let onEdit = (ele)=>{
   let getId = ele.closest("li").id
   cl(getId)
      
    localStorage.setItem('editId',getId)
  
     let getObj = todoArr.find(obj=>{
        return obj.userId==getId
     })
      todoInput.value = getObj.userName;
      sBtn.classList.add('d-none')
      uBtn.classList.remove('d-none')

 }


// ****************************************************************************************************************







 const onUpdate =  ()=>{
    let UpdateVal = todoInput.value 
    cl(UpdateVal)
    let updateId =localStorage.getItem('editId')
    cl(updateId)
    
    // todoArr.forEach(todo=>{
    //   if(todo.userId === updateId)
    //   {
    //     todo.userName = newUpdateVal
    //   }
         let getIndex = todoArr.findIndex(todo=>{
            return todo.userId==updateId
         })
         cl(getIndex)
         todoArr[getIndex].userName = UpdateVal;
         localStorage.setItem('adduser',JSON.stringify(todoArr))
         let li = document.getElementById(updateId)
         li.firstElementChild.innerHTML = UpdateVal

    userForm.reset()
    sBtn.classList.remove('d-none')
    uBtn.classList.add('d-none')
     
    }
    

// ****************************************************************************************************************

  



    const onDelete = (ele)=>{
             
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          let deleteObj = ele.closest("li").id;  // closest parent of button which is li
          let getIndex = todoArr.findIndex(obj => obj.userId == deleteObj);
          if (getIndex !== -1) {
            todoArr.splice(getIndex, 1);
            localStorage.setItem('adduser', JSON.stringify(todoArr));
            document.getElementById(deleteObj).remove();
          }
          Swal.fire({
            title: "Deleted!",
            text: "Selected Name has been deleted.",
            icon: "success",
            timer:2000
            
          });
        }
      });
      
      }
      
        
      
  
  
  // const onDelete = (ele)=>{
      
  //   let getConfigration = confirm('Are You Sure? You Want To Delete')
  //   cl(getConfigration)
     
  //   if(getConfigration)
  //   {
  //     cl('Deleted',ele)
  //     let deleteObj = ele.closest("li").id  // closest parent of button which is li
  //     cl(deleteObj)

  //     let getIndex = todoArr.findIndex(obj=>{
  //         return obj.userId==deleteObj
  //     })
  //     cl(getIndex)

  //     todoArr.splice(getIndex,1);
  //     localStorage.setItem('adduser',JSON.stringify(todoArr))
  //     document.getElementById(deleteObj).remove()

  //   }
  //   else{
  //     return
  //   }
      
  //   }








userForm.addEventListener('submit',onCreate)
uBtn.addEventListener('click',onUpdate)





// this represent  that HTML element on which we bined event.







