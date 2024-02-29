import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Coin from './components/Coin';
function App() {
  
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  useEffect(() => {
    const options = {
      headers: {
        accept: 'application/json',
        'X-API-KEY': 'JChwIcFCV5Ac2OsHbZh7chZlcBmfI1L4078BIWg62jQ='
      }
    };

    Axios.get('https://openapiv1.coinstats.app/coins?', options)
      .then(response => {
        setListOfCoins(response.data.result);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const filteredCoins = listOfCoins.filter((coin)=> {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase())
  })

  return (
    <div className="App">
        <div className='cryptoHeader'>
          <input type='text' placeholder='Write your favorite coin...'
          onChange={(e) => setSearchWord(e.target.value)}/>
        </div>
        <div className='cryptoDisplay'>
        {filteredCoins.map((coin) => {
      return <Coin key={coin.id} name={coin.name} icon={coin.icon} price={coin.price.toFixed(4)} symbol={coin.symbol} />
      })}
        </div>
    </div>
  );
}

export default App;
