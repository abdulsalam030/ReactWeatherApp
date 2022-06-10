import React,{useState,useEffect} from 'react';
import './App.css';

const api = {
  key : 'a31366cab887cc8ef1dcd53fe372e965',
  base : "https://api.openweathermap.org/data/2.5/"
}


const App = () => {
  const [weather,setWeather] = useState({});
  const [query,setQuery] = useState('');


  const dateBuilder = (d) => {
    let months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }
  

  const search = event => {
    if (event.key === "Enter") {
      fetch (`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)
      });
    }
  }
  
 
  return (
    <div className='App'> 
      <div className='search-box'>
        <input type='text' placeholder='Search...' className='search-bar' onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
        <h1 style={{color:'white', marginLeft:'-25px', marginTop:'30px'}}>Welcome</h1>
      </div>
      {(typeof weather.main !== "undefined") ? (
      <div>
        <div className='content-box'>
      <div className='content'>{weather.name},{weather.sys.country}</div>
      <div className='date'>{dateBuilder(new Date())}</div>
      <div className='weather-box'>
        <div className='temp'>{Math.round(weather.main.temp)}<sup>o</sup>C</div>
        <div className='weather'>{weather.weather[0].main}</div>
      </div>
      </div>
      </div>
      ) : ('')}
      </div>
  );
}


export default App;
