import React, { useEffect, useState } from 'react'


const Todo = () => {
    
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const[todos,setTodos] =useState([]);
    const [error,setError]=useState("");
    const [message,setMessage]=useState("");
    const [editId,setEditId]=useState(-1);


    const [editTitle,setEditTitle]=useState('');
    const [editDescription,setEditDescription]=useState('');

    const apiUrl="http://localhost:8000"
    

    const handleSubmit =()=>{
      setError("")
       if(title.trim()!=='' && description.trim()!==''){

           fetch(apiUrl+"/todos",{
             method:"post",
             headers:{
                'Content-Type':'application/json'
             },
             body:JSON.stringify({title,description})

           }).then((res)=>{
            if(res.ok){
              setTodos([...todos,{title,description}])
              setMessage("add item successfully")
              setTimeout(()=>{
                setMessage("")
              },3000)

            }else{
              setError("unable to create todo item")

            }
           


           }).catch(()=>{


            setError("unable to create todo item")
           })
            

       }
    }

    useEffect(()=>{

         getItems()

    },[])

     const getItems=()=>{
      fetch(apiUrl+"/todos")
      .then((res)=>{

         return res.json()

      }).then((res)=>{
        setTodos(res)

      })


     }
     const handleUpdate =()=>{

      setError("")
      if(editTitle.trim()!=='' && editDescription.trim()!==''){

          fetch(apiUrl+"/todos/"+editId,{
            method:"put",
            headers:{
               'Content-Type':'application/json'
            },
            body:JSON.stringify({title:editTitle,description:editDescription})

          }).then((res)=>{
           if(res.ok){
            const updatedTodos=todos.map((item)=>{
               if( item._id==editId){
                item.title=editTitle;
                item.description=editDescription;
               }
               return item

            })
             setTodos(updatedTodos)
             setMessage("add item successfully")
             setTimeout(()=>{
               setMessage("")
             },3000)
             setEditId(-1)

           }else{
             setError("unable to create todo item")

           }
          


          }).catch(()=>{


           setError("unable to create todo item")
          })
           

      }




     }
    const  handleEdit =(item)=>{
      setEditId(item._id);
      setEditTitle(item.title)
      setEditDescription(item.description)



     }
     const handleEditCancel =()=>{

         setEditId(-1)
      
     }
     const handleDelete=(id)=>{
            if(window.confirm("are you sure want to delete")){

               fetch(apiUrl+"/todos/"+id,{
                method:"DELETE"

               }).then(()=>{
                   const updatedTodos= todos.filter((item)=> item._id !==id)
                    setTodos(updatedTodos)

               })
            }


     }




  return (
    <>
    <div className='row p-3 bg-success text-light'>
     <h1>Todo project </h1>
    </div>
    <div className="row">
        <h3>Add item</h3>
       { message && <p className='text-success'>{message}</p>}
       <div className='form-group d-flex gap-2'>
        <input placeholder='Title' onChange={(e)=>setTitle(e.target.value)} value={title} className="form-control" type="text"></input>
        <input placeholder='Description' onChange={(e)=>setDescription(e.target.value)} value={description}  className="form-control" type="text"></input>
        <button className="btn btn-dark" onClick={handleSubmit} >submit</button>
       </div>
      {error && <p className="text-danger">{error}</p>} 
    </div>
    <div className="row mt-3">
      <h3>tasks   </h3>
      <ul className="list-group">
            {
            todos.map((item)=>

              <li className="list-group-item bg-info d-flex justify-content-between align-items-center my-2">
                 <div className="d-flex flex-column me-2">

                  {
                    editId ==-1 || editId !== item._id ?<>
                     <span className="fw-bold">{item.title}</span>
                     <span className="">{item.description}</span>
                    
                    </>:
                    <>
                     <div className='form-group d-flex gap-2'>
                     <input placeholder='Title'onChange={(e)=>setEditTitle(e.target.value)} value={editTitle} className="form-control" type="text"></input>
                    <input placeholder='Description' onChange={(e)=>setEditDescription(e.target.value)} value={editDescription}  className="form-control" type="text"></input>
                      
                    </div>
                    
                    </>




                  }
                    
                  </div>
                   <div className="d-flex gap-2">
                    {
                 editId==-1 || editId !== item._id?<>
                  <button className=" btn btn-warning"onClick={()=>handleEdit(item)} >Edit</button>
                  <button className="btn btn-danger" onClick={()=>handleDelete(item._id)}>Delete</button>
                 </>:<>
                 
                <button className="btn btn-warning" onClick={handleUpdate}>update</button>
                <button className="btn btn-danger" onClick={handleEditCancel}>cancel</button>
                 </>

                    }
                   
                    
                    
                  </div>
              </li>


            )

            }

       
       


      </ul>

    </div>
    
    </>
    
  )
}

export default Todo
