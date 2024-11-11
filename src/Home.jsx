import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const API_URL = "https://xcountries-backend.azurewebsites.net/all";
  const [countries, setCountries] = useState([]);
  const [inputField, setInputField] = useState("");

  const keys = ["name"];



  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      const result = await response.data;
      console.log("result", result);
      setCountries(result);
    } catch (error) {
      console.log("message", error.message);
    }
  };

  const search = (data) => {
    const updatedData =  data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(inputField))
    );
    
    setCountries(updatedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    search(countries)
  },[inputField])
  return (
    <>
      <input
        placeholder="Search for countries..."
        type="text"
        value={inputField}
        onChange={(e) => setInputField(e.target.value)}
      />
      <div className="grid-container">
        {countries.map((country,id) => (
          <div className="countryCard" key={id}>
            <img src={country.flag} alt={country.name} />
            <h3>{country.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
