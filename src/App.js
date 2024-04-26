import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState("");
  const [selectedStates, setSelectedStates] = useState("");
  const [selectedCities, setSelctedCities] = useState("");


  const getCountries = async() => {
    try{
    const res = await fetch("https://crio-location-selector.onrender.com/countries")
    console.log("Country res data", res);
    const data = await res.json();
    console.log("Country data",data)
    setCountries(data)

    }catch(err){
      console.error("Error fetching countries:", err)
    }
  }

  const getStates =async () => {
    try{
      const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountries}/states`)
      console.log("states res", res)
      const data = await res.json()
      setStates(data)
      console.log("states", data)
    } catch(err){
      console.error("Error fetching states:", err)
    }
  }

  const getCities = async () => {
    try{
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountries}/state=${selectedStates}/cities`
      )
      const data = await res.json();
      setCities(data)
    } catch(err){
      console.error("Error fetching cities", err)
    }
  }

  useEffect(() => {
    getCountries();

  }, [])

  useEffect(()=>{
    if(selectedCountries){
      getStates()
    }
  }, [selectedCountries])

  useEffect(()=>{
    if(selectedCountries && selectedStates) {
      getCities();
    }
 
  }, [selectedCountries, selectedStates]);

  return (
    <div className="city-selector">
      <h1>Select Location</h1>
      <div className="dropdowns">
        <select
          value={selectedCountries}
          onChange={(e) => setSelectedCountries(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>

        <select
          value={selectedStates}
          onChange={(e) => setSelectedStates(e.target.value)}
          className="dropdown"
          disabled={!selectedCountries} // by default empty string is considered as falsey value in java script
          //thats why when selectedCountries is not equal to empty (""), then state should be enable
        >
          <option value="">
            Select State
          </option>
          {states.map((state) => {
            return (
              <option key={state} value={state}
              >
                {state}
              </option>
            );
          })}
        </select>

        <select
          value={selectedCities}
          onChange={(e) => setSelctedCities(e.target.value)}
          className="dropdown"
          disabled={!selectedStates}
        >
          <option value="" disabled>
            Select Cities
          </option>
          {cities.map((city) => {
            return (
              <option key={city} value={city}>
                {city}
              </option>
            );
          })}
        </select>
      </div>

      {
        selectedCities && (
          <h2 className="result">
            You selected <span className="highlight">{selectedCities},</span>
            <span className="fade">{" "} {selectedStates}, {selectedCountries}</span>
          </h2>
        )
      }
    </div>
  );
}

export default App;
