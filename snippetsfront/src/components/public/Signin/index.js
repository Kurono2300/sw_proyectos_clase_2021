import DataField from  '../../shared/DataField/DataField';
import Page from '../../shared/Page/Page';
import Button from '../../shared/Buttons/Button';


import {useState} from 'react';
import {useSession} from '../../../hooks/Session';
import {SIGN_CREATE, SIGN_FETCHING} from '../../../store/reducers/sign';
import { publicaxios } from '../../../store/axios';
import { useHistory , useLocation} from 'react-router-dom';

const Signin = ()=>{
  const [email, setEmail] = useState();
  const  [pswd, setPassword] = useState();
  const [{ sign }, dispatch] = useSession();
  const location = useLocation();
  const routeHistory = useHistory();
  let { from } = location.state || { from : {pathname:"/login"}};
  
  const onClickHandler = async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    {alert('Usuario Registrado Exitosamente. Puede proceder a iniciar sesion.');}
    dispatch({ type: SIGN_FETCHING });
    try{
      const { data } = await publicaxios.post(
      "/api/security/signin",
      {email:email, pswd:pswd}
    );
    dispatch({ type: SIGN_CREATE, payload: data });
    routeHistory.replace(from);
    } catch(ex){
      //Dispacth del error
    }
  };

  return (
    <Page showHeader title="Sign In">
        <DataField
          labelText="Correo Electrónico"
          type="email"
          placeholder="correo@electrónico"
          value={email}
          name="email"
          id="email"
          title="Correo Electrónico"
          error=""
          onChange={(e)=>{setEmail(e.target.value)}}>
        </DataField>
        <DataField
          labelText="Contraseña"
          type="password"
          placeholder="Tu Contraseña"
          value={pswd}
          name="pswd"
          id="pswd"
          title="Contraseña"
          error=""
          onChange={(e)=>{ setPassword(e.target.value)}}>
        </DataField>     
        <section style={{padding:"1rem"}}>
          <Button onClick={onClickHandler}>Registrarse</Button>
        </section> 
    </Page>
  )
}

export default Signin;
