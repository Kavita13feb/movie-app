import React, { useEffect, useState } from 'react';

import "../css/searchbar.css"
import { getMoviesFromTMDB, searchMovies } from '../Redux/action';
import { useDispatch } from 'react-redux';
import { MdKeyboardVoice, MdOutlineKeyboardVoice } from "react-icons/md";
import { useSearchParams } from 'react-router-dom';
export const SearchBar = () => {
  const [searchParams,setSearchParams]=useSearchParams()

  const inquery =searchParams.get("query")||""
  const [query, setQuery] = useState(inquery);
  const [page, setPage] = useState(1);
  const dispatch =useDispatch()


const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  if (window.innerHeight + scrollTop + 1 >= scrollHeight) {
    setPage((prevPage) => prevPage + 1);
  }
};



  return (
    <div className='searchbox'>
    <input
    className='search-bar'
      type="text"
      value={query}
      onChange={(e) =>{setQuery(e.target.value)
        setSearchParams({query:e.target.value})

      } }
      placeholder="Search for movies..."
    />
    <VoiceSearch setQuery={setQuery} setSearchParams={setSearchParams}/>
    </div>
    
  );
};


const VoiceSearch = ({setQuery,setSearchParams}) => {
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
      setSearchParams({query:transcript})
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
