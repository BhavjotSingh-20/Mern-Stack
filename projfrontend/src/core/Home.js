import React from 'react';
import "../styles.css"
import {API} from "../backend"
import Base from "./Base"
function Home() {
    console.log("API IS",process.env.REACT_APP_BACKEND)
    return (
        <Base title="Homepage" description="Welcome to the Tshirt Store" >
            <div className="row">
                <div className="col-4"><button className="btn btn-success">Test</button></div>
                <div className="col-4"><button className="btn btn-success">Test</button></div>
                <div className="col-4"><button className="btn btn-success">Test</button></div>
            </div>
        </Base>
    );
}

export default Home;