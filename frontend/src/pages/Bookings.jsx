import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardActions, Typography, Paper } from "@material-ui/core";
import axios from 'axios';
import { Repository } from '../api/repository';
import {ScheduleContext} from "../context"


export const Bookings = () => {

    const [tour, setTour] = useState(new Bookings(0, "", "", 0, "", []));
    const nav = useNavigate();
    const params = useParams();
  
    // get the context from ScheduleContext
    const { addToTours } = useContext(ScheduleContext).context;
  
    useEffect(() => {
      console.log("PARAMS.MUSEUM = " + params.museum_name);
      Repository.getToursBy(params.museum_name).then((response) => {
        setTour(response);
      });
    }, []);
  
    
  
    const addToTourHandler = () => {
      console.log("Added to My Tours");
      addToTours(tour);
      nav("/profile");
    };
  

return (
<div>bitch</div>
)}