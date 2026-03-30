import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets, dummyDashboardData } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const {axios,isOwner,currency} = useAppContext()

  
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  //  Dashboard Cards Config
  const dashboardCards = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending Bookings",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Completed Bookings",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];

  const fetchDashboardData = async()=>{
    try {
      const {data} = await axios.get('/api/owner/dashboard')
      if(data.success){
        setData(data.dashboardData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }}



  //  Fetch Data (Dummy for now)
  useEffect(() => {
    if(isOwner){
      fetchDashboardData()
    }
  }, [isOwner]);

  return (
    <div className="flex-1 px-4 pt-10 md:px-10">

      {/*  Page Title */}
      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />

      {/*  Cards Section */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-7xl">

        {dashboardCards.map((card, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-md border border-borderColor bg-white shadow-sm" >

            {/* Text */}
            <div>
              <p className="text-xs text-gray-500">{card.title}</p>
              <h2 className="text-lg font-semibold">{card.value}</h2>
            </div>

            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <img src={card.icon} alt="icon" className="w-8 h-8" />
            </div>
          </div>
        ))}

      </div>
<div className='flex flex-wrap items-start gap-6 mb-8 w-full'>
{/* recent booking */}
<div className='p-4 md:p-6 border border-borderColor rounded-md max-w-lg
w-full'>
<h1 className='text-lg font-medium'>Recent Bookings</h1>
<p className=''>Latest customer bookings </p>
{data.recentBookings.map((booking,index)=>(
  <div key={index} className="mt-4 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
        <img src={assets.listIconColored} alt="" className="h-5 w-5"/>
      </div>
    </div>
    <p>{booking.car.brand}{booking.car.model}</p>
    <p className="text-sm text-gray-500">{booking.createdAt.split('T')[0]}
    </p>
    <div className="flex items-center gap-2 font-medium">
      <p className="text-sm text-grey-500">{currency}{booking.price}</p>
      <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">{booking.status}</p>
    </div>
  </div>
  
))}
</div>

    {/* Monthly Revenue */}
        <div className="p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs">
        <h1 className="text-lg font-medium">Monthly Revenue</h1>
        <p className="text-grey-500">Revenue for current month</p> 
        <p className="text-3xl mt-6 font-semibold text-primary">{currency}{data.monthlyRevenue}</p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;