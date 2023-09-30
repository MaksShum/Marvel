import Error from "../error/Error";
import {Fragment} from 'react'
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <Fragment >
            <Error/>
            <Link to='/'><button 
            className='inner' 
            style={{color: 'black',fontSize: 30,textAlign:"center",padding: 5,borderRadius: 5}}>
            Page das't exist.
            Back to main page!</button></Link>
        </Fragment>
    )
}
export default ErrorPage