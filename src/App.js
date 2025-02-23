import logo from './logo.svg';
import './App.css';
import { Route,Router,Routes } from 'react-router-dom';
import Contribute from './components/contribute';
import Html_contribute from './components/html_contribute';
function App() {
  return (
    <div className="App">

    <Routes>
        
        <Route path='/user_page' element = {<Contribute/>} />
        <Route path='/html_page' element = {<Html_contribute/>} />
        
        
      </Routes>
      
    </div>
  );
}

export default App;
