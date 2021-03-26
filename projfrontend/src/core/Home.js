import React from 'react';
import "../styles.css"
import {API} from "../backend"
function Home() {
    console.log("API IS",process.env.REACT_APP_BACKEND)
    return (
        <div>
            <h1 className="text-white">Hello Frontend {API}</h1>
        </div>
    );
}

export default Home;