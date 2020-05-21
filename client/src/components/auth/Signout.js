import React,{Component} from "react"
import * as actions from "../../actions"
import {connect } from "react-redux"
class Signout extends Component{
    componentDidMount(){
        this.props.signingout();
        // console.log("this props",this.props)
    }
    render(){
        return(
            <div>
                sorry to see you go
            </div>
        )
    }
}
export default connect(null,actions)(Signout)