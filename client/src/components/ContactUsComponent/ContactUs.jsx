import { Alert, Button, FormControl, FormHelperText, FormLabel, Grid, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {React,  useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import "./ContactUs.css"
import validation from './validations';
import { Check, PriorityHigh } from '@mui/icons-material';



const ContactComponent = () => {
    const [result, setResult] = useState(false)
    const [contactInfo, setContactInfo] = useState({
      phone:"",
      fullName:"",
      email:""
    })
    const [errors, setErrors] = useState({})
    
   
    useEffect(() => {
      const check = validation(contactInfo);
      setErrors(check);
      
    }, [contactInfo]);

    function handleChange(e) {
      const value = e.target.value;
      const name = e.target.name;
  
      setContactInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }


   
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_dnv4ntv', 'template_hnrenol', e.target, '4zpSHHNBQ0hkdXKkq')
          
          e.target.reset();
          setResult(true)
          Swal.fire({
            icon:"success",
            text:"Your message has been successfully sent. We will contact you soon!"
          })
      };

    
      
      
      return(
          
    <Box id="contacto" className="boxcontact" sx={{marginTop:"50px",}}  >

        <Box id="contacto" sx={{display:"inline-block", width:"50%", margin:"100px", backgroundColor:"#edf2f4", borderRadius:"20px",  height:"605px"}}>

          <form  onSubmit={sendEmail}>
            
            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-evenly", height: "605px", padding:"40px", borderRadius:"20px", boxShadow: 4 , border:"solid 1px",  }}>
         
         <Box container  sx={{display:"flex", flexDirection:"column", gap:"8px", textAlign:"start", color:"#091d36" }}>
         <Typography  variant='h5' gutterBottom fontWeight={"bold"}>
                Contact Us!
            </Typography>
            <label htmlFor=""> Full Name</label>
            <TextField
            id="outlined-textarea"
            
            multiline
            required
            type={"text"}
            name={"fullName"}
            value={contactInfo.fullName}
            sx={{boxShadow:"3", width:"250px", }}
            onChange={handleChange}
            color={
              errors?.name  ? (
                  "error"
              ): "success"
            }
            placeholder='Pepe Gutierrez'
            InputProps={{ inputProps: { style: { color: 'black' }}}}
            
            
            />
             
             
            
            
            <label htmlFor=""> Phone Number</label>
            <Box>

            <TextField
            id="outlined-textarea"
            multiline
            required
            type={"text"}
            name={"phone"}
            value={contactInfo.phone}
            sx={{boxShadow:"3", width:"250px", backgroundColor:"white"}}
            color={
              errors?.phoneFormat ? (
                "error"
              ): "success"
            }
            onChange={handleChange}
            
            placeholder="1135462365"
            className='text'
            InputProps={{ inputProps: { style: { color: 'black' }}}}
            />
            
           
            </Box>
            
           <label htmlFor="">Enter Email</label>
           

            <TextField
            id="outlined-textarea"
            
            multiline
            required
            type={"email"}
            name={"email"}
            value={contactInfo.email}
            sx={{boxShadow:"3", width:"250px", backgroundColor:"white"}}
            color={
              errors.emailFormat ? (
                "error"
              ): "success"
            }
            className='textfield'
            onChange={handleChange}
            placeholder="emaildeprueba@gmail.com"
            InputProps={{ inputProps: { style: { color: 'black' }}}}
            />
           
          
            
        </Box>
            <Box sx={{display:"flex", flexDirection:"column", textAlign:"start" , gap:"10px", color:"#091d36"}}>
              
            
            <label htmlFor="" >Message</label>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={3}
              sx={{marginRight:"20px", boxShadow:"3", backgroundColor:"white" }}
              color={window.localStorage.getItem("themeMode") === "dark" ? "primary" : "primary"}
              InputProps={{ inputProps: { style: { color: 'black' }}}}
              
              />
            
              <Button type='submit' sx={{backgroundColor:"#5e83ba", width:"50%", color:"#091d36", marginTop:"50px" ,"&:hover": {backgroundColor:"#091d36", color:"#5e83ba"}}} disabled={!errors?.emailFormat && !errors?.phoneFormat ? false : true} >Submit</Button>
            </Box>
            
            </Box>
        </form>
        </Box>
       
    </Box>
      )
 }


export default ContactComponent;