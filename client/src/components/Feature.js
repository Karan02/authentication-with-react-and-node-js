import React from "react"
import requireAuth from "./requireAuth"

class Feature extends React.Component{
    render(){
        return(
            <div>karam </div>
        )
    }
}
export default requireAuth(Feature)