import { Container } from "@mui/material";
import React from "react";
import {Link} from "react-router-dom"
import DisableElevation from "./DisableElevation";

const containerStyles = {
    minHeight: '100vh',
     display:'flex',
     flexDirection:'column',
     justifyContent:'center',
     alignItems:'center',
     gap:10
}

export default function ErrorNotFound(){
    return (
        <Container sx={containerStyles}>
            <h1>ERROR 404 NOT FOUND</h1>
            <DisableElevation/>
        </Container>
    )

}
