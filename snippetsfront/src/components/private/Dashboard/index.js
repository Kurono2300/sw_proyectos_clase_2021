import './dashboard.css'
import Page from '../../shared/Page/Page';
import {privateaxios, publicaxios} from '../../../store/axios';
import { SNIPPET_CURRENT_LOAD } from '../../../store/reducers/snippets';
import {useSession} from '../../../hooks/Session';
import { useEffect } from 'react';


const Dashboard = () => {
    let datos;

    if(localStorage.getItem("sec_str") && true) {
        datos = JSON.parse(localStorage.getItem("sec_str"));
    }
    let info = datos.user.user["email"];

    const [{ snippet }, dispatch ] = useSession();
    useEffect(
        async ()=>{
            const { data } = await privateaxios.post("/api/snippets/countSnippetsUser/",{user:info});
            dispatch({type:SNIPPET_CURRENT_LOAD, payload:data});
        },[]);

    const { currentSnippet } = snippet;



    return(
        <Page showHeader title="Dashboard">
        <section>
            <h1>Usuario {datos.user.user["email"]}</h1>
            <br/>
            <section className="fullsize">
                <label for="company" className="labelformats">
                    <span className="spanTitles"># Snippets Ingresados</span>
                    <p className="contents">Este usuario ha ingresado {currentSnippet} snippets</p>
                </label>
                <label for="contact" className="labelformats">
                    <span className="spanTitles">Top 5 Keywords</span>
                    <p className="contents">Sigo Perdido Aqui</p>
                </label>

                <label for="contact" className="labelformats">
                    <span className="spanTitles">Indicador Vacio</span>
                    <p className="contents">Placeholder Text</p>
                </label>
            </section>

        </section>
        </Page>
    )
}

export default Dashboard;