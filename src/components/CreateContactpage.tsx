import React, { useState, useEffect } from 'react';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import ContactForm, { ContactFormData } from './ContactForm';
import { useDispatch } from 'react-redux';
import { addContact } from './redux/contactSlice';
import { useNavigate } from 'react-router-dom';
import SideNav from './SideNav';

const CreateContactpage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const handleFormSubmit = (formData: ContactFormData) => {
    dispatch(addContact(formData));
    navigation('/');
  };

  return (
    <div className="flex">
      {isMobile && (
        <button
          onClick={toggleSideNav}
          className={`p-2 text-black absolute top-2 left-2 z-30 ${
            showSideNav ? 'hidden' : ''
          }`}
        >
          <AiOutlineMenuUnfold size={24} />
        </button>
      )}

      {showSideNav || !isMobile ? (
        <div
          className={`w-72 bg-dark-purple ${
            isMobile ? 'fixed top-0 left-0 h-full z-20' : 'z-10'
          }`}
        >
          <SideNav />
        </div>
      ) : null}

      <div
        className={`flex-grow p-4 md:p-8 bg-gray-100 ${
          showSideNav && isMobile ? 'ml-72' : ''
        }`}
        style={{
          maxWidth: isMobile && showSideNav ? 'calc(100vw - 72px)' : 'none',
          overflowX: isMobile && showSideNav ? 'hidden' : 'auto',
        }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Create Contact Screen</h1>
        </div>

        <div className="flex justify-center items-center w-500 h-full">
          <div className="bg-white p-4 rounded-md shadow flex">
            <ContactForm
              initialFormData={{ firstName: '', lastName: '', status: 'inactive' }}
              onSubmit={handleFormSubmit}  isEditMode={false} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContactpage;
