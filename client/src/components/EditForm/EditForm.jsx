import * as React from 'react';
import { Box, Card, CardContent, Grid, TextField, FormLabel, Select } from "@mui/material";
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function validate(input){
    var errors = {}
    console.log(errors)
    if(!input.name){
        errors.name = "El campo nombre es requerido"
    }else if((!/^[A-Za-z0-9\s]+$/g.test(input.name.trim()))){
        errors.name = "El campo nombre solo acepta letras y numeros"
    }
    if(!input.description){
     errors.description = "Por favor agrege una descripción"
    }else if((!/^[A-Za-z0-9\s]+$/g.test(input.description.trim()))){
        errors.description = "El campo description solo acepta letras y numeros"
    }
    if(!input.background_image){
        errors.background_image = "El campo imagen es requerido"
    }else if((!/.+\.(jpg|png)$/.test(input.background_image))){
        errors.background_image = "La imagen debe ser de tipo jpg o png"
    }
    if(!input.price){
        errors.price = "Es necesario un valor"
    }else{
        if(input.price < 1 || input.price > 100)
        errors.price = "El precio debe ser entre 1 y 100"  
    }
    if (!input.requirements){
        errors.requirements = "Por favor detalle los pasos de su receta"
    }else if((!/^[A-Za-z0-9\s]+$/g.test(input.requirements.trim()))){
       errors.requirements = "El campo requirements solo acepta letras y numeros "
    }
    return errors
    }

    

export default function ComposedTextField() {
  const dispatch = useDispatch()  
  const generos = useSelector((state)=> state.videogames.genres)
  const [errors,setErrors] = useState({})
  const [input, setInput] = useState({
  name:"",
  description:"",
  background_image:"",
  price:0,
  requirements:"",
  genres:[]
  })  


  const handleChange = (e) => {
    setInput({
        ...input,
        [e.target.name] : e.target.value
    }) 
    setErrors(validate({
        ...input,
        [e.target.name]:e.target.value
    }))
    console.log(input)     
  };

//   function handleSubmit(e){
//     e.preventDefault();
//     if(input.name && input.description&&input.background_image&&input.price&&input.requirements
//         &&!errors.name&& !errors.description&&!errors.background_image&&!errors.price&&!errors.requirements&&input.genres.length !==0 &&input.genres.length<=3)

//     {dispatch(postRecipes(input))
//     alert("Receta creada con exito!")
//     setInput({
//         name:"",
//         summary:"",
//         image:"",
//         healthScore:0,
//         steps:"",
//         diets:[]
//     })
//     history.push("/home")}
//     else alert ("Por favor, complete el formulario correctamente")
// }



  return (
    <Box
      my={2}
      component="form"
      sx={{
        '& > :not(style)': { m: 0 },
      }}
      noValidate
      autoComplete="off"
    >
    <Grid container direction="row" spacing={2}>
   
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card>
                <h1>Edit Game</h1>
                    <CardContent>   
                        {!errors.name? <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Name</InputLabel>
                            <Input id="component-simple" name="name" value={input.name} onChange={handleChange} />
                        </FormControl>
                            :
                        <FormControl error variant="standard">
                            <InputLabel htmlFor="component-error">Name</InputLabel>
                            <Input
                            id="component-error"
                            name="name"
                            value={input.name}
                            onChange={handleChange}
                            aria-describedby="component-error-text"/>
                            <FormHelperText id="component-error-text">{errors.name}</FormHelperText>
                        </FormControl>}
                    </CardContent>

                    <CardContent>   
                        {!errors.description? <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Description</InputLabel>
                            <Input id="component-simple" name="description" value={input.description} onChange={handleChange} />
                        </FormControl>
                            :
                        <FormControl error variant="standard">
                            <InputLabel htmlFor="component-error">Description</InputLabel>
                            <Input
                            id="component-error"
                            name="description"
                            value={input.description}
                            onChange={handleChange}
                            aria-describedby="component-error-text"/>
                            <FormHelperText id="component-error-text">{errors.description}</FormHelperText>
                        </FormControl>}
                    </CardContent>

                    <CardContent>   
                        {!errors.background_image? <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Image</InputLabel>
                            <Input id="component-simple" name="background_image" value={input.background_image} onChange={handleChange} />
                        </FormControl>
                            :
                        <FormControl error variant="standard">
                            <InputLabel htmlFor="component-error">Image</InputLabel>
                            <Input
                            id="component-error"
                            name="background_image"
                            value={input.background_image}
                            onChange={handleChange}
                            aria-describedby="component-error-text"/>
                            <FormHelperText id="component-error-text">{errors.background_image}</FormHelperText>
                        </FormControl>}
                    </CardContent>

                    <CardContent>   
                        {!errors.price? <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Price</InputLabel>
                            <Input id="component-simple" name="price" value={input.price} onChange={handleChange} />
                        </FormControl>
                            :
                        <FormControl error variant="standard">
                            <InputLabel htmlFor="component-error">Price</InputLabel>
                            <Input
                            id="component-error"
                            name="price"
                            value={input.price}
                            onChange={handleChange}
                            aria-describedby="component-error-text"/>
                            <FormHelperText id="component-error-text">{errors.price}</FormHelperText>
                        </FormControl>}
                    </CardContent>

                    <CardContent>   
                        {!errors.requirements? <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Requirements</InputLabel>
                            <Input id="component-simple" name="requirements" value={input.requirements} onChange={handleChange} />
                        </FormControl>
                            :
                        <FormControl error variant="standard">
                            <InputLabel htmlFor="component-error">Requirements</InputLabel>
                            <Input
                            id="component-error"
                            name="requirements"
                            value={input.requirements}
                            onChange={handleChange}
                            aria-describedby="component-error-text"/>
                            <FormHelperText id="component-error-text">{errors.requirements}</FormHelperText>
                        </FormControl>}
                    </CardContent>

                    <CardContent>   

                        <FormControl variant="standard" sx={{width:"25%"}}>
                            <InputLabel htmlFor="component-error">Genres</InputLabel>
                            <Select
                            id="component-error"
                            name="genres"
                            value={input.genres}
                            onChange={handleChange}
                            aria-describedby="component-error-text"/>
                            <FormHelperText id="component-error-text">{errors.requirements}</FormHelperText>
                        </FormControl>
                    </CardContent>
                    {Object.entries(errors).length===0 && input.name!==""?<CardContent>   
                        <FormControl>
                        <Button>Save</Button> 
                        </FormControl>
                    </CardContent>
                    :
                    <CardContent>   
                        <FormControl>
                        <Button disabled>Save</Button>
                        </FormControl>
                    </CardContent>}
                </Card>
            </Grid>
        </Grid>
    </Box> 
  );
}