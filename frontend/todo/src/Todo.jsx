import React from 'react'

const Todo = () => {

    const handleSubmit =()=>{
       

    }


  return (
    <>
    <div className='row p-3 bg-success text-light'>
     <h1>Todo project </h1>
    </div>
    <div className="row">
        <h3>Add item</h3>
        <p className='text-success'>add item successfully</p>
       <div className='form-group d-flex gap-2'>
        <input placeholder='Title' className="form-control" type="text"></input>
        <input placeholder='Description' className="form-control" type="text"></input>
        <buttion className="btn btn-dark" onClick={handleSubmit}>submit</buttion>
       </div>
    </div>
    
    </>
    
  )
}

export default Todo
