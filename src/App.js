import logo from './images/logo.svg';
import './css/App.css';
import ImageCartoon from "./components/imageCropCartoon.js";
import FooterPage from "./components/footer.js";
import Footer from "./components/footer-c.js";

function App() {
  return (
    <div className="App" >
      <h1 style={{background:'#0077BE',
                  padding:'30px',
                  color:'#FFFFFF'}}>Avatar Image Generator</h1>
      <div style={{margin:'30px'}}>
          <a style={{fontSize:'18px', color:'#17202A'}}>Here you can create a virtual avatar based on your appearance.<br/><br/>Just upload a picture of a person below, crop it, and you're done!</a>
      </div>
      <ImageCartoon />
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
