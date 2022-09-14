import React,{useState} from 'react'

const App = () => {
  //whatever the Input taken from the User stored in a variable with the useState() function
  const [city,setCity] = useState("");

  // For Storing the Api Data
  const [result,setResult] = useState("");

  //we are declaring the changeHandler beacuse to handle the data properly coming from user
  const changeHandler = e =>{
    setCity(e.target.value);
  }
  const submitHandler = e =>{
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`).then(
      response=> response.json()).then(                          //after converting the api response to Json ,we are taking the Object in that Json
        data => {
          const kelvin = data.main.temp;               //data object => main is another obj inside data ,in that particular obj: temp var is there
          const celcius = kelvin - 273.15;        // By dafault the value gets in Kelvin, we want to conver that into celcius
          setResult("Temperature at "+city+"\n"+Math.round(celcius)+"°C");
        }
      ).catch(error => console.log(error))

      //Once we Submit and get the data , reset the form
      setCity("");
  }

  return (
    <div >
      <center>
        <div className="card shadow mt-5">
          <div className="card-body">
            <h4 className="card-title">Weather App</h4>
            <form onSubmit={submitHandler}>
              <input size="30" type="text" name="city" onChange={changeHandler} value={city}/> <br /><br />
              <input type="submit" value="Get Temperature" />
            </form><br /> <br />
            <div>
               <h1>{result}</h1> 
            </div>
          </div>
        </div>
      </center>
    </div>
  )
}

export default App
