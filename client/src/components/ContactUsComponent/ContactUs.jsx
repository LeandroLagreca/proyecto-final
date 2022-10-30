import { Button, FormControl, FormLabel, Grid, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {React,  useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import "./ContactUs.css"



const ContactComponent = () => {
    const [result, setResult] = useState(false)
   
    
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_dnv4ntv', 'template_hnrenol', e.target, '4zpSHHNBQ0hkdXKkq')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
          setResult(true)
          Swal.fire({
            icon:"success",
            text:"Your message has been successfully sent. We will contact you soon!"
          })
      };


      
      
      return(
          

        <Box id="contacto" sx={{display:"inline-block", width:"50%", height:"auto"}}>

          <form  onSubmit={sendEmail}>
            
            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-between", height: "480px", padding:"40px", borderRadius:"20px", boxShadow: 4 , border:"solid 1px" }}>
         
         <Box container  sx={{display:"flex", flexDirection:"column", gap:"15px", textAlign:"start" }}>
         <Typography  variant='h5' gutterBottom fontWeight={"bold"}>
                Contact Us!

            </Typography>
            <TextField
            id="outlined-textarea"
            label="Full Name"
            multiline
            required
            type={"text"}
            name={"fullName"}
            placeholder={"Name"}
            sx={{boxShadow:"4"}}
            
            
            />
            
            

            <TextField
            id="outlined-textarea"
            label="Phone Number"
            multiline
            required
            type={"text"}
            name={"phone"}
            placeholder={"Phone Number"}
            sx={{boxShadow:"4"}}
            />
           
            

            <TextField
            id="outlined-textarea"
            label="Enter Email"
            multiline
            required
            type={"text"}
            name={"email"}
            placeholder={"Enter Email"}
            sx={{boxShadow:"4"}}
            
            />
            
        </Box>
            <Box sx={{display:"flex", flexDirection:"column", textAlign:"start" , gap:"10px"}}>
            <label >Message</label>
            <Box sx={{display:"flex", flexDirection:"column", boxShadow:"4"}}>

            <textarea name="message" cols="30" rows="5" required className='textarea'  />
            </Box>
            <Button type='submit' sx={{alignSelf:"center"}} variant='contained' className='contactbtn' >Submit</Button>
            </Box>
            
            </Box>
        </form>
        </Box>
       
      )
 }


export default ContactComponent;