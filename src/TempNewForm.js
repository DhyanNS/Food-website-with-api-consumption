import React,{useState} from 'react';
export default function TempForm() {

    //declaring array variables to destructure
    const [firstname,setfirstname] =useState('');
    const [buttonclick,setButtonclick]=useState(''); //destructuring
    //for validation
    const [checkvalid,setCheckvalid]=useState('')
    const [formsubmittes,setFormsubmitted]=useState(false)//false means the form is not yet submiited
    const handleChange =(e)=>{
        e.preventDefault();//Default submisiion  , so that it supress the html related events will be prevented
        setfirstname(e.target.value);

    }
    //handleclick is removed because we have used the form tag where on submiting the form validation is happening so no need of hadleclick in button tag 
    
    /*const handleClick=(e)=>{
        if(firstname.length<5){
            setCheckvalid('Name is to short');
             setButtonclick(firstname);
        }
        else{
            setButtonclick(firstname);
            setCheckvalid('');
        }
      
    }*/
    const handleSubmit=(e)=>{
        e.preventDefault();
         if(firstname.length<5){
            setCheckvalid('Name is to short');
             setButtonclick(firstname);
        }
        else{
            setButtonclick(firstname);
            setCheckvalid('');
            setFormsubmitted(true);//in useState it becoms false-true
            alert(`Form is submitted with ${firstname}`)
        }

    }
    return (
        <div>
             {/* use of ternary opertot */}
      {formsubmittes?    (<><p>Form is Submiited successfully</p></>) :(  <>
   
    <div className="mymain">
      <h1>My form</h1>
      <p>Hello  {firstname}</p>
      <p>After clicking Button,{buttonclick}</p>
      <form onSubmit={handleSubmit}>
        <input className="input-field" type="text" onChange={handleChange} >
      </input>
      {checkvalid && <p className="errors">{checkvalid}</p>}
      <button  type="submit">Send data</button>
      </form>
      
    </div>
    </>)
    }
    

        </div>
   
  )
}