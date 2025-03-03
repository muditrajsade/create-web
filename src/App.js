import logo from './logo.svg';

import { Route,Router,Routes } from 'react-router-dom';
import Contribute from './components/contribute';
import Html_contribute from './components/html_contribute';
import Button_components from './components/button_components';
//import FullScreenDropArea from './components/sample';
import GrapesEditor from './components/drag_drop';
import HomePage from './components/Home';
import LoginPage from './components/Login';
import CustomerPage from './components/customer';
import Build_project from './components/website_building';
function App() {
  return (
    <div className="App">

    <Routes>
        <Route path='/' element = {<HomePage/>} />
        <Route path='/user_page' element = {<Contribute/>} />
        <Route path='/html_page' element = {<Html_contribute/>} />
        <Route path='/components' element = {<Button_components/>} />
        <Route path='/component' element = {<GrapesEditor/>} />
        <Route path='/login' element = {<LoginPage/>} />

        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/build" element={<Build_project />} />





        //testing as repo name changed
        
        
      </Routes>
      
    </div>
  );
}

export default App;
