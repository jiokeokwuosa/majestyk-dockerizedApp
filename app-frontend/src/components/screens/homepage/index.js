import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles.css';
import RegisterModal from '../../includes/register';
import { loginUser, logOutUser, processImage } from '../../../redux/actions/authActions';
import { clearErrors } from '../../../redux/actions/errorActions';
import Swal from "sweetalert2";
import "animate.css";


const Homepage = () => {

  const mounted = useRef();
 
 
  const dispatch = useDispatch(); 
  const error = useSelector(state => state.error)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [registerModal, setRegisterModal] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [output, setOutput] = useState('original')
  const [imageFile, setimageFile] = useState('')

  const toggle = () => {
    setRegisterModal(!registerModal);
  }
  const openRegisterForm = (e) => {
    e.preventDefault()
    toggle()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email,
      password    
    }
    dispatch(loginUser(data))    
  }
  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setimageFile(img)      
    }
  };
  const  handleImageSubmission = (e) => {
    e.preventDefault()
    let formData = new FormData();
    formData.append('output', output)
    formData.append('image', imageFile)   
    dispatch(processImage(formData))   
  }
 

  const handleLogout = (e) =>{
    e.preventDefault()
    dispatch(logOutUser())    
  }

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;     
    } else {
      if (error.id === 'LOGIN_FAILURE') {        
        Swal.fire({
          html: 'Invalid Login Credentials',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          timer: 3500,
        })
       dispatch(clearErrors());
      }else if(error.id === 'PROCESS_IMAGE_FAILURE'){
        Swal.fire({
          html: 'Image processing failed, only jpeg and png file extension is allowed',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          timer: 3500        
        })
        dispatch(clearErrors());
      }else if(error.id ==='PROCESS_IMAGE_SUCCESS'){
        Swal.fire({
          html: 'Image processed successfully',
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

  return (
    <>
      <div id="homepageFirstSectionParticles">    </div>                 
      <div id="homepageSecondSection" className="container fly">       
          <div className="row">
              <div className="col-md-12 title">
              <h3>Majestyk Apps</h3>
              </div>
          </div>           
          <div className="row box">
            {!isAuthenticated? 
              <form onSubmit={handleSubmit}>
                <div className="col-md-12">
                    <input id="email" type="email" placeholder="Email"  name="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} required/>                    
                </div> 
                <div className="col-md-12">
                    <input id="password" type="password" placeholder="Enter Password"
                    name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>   

                </div>                 
                <div className="col-md-12">   
                  <input type="submit" value="Login"/>  
                  <p className="center">Don't have an account? <a href="/home" onClick={openRegisterForm}>Create Now</a></p>
                </div>  
              </form>    
            :
              <form onSubmit={handleImageSubmission}>
                <div className="col-md-12">
                    <input id="image" type="file" name="image" onChange={onImageChange} required/>                    
                </div> 
                <div className="col-md-12">
                    <select required onChange={(e) => setOutput(e.target.value)} defaultValue={output}>
                        <option value="original">Original</option>
                        <option value="square">Square of original size</option>
                        <option value="small">Small</option>
                        <option value="all">All three</option>
                    </select>
                </div>                 
                <div className="col-md-12">   
                  <input type="submit" value="Upload Image"/>                   
                </div>  
              </form>    
            }                  
          </div>          
        
      </div>
      {isAuthenticated?<h4 className="logoutButton"><a href="/home" onClick={handleLogout}>Logout</a></h4>:null}  
      <RegisterModal modal={registerModal} toggleModal={toggle}/>     
    </>
  );
}

export default Homepage;
