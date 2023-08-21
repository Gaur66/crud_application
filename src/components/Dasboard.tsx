import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import Map from './graph/Map';
import LineGraph from './graph/LineGraph';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { useSelector } from "react-redux";
import { RootState } from './redux/types';

const Dashboard: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false); // Default to hide in mobile view
  const contacts = useSelector((state: RootState) => state.contact.contacts);
  console.log(contacts,"ldkld")
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // Adjust the breakpoint as needed
    };

    handleResize(); // Call once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <div className="flex relative">
      {/* Hamburger Toggle Button for Mobile */}
      {isMobile && (
        <button
          onClick={toggleSideNav}
          className={`p-2 text-black absolute top-2 left-2 z-30 ${showSideNav ? 'hidden' : ''}`}
        >
          <AiOutlineMenuUnfold size={24} />
        </button>
      )}

      {/* SideNav (show in desktop, toggle in mobile view) */}
      {showSideNav || !isMobile ? ( // Show in desktop or if toggled in mobile view
        <div className={`w-72 bg-dark-purple ${isMobile ? 'fixed top-0 left-0 h-full z-20' : 'z-10'}`}>
          <SideNav />
        </div>
      ) : null}

      {/* Main Content */}
      <div className={`flex-grow p-4 md:p-8 bg-gray-100 ${showSideNav && isMobile ? 'ml-72' : ''}`} style={{ maxWidth: isMobile && showSideNav ? 'calc(100vw - 72px)' : 'none', overflowX: isMobile && showSideNav ? 'hidden' : 'auto' }}>
        {/* Toggle Button for Mobile */}
        {isMobile && (
          <button
            onClick={toggleSideNav}
            className={`p-2 text-black absolute top-2 left-2 z-30 ${showSideNav ? '' : 'hidden'}`}
          >
            <AiOutlineMenuUnfold size={24} />
          </button>
        )}

        {/* LineGraph */}
        <div className="mb-4">
          <LineGraph />
        </div>
        
        {/* Map */}
        <div className="mb-4">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
