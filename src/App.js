import React, { useEffect, useState } from 'react';
import './App.css';
import {Button,EditableText,InputGroup,Toaster} from '@blueprintjs/core'


const AppToaster = Toaster.create({
  position:"top"
})

function App() {
  const[users,setUsers]=useState([]);
  const [newName,setNewName] =useState("")
  const [newEmail,setNewEmail] =useState("")
  const [newWebsite,setNewWebsite] =useState("")

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=> response.json())
    .then((json)=> setUsers(json))

  },[])

function addUser(){
  const name = newName.trim();
  const email = newEmail.trim();
  const website = newWebsite.trim();

  if ( name && email && website) {

    fetch("https://jsonplaceholder.typicode.com/users",
    {
      method:"POST",
      body: JSON.stringify({
          name,
          email,
          website
      }),
      headers:{
          "Content-Type" :"application/json; charset=UTF-8 "
      }
    }
    
    
    ).then((res)=>res.json())
    .then(data=>{
      setUsers([...users,data]);
      AppToaster.show({
        message:"user added successfully",
        intent:"success",
        timeout:1000
      })
      setNewName('')
      setNewEmail('')
      setNewWebsite('')

    })
    
  }
}

function onchangeHandler(id,key,value) {
  setUsers((users)=>{
       return users.map((user)=>{
         return user.id ===id ?{...user ,[key]:value} : user
      })
  })
}
function updateUser(id) {
   const user = users.find((user)=> user.id === id);

   fetch(`https://jsonplaceholder.typicode.com/users/10`,

    // fetch(`https://jsonplaceholder.typicode.com/users/ ${id}`,
    {
      method:"PUT",
      body: JSON.stringify(user),
      headers:{
          "Content-Type" :"application/json; charset=UTF-8 "
      }
    }
    
    
    ).then((res)=>res.json()) 
    .then(data=>{
      AppToaster.show({
        message:"User updated successfully",
        intent:"success",
        timeout:2000
      })
    })
}

function deleteUser(id) {

  // fetch(`https://jsonplaceholder.typicode.com/users/10`,

   fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
   {
     method:"DELETE",
   }
   
   
   ).then((res)=>res.json())  
   .then(data=>{
       setUsers((users)=>{
        return users.filter((user)=> user.id!== id)
       })
     AppToaster.show({
       message:"User deleted successfully",
       intent:"success",
       timeout:2000
     })
   })
}



  return (
    <div className="App">
        <table className="bp4-html-table modifier">
          <thead>
              <th>Id</th>
              <th>Username</th>
              <th>Email</th>
              <th>website</th>
              <th>Edit and Delete</th>
          </thead>
          <tbody>
              {users.map((user)=>
                <tr key={user.id}>
                    <td><EditableText value={user.id} /></td>
                    <td><EditableText value={user.name} /></td>
                    <td><EditableText onChange={value=>onchangeHandler(user.id,'email',value)} value={user.email} /></td>
                    <td><EditableText onChange={value=>onchangeHandler(user.id,'website',value)} value={user.website} /></td>
                    <td>
                    <Button intent='primary' onClick={()=>updateUser(user.id)}>Update</Button>
                    &nbsp;
                    <Button intent='danger' onClick={()=>{deleteUser(user.id)}}>Delete</Button> 
                    </td>
                </tr>
              )}

          </tbody>
          <tfoot>
            <tr>
             <td></td>
             <td>
                  <InputGroup
                    value={newName}
                    onChange={(e) => setNewName(e.target.value) }
                    placeholder='enter the Name'
                  />
              </td>
              <td>
                  <InputGroup
                    value={newEmail}
                    onChange={(e)=>setNewEmail(e.target.value)}
                    placeholder='enter the Email'
                  />
              </td>
              <td>
                  <InputGroup
                    value={newWebsite}
                    onChange={(e)=>setNewWebsite(e.target.value)}
                    placeholder='enter the website'
                  />
              </td>
              <Button intent='success' onClick={addUser}>Add User</Button>
              

            </tr>
          </tfoot>
        </table>
    </div>
  );
}

export default App;
