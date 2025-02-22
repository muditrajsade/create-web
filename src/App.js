import logo from './logo.svg';
import './App.css';
import { Route,Router,Routes } from 'react-router-dom';
import Contribute from './components/contribute';
function App() {
  return (
    <div className="App">

    <Routes>
        
        <Route path='/user_page' element = {<Contribute/>} />
        
        
      </Routes>
      
    </div>
  );
}

export default App;
