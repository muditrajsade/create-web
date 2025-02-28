import logo from './logo.svg';
import './App.css';
import { Route,Router,Routes } from 'react-router-dom';
import Contribute from './components/contribute';
import Html_contribute from './components/html_contribute';
import Button_components from './components/button_components';
//import FullScreenDropArea from './components/sample';
import GrapesEditor from './components/drag_drop';
function App() {
  return (
    <div className="App">

    <Routes>
        
        <Route path='/user_page' element = {<Contribute/>} />
        <Route path='/html_page' element = {<Html_contribute/>} />
        <Route path='/components' element = {<Button_components/>} />
        <Route path='/component' element = {<GrapesEditor/>} />



        //testing as repo name changed
        
        
      </Routes>
      
    </div>
  );
}

export default App;
