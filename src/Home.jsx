import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const Home = () => {
  const API_URL = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [inputField, setInputField] = useState("");

  const keys = ["name"];

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      const result = await response.data;
      setCountries(result);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const search = (data) => {
    const updatedData = data.filter((item) =>
      keys.some((key) => item[key].common.toLowerCase().includes(inputField))
    );
    console.log("updated-data", updatedData);
    setCountries(updatedData);
  };

  useEffect(() => {
    search(countries);
  }, [inputField]);

  return (
    <>
      <input
        placeholder="Enter country name..."
        type="text"
        value={inputField}
        onChange={(e) => setInputField(e.target.value)}
      />
      <div className="container">
        {Array.from(
          countries.map((country, id) => (
            <div key={id} className="countryCard">
              <img src={country.flags.png} alt={country.name.common} />
              <br />
              <h2>{country.name.common}</h2>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
