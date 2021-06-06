import React, { useContext, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import imgen from "../shared/images/mainbackground.jpg";
import { AuthContext } from "../shared/configs/Authcontext";
import { Formik, Form, Field } from "formik";
import {BsPencilSquare } from "react-icons/bs";
import "./UserProfile.css"
import AxiosInstance from '../shared/configs/AxiosInstance';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function UserProfile() {

//formik
  const auth = useContext(AuthContext);
  const user = auth.user;
  const classes = useStyles();
  const [verContraseña, setVerContraseña]=useState(true);
  const initialValues = 
 {
  oldpassword: '',
  newpassword: '',
  password: '',
 
  };
const submitForm = (values, actions) => {
if(values.oldpassword!==values.newpassword &&values.newpassword===values.password){
  handleModificarPassword(values.oldpassword,values.newpassword);
}else setSamepass(false)

}
//accion sumit
async function handleModificarPassword  (password,newPassword)  {
  
 await AxiosInstance().put('/usuarios/change-password', { password,newPassword})
      .then(res => {
        
        handleClicksnakBar(false);
        setVerContraseña(!verContraseña);
        
      })
      .catch( ({data}) => {
                    
        const {error}=data;
        console.log(error.message)
        setMessagePass(error.message+" Intentelo nuevamente")
        
      handleClicksnakBar(true);});
}

// validacion
const [samepass, setSamepass] = useState(true);
//snackbar ok
const [opensnakBar, setOpensnakBar] = useState(false);
const [advertencia, setAdvertencia]=useState(false);
const [messagePass, setMessagePass] = useState("");
  const handleClicksnakBar = (adv) => {
      setAdvertencia(adv)
    setOpensnakBar(true);
  };

  const handleClosesnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnakBar(false);
  };


  return (
    <div className="contenedorPerfil" >
      <Formik onSubmit={submitForm} initialValues={initialValues} >
        <Form className="formulario-perfil-modal">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={imgen}
                title="Imagen Manchas"
              />
              <CardContent>
              
                <Typography gutterBottom variant="h5" component="h2">
                  {user.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Este usuario tiene los permisos de {user.permisos}
                </Typography>
                {verContraseña ? 
                <label onClick={()=>setVerContraseña(!verContraseña)} >Cambiar contraseña <BsPencilSquare/></label>:
                <div>
                <div className="fimput">
                  <label htmlFor="oldpassword">Contraseña Actual</label>
                  <Field type="password" id="oldpassword" name="oldpassword"
                    className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                </div>
                <div className="fimput">
                  <label htmlFor="newpassword">Contraseña Nueva</label>
                  <Field type="password" id="newpassword" name="newpassword" 
                    className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                  
                 
                </div>
                <div className="fimput">
                  <label htmlFor="password">Repita contraseña</label>
                  <Field type="password" id="password" name="password" 
                    className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                 {samepass?null:<label className="error">No coincide la contraseña</label>}
                </div>
                </div>
                }
                
                
                
              </CardContent>
            </CardActionArea>
            <CardActions>

             { verContraseña? null:<button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit">Agregar</button>}
            </CardActions>
          </Card>
        </Form>
      </Formik>
      
      <Snackbar open={opensnakBar} autoHideDuration={3000} onClose={handleClosesnackBar}>
        <Alert onClose={handleClosesnackBar} severity={advertencia?"error":"success"}>
         {advertencia?messagePass:"Contraseña modificada con exito."} 
        </Alert>
      </Snackbar> 
       
    </div>
  );
}
