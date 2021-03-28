import React,{useState} from "react"
import Base from "../core/Base"
import {Link} from "react-router-dom"
import { signup } from "../auth/helper"

const Signup = () => {

    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    })
    const {name,email,password,error,success} = values

    const  handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values,error:false})
        signup({name,email,password}).then(data => {
            if(data.error) {
                setValues({...values,error:data.error,success:false})
            } else {
                setValues({
                    ...values,
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    success:true
                })
            }
        }).catch(err => console.log("Error in signup"))
    }
    const signupForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-group"><label  className="text-light">Name</label>
                        <input value={name} className="form-control" type="text" onChange={handleChange("name")} />
                        </div>
                         <div className="form-group"><label  className="text-light">Email</label>
                        <input value={email}className="form-control" type="email" onChange={handleChange("email")}  />
                        </div>
                         <div className="form-group"><label className="text-light">Password</label>
                        <input value={password}className="form-control" type="password" onChange={handleChange("password")}  />
                        </div>
                        <button  onClick={onSubmit} className="btn btn-success btn-lg btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
              return (
                  <div className="row">
                      <div className="col-md-6 offset-sm-3 text-left">
                           <div style={{display:success ? "":"none"}}className="alert alert-success">
            New account was created successfully.Please <Link to="/signin">Please Login Here</Link>
        </div>
                      </div>
                  </div>
             )
    }

    const errorMessage = () => {
        return (
        <div className="row">
                      <div className="col-md-6 offset-sm-3 text-left"><div style={{display:error ? "":"none"}}className="alert alert-danger">
            {error}
        </div>
        </div>
        </div>)
    }
    return (
        <Base title="Sign up page" description="A page for user to sign up">
            {successMessage()}
            {errorMessage()}
        {signupForm()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}
export default Signup