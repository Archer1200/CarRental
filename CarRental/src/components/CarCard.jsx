import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  return (
    <>
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        window.scrollTo(0, 0);
      }}
      className="w-full bg-white rounded-xl shadow-lg 
      overflow-hidden hover:-translate-y-1 
      transition-all duration-500 cursor-pointer group"
    >

      <div className="relative w-full h-48 flex-shrink-0">
        <img
          src={car?.image}
          alt="Car"
          className="w-full h-full object-cover 
          transition-transform duration-500 group-hover:scale-105"
        />

        {car?.isAvaliable && (
          <p className="absolute top-3 left-3 bg-primary/90
          text-white text-xs px-3 py-1 rounded-full">
            Available Now
          </p>
        )}

        <div className="absolute bottom-3 right-3 bg-black/80 
        text-white px-3 py-1.5 rounded-lg text-sm">
          {currency}{car?.pricePerDay} / day
        </div>
      </div>

      <div className="p-4">
        
        <h3 className="text-lg font-semibold">
          {car?.brand} {car?.model}
        </h3>
        <p className="text-gray-500 text-sm mb-3">
          {car?.category} • {car?.year}
        </p>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          
          <div className="flex items-center">
            <img src={assets.users_icon} className="h-4 mr-2" />
            {car?.seating_capacity} Seats
          </div>

          <div className="flex items-center">
            <img src={assets.fuel_icon} className="h-4 mr-2" />
            {car?.fuel_type}
          </div>

          <div className="flex items-center">
            <img src={assets.car_icon} className="h-4 mr-2" />
            {car?.transmission}
          </div>

          <div className="flex items-center">
            <img src={assets.location_icon} className="h-4 mr-2" />
            {car?.location}
          </div>
      </div>

        </div>

    </div>
    </>
  );
};

export default CarCard;