import logo from './images/logo.svg';
import './css/App.css';
import ImageCartoon from "./components/imageCropCartoon.js";
import FooterPage from "./components/footer.js";

function App() {
  return (
    <div className="App" >
          <h1 style={{background:'#0077BE',
                      padding:'30px',
                      color:'#FFFFFF'}}>Avatar Image Generator</h1>
      <div style={{margin:'30px'}}>
          <a >Here you can create a virtual avatar based on your appearance. Just upload a picture of your face below, crop it, and you're done!</a>
      </div>
      <ImageCartoon />
      <FooterPage />
    </div>
  );
}

export default App;
