import React, { useEffect, useState } from 'react';

import "../css/searchbar.css"
import { getMoviesFromTMDB, searchMovies } from '../Redux/action';
import { useDispatch } from 'react-redux';
import { MdKeyboardVoice, MdOutlineKeyboardVoice } from "react-icons/md";
export const SearchBar = () => {

  const [query, setQuery] = useState('');
  const dispatch =useDispatch()

  useEffect(()=>{
    console.log(query)
    if(query){
      dispatch(searchMovies(query))

    }else{
      dispatch(getMoviesFromTMDB(1))
    }
},[query])

  return (
    <div className='searchbox'>
    <input
    className='search-bar'
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for movies..."
    />
    <VoiceSearch setQuery={setQuery}/>
    </div>
    
  );
};


const VoiceSearch = ({setQuery}) => {
  const [transcript, setTranscript] = useState('');

  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setQuery(transcript);
      // console.log('Recognized:', transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    setRecognition(recognition);
  }, []);

  const startListening = () => {

    recognition.start();
  };

  const stopListening = () => {
    recognition.stop();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {listening ? (
        <button onClick={stopListening} style={{ background: 'transparent', color: 'white', border: 'none', padding: '10px',display:"flex"  }}>
        <MdKeyboardVoice fontSize={"20px"}/>
        speak now...
        </button>
      ) : (
        <button onClick={startListening} style={{ background: 'transparent',color: 'white', border: 'none', padding: '10px' }}>
                    <MdOutlineKeyboardVoice fontSize={"20px"} />

        </button>
      )}
      
    </div>
  );
};

export default VoiceSearch;
