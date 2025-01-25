import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]); // Fixed naming convention
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-efriYH5CUbcSfrfMkQSNxeRB",
      },
    };

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );
      const data = await res.json();
      setAllCoin(data); // Update state with fetched data
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Re-fetch data whenever `currency.name` changes
  useEffect(() => {
    fetchAllCoin();
  }, [currency.name]);


  // Pass `allCoin`, `currency`, and `setCurrency` to the context
  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
