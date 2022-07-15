import "./Exercise.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ExerciseGrid from "../ExerciseGrid/ExerciseGrid";
import Hero from "../Hero/Hero";
import Grid from "../Grid/Grid";

export default function Exercise({user, posts}){

    const isLoggedIn = Boolean(user.email)

    const renderExercise = !isLoggedIn ?
    <>

            <Hero />
            <Grid />
    
    </> :

<>
<h1 className="title"> Exercise</h1>
<div className="boxes">
    <h1 className="overview"> Overview </h1>
    <Link to=  "/exerciseForm"><button className="overview-button">Record Exercise </button></Link>
</div>
<ExerciseGrid products = {posts} />
</>
   


    return (

        renderExercise

       
    );
}