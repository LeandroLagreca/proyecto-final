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
          
    <Box className="boxcontact" sx={{marginTop:"50px"}}  >

        <Box id="contacto" sx={{display:"inline-block", width:"50%", margin:"100px", backgroundColor:"#edf2f4", borderRadius:"20px",  }}>

          <form  onSubmit={sendEmail}>
            
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between", height: "400px", padding:"40px", borderRadius:"20px", boxShadow: 4 , border:"solid 1px",  }}>
         
         <Box container  sx={{display:"flex", flexDirection:"column", gap:"8px", textAlign:"start", color:"#091d36" }}>
         <Typography  variant='h5' gutterBottom fontWeight={"bold"}>
                Contact Us!
            </Typography>
            <label htmlFor=""> Full Name</label>
            <TextField
            id="outlined-textarea"
            label="Full Name"
            multiline
            required
            type={"text"}
            name={"fullName"}
            placeholder={"Name"}
            sx={{boxShadow:"3", width:"250px", }}
            
            color='primary'
            
            />
            
            
            <label htmlFor=""> Phone Number</label>
            <TextField
            id="outlined-textarea"
            label="Phone Number"
            multiline
            required
            type={"text"}
            name={"phone"}
            placeholder={"Phone Number"}
            sx={{boxShadow:"3", width:"250px"}}
            color="primary"
            
            />
           
            
           <label htmlFor="">Enter Email</label>
            <TextField
            id="outlined-textarea"
            label="Enter Email"
            multiline
            required
            type={"text"}
            name={"email"}
            placeholder={"Enter Email"}
            sx={{boxShadow:"3", width:"250px"}}
            color="primary"
            className='textfield'
            
            
            />
            
        </Box>
            <Box sx={{display:"flex", flexDirection:"column", textAlign:"start" , gap:"10px", color:"#091d36"}}>
              
            
            <label htmlFor="" >Message</label>
            <TextField
              id="outlined-multiline-static"
              
              multiline
              rows={3}
              sx={{marginRight:"20px", boxShadow:"3" }}
              
              />
            
              <Button type='submit' sx={{backgroundColor:"#5e83ba", width:"50%", color:"#091d36", marginTop:"50px" ,"&:hover": {backgroundColor:"#091d36", color:"#5e83ba"}}} >Submit</Button>
            </Box>
            
            </Box>
        </form>
        </Box>
       
    </Box>
      )
 }


export default ContactComponent;