import './LoadingScreen.css';
import AuroraBackground from '../aurorabackground/aurorabackground';

const LoadingScreen = () => {
    return (
        <div className="loading-wrapper">
            <AuroraBackground />
            <div className="loading-container">
                <div className="pulsing-rings">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                        <circle className="ring1" cx="40" cy="40" r="35"></circle>
                        <circle className="ring2" cx="40" cy="40" r="25"></circle>
                        <circle className="ring3" cx="40" cy="40" r="15"></circle>
                    </svg>
                </div>
                <div className="loading-text">Cargando...</div>
            </div>
        </div>
    );
};

export default LoadingScreen;