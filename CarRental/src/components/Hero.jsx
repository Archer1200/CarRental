import { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";


const cityList = ["Delhi", "Mumbai", "Lucknow", "Bangalore"];

const Hero = () => {
  const [pickupLocation, setpickupLocation] = useState("");
  const {pickupDate, setPickupDate, returnDate,setReturnDate,navigate} = useAppContext()

  const handleSearch=(e)=>{
    e.preventDefault()
    navigate(`/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`)
  }



  return (
    
    <>
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 bg-light text-center px-4">

  {/* Heading */}
  <h1 className="text-3xl md:text-5xl font-semibold">
    Luxury cars on Rent
  </h1>

  {/* Form */}
  <form
    onSubmit={handleSearch}
    className="flex flex-col md:flex-row gap-4 md:gap-6 p-5 md:p-4 
    rounded-xl md:rounded-full w-full max-w-5xl bg-white shadow"
  >

    {/* Location */}
    <div className="flex flex-col w-full md:w-1/4 text-left">
      <label className="text-sm mb-1">Pickup Location</label>
      <select
        value={pickupLocation}
        onChange={(e) => setpickupLocation(e.target.value)}
        className="w-full border px-3 py-2 rounded-lg"
      >
        <option value="">Select Location</option>
        {cityList.map((city) => (
          <option key={city}>{city}</option>
        ))}
      </select>
    </div>

    {/* Pickup Date */}
    <div className="flex flex-col w-full md:w-1/4 text-left">
      <label htmlFor="pickup-date" className="text-sm mb-1">
        Pick-up Date
      </label>
      <input
        value={pickupDate}
        onChange={e=>setPickupDate(e.target.value)}
        type="date"
        id="pickup-date"
        min={new Date().toISOString().split("T")[0]}
        className="w-full border px-3 py-2 rounded-lg"
      />
    </div>

    {/* Return Date */}
    <div className="flex flex-col w-full md:w-1/4 text-left">
      <label htmlFor="return-date" className="text-sm mb-1">
        Return Date
      </label>
      <input
      value={returnDate}
        onChange={e=>setReturnDate(e.target.value)}
        type="date"
        id="return-date"
        className="w-full border px-3 py-2 rounded-lg"
      />
    </div>

    {/* Button */}
    <div className="flex items-end w-full md:w-auto">
      <button
        className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dull"
      >
        Search
      </button>
    </div>

  </form>

  {/* Image */}
  <div className="flex justify-center">
    <img
      src={assets.main_car}
      alt="car"
      className="max-h-60 md:max-h-72 w-full object-contain"
    />
  </div>

</div>     
    </>
  );
};

export default Hero;
