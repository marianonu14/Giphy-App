import { useState, useEffect } from 'react';

import './App.css';


const apiKey ='DyzZe9p8LQ4iJW1eMXfjVeIMG9XdZ3ji'

function App() {
  
  const [inputValue, setInputValue] = useState('')
  const [onFormSubmit, setonSubmit] = useState('')
  const [searchValue, setsearchValue] = useState([])

  useEffect(( ) => {
    console.log('loop');
    fetch(`https://api.giphy.com/v1/gifs/search?q=${inputValue}&api_key=${apiKey}&limit=10`)
      .then(res => res.json())
      .then(response => {
        const {data} = response
        setsearchValue(data)
      })
  }, [onFormSubmit])

  const handleInput = (e) => {
    setInputValue(e.target.value)
  }

  const handleForm = (e) => {
    e.preventDefault()
    if(inputValue){
      setonSubmit(inputValue)
    }
    return
  }

  const validSearch = searchValue.length > 0

  return (
    <div className="app-container">
      <h1>Giphy App</h1>
      <form onSubmit={handleForm}>
        <input onChange={handleInput} type="text" />
        <button>Search</button>
      </form>
      <div className='main-container'>
        {validSearch && searchValue.map(elem => 
        <div key={elem.id} className='giphy-container'>
          <h2>{elem.title.toUpperCase()}</h2>
          <img src={elem.images.preview_webp.url} alt={elem.title} />     
        </div>)} 
      </div>
    </div>
  );
}

export default App;
