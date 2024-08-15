import React,{useState} from 'react'

const App = () => {

  const[formData,setFormData]=useState({ name :'' } );
  const[errors,setErrors]=useState({});
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log('Formsubmitted',formData);
    const errors=formValidation();
    const validationErrors=formValidation();

    if(Object.keys(errors).length===0){  // it checks the form validation if error is empty this mean form passed all the test cases
         console.log('Form submitted', formData);
    }
    else{
      console.log('form has error',errors);
    }
    setErrors(validationErrors);
  }
 

  const handleChange=(e)=>{
   // Update the formData state with the new input value
     setFormData({...formData,[e.target.id]:e.target.value})
  }

  const formValidation=()=>{
     const newErrors={};  // newErrors is the object
     const {name}=formData || {};
     if(name.trim()===''){
       newErrors.name='Name is required';
     }
     return newErrors;
  }
  //const validationErrors=formValidation();  if we keep this outside the loop it keep calling again and again leasds to the infinite loop solution keep this inside handleSubmit
 // setErrors(validationErrors);
  
  return (
    <div>App
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input 
        type="text"
        id='name'
        value={formData.name}
        onChange={handleChange}
        />
        {errors.name && <div style={{color:'red'}}>{errors.name}</div>}
      </form>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App
