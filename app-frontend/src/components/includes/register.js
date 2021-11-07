import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { registerUser } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';
import Swal from "sweetalert2";
import "animate.css";


const Register = (props) => {
  const { modal, toggleModal } = props;

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const error = useSelector(state => state.error)

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;     
    } else {
      if (error.id === 'REGISTER_FAILURE') {
        let message = '';
        if(error.msg['password']){
          message+=error.msg['password'][0]+"</br>";
        }
        if(error.msg['email']){
          message+=error.msg['email'][0]
        }
        Swal.fire({
          html: message,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          timer: 3500          
        })
       dispatch(clearErrors());
      } else if(error.id === 'REGISTER_SUCCESS'){
        clearState()
        Swal.fire({
          html:"Account Created Successfully",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          timer: 3500,
        })
        dispatch(clearErrors());
      }

    }
  })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name,
      email,
      password,
      'password_confirmation': confirmPassword
    }
    dispatch(registerUser(data))    
  }

  const clearState = () =>{
    setName('');
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <>
      <Modal isOpen={isAuthenticated? false:modal} toggle={toggleModal} className="trendingModalClass">
        <ModalHeader toggle={toggleModal}>Create Account</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="col-md-12">
              <input id="email" type="email" placeholder="Email" name="email"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="col-md-12">
              <input id="name" type="text" placeholder="Name" name="name"
                value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-md-12">
              <input id="password" type="password" placeholder="Enter Password"
                name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="col-md-12">
              <input id="confirm-password" type="password" placeholder="Confirm Password"
                name="comfirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <div className="col-md-12">
              <input type="submit" value="Register" />
              <p className="center">Already have an account? <a href="/home" onClick={toggleModal}>Login</a></p>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Register;
