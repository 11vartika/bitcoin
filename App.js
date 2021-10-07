import axios from 'axios';
import './App.css';
import { useEffect,useState } from 'react';
import Coin from '../src/components/Coinitem/index';
function App() {

  const [coins,setcoins]= useState([]);
  const [search ,setSearch]= useState("");
  useEffect(()=>{
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then((res)=>{
      setcoins(res.data);
      console.log (res.data);
    })
    .catch((error)=>console.error(error));
  },[]);

  const handleChange=  (e) =>{
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter((coin) =>
  coin.name.toLowerCase().includes(search.toLowerCase())
);  return (
    <div>
      <div className="header">
    <h1 className="brand"> <i className="fas fa-moon"></i>CoinMoon</h1>
    <form>
    <input className="inputField" type="text" onChange={handleChange} placeholder ="Search Coin"/>
    </form>
    </div>
   <div className="coinsContainer">
   {filteredCoins.map((coin)=>{
   return (
    <Coin
    key = {coin.id}
    name ={coin.name}
    price={coin.current_price}
    symbol = {coin.symbol}
    marketcap = {coin.market_cap}
    volume = {coin.total_volume}
    image= {coin.image}
    priceChange={coin.price_change_percentage_24h}
   />
   );
   })}
   </div>
    </div>
  );
}

export default App;
