import React from "react";
import { Paper } from "@mui/material";

export default function Item({item})
{
    return (
        <Paper>
            <img className="imagenDetail"
              width="auto"
              height={300}
              src={item} 
              alt={item.name}/>

        </Paper>
    )
}