import { render } from "@testing-library/react"
import ExerciseCard from "../ExerciseCard/ExerciseCard"

export default function ExerciseGrid({products}){


    const renderGrid = Boolean(products?.length > 0)

    console.log("render grid", renderGrid)

    const grid = renderGrid ?
    ( < div className="grid">
       
    {

        products.map((product) => {
     
            return <ExerciseCard product = {product}/>
     
     
     })
     
     }
      </div> ) :

      (<div className="grid"> There are no exercise posts yet </div>)







    



    return(

       grid

           )
}