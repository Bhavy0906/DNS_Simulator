import './App.css';
import './styles.css';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useState } from 'react';

function App() {

  const [inUrl, setUrl] = useState('');
  const [ipOut, setIP] = useState('IP');

  const url = () => {
    Axios.post(
      'http://localhost:3001/url', { inUrl: inUrl })
      .then(
        (response) => {
          setIP(response.data[0].IP);
          console.log(response);
        });
  };



  return (
    <div className="App">
      <div className="board">
        <div className = "container">
          <h1 className='child'>URL to IP</h1>
          <div className='child'>
          <label id = "label">URL</label>
          <input type="text" onChange={(e) => {setUrl(e.target.value)}} ></input>
          </div >
          <Button variant="secondary" onClick={url} className='child'>Search</Button>
          <h3 className='child'>{ipOut}</h3>
        </div>

      </div>
    </div>
  );
}

export default App;
