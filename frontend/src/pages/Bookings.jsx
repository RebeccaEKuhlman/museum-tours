import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Paper, Button } from "@material-ui/core";
import axios from 'axios';
import { Repository } from './repository';
import { useNavigate, useParams } from "react-router-dom";



export const Bookings = ({museums}) => {
    
    const [ museum, setMuseum ] = useState(undefined);
    const params = useParams();

    useEffect(() => {
        if (params.museum_name) {
            Repository.getMuseumByName(params.museum_name).then(x => setMuseum(x));
        } else {
            alert("shite broke");
        }
    }, [params.museum_name]);

   return (
       <div>{museum.museum_name}</div>
   )

}