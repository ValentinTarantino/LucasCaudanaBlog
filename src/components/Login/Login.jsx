import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './Login.css';

const Login = () => {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).catch(console.error);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Blog Deportivo</h1>
                <p>Acceso de Administrador</p>
                <button className="btn btn-primary" onClick={signInWithGoogle}>
                    Iniciar Sesión con Google
                </button>
            </div>
        </div>
    );
};

export default Login;