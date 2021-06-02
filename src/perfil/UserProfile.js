import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import imgen from "../shared/images/mainbackground.jpg";
import { AuthContext } from "../shared/configs/Authcontext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./UserProfile.css"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function UserProfile() {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const classes = useStyles();
  const initialValues = user ?
  ({
      user,
  })
  : {
      nombre: '',
      password: '',
      permisos: '',
      ventaRapida: '',
  };
const submitForm = (values, actions) => {


}

  return (
    <div className="contenedorPerfil" >
      <Formik onSubmit={submitForm} initialValues={initialValues} >
        <Form className="formulario-modal">
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
                <div className="fimput">
                  <label htmlFor="password">Contraseña Actual</label>
                  <Field type="password" id="password" name="password"
                    className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                </div>
                <div className="fimput">
                  <label htmlFor="password">Contraseña Nueva</label>
                  <Field type="password" id="password" name="password"
                    className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                </div>
                <div className="fimput">
                  <label htmlFor="password">Repita contraseña</label>
                  <Field type="password" id="password" name="password"
                    className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                </div>
              </CardContent>
            </CardActionArea>
            <CardActions>

              <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit">Agregar</button>
            </CardActions>
          </Card>






        </Form>
      </Formik>
    </div>
  );
}
