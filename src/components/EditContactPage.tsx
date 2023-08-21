import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import ContactForm, { ContactFormData } from './ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/types';
import { Contact, updateContact } from './redux/contactSlice';
import SideNav from './SideNav';

const EditContactPage = () => {
  const { id } = useParams<{ id: string }>();

  console.log(id,'k')
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contact.contacts);


  const [isMobile, setIsMobile] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const navigation = useNavigate();
  const contactToEdit = contacts.find((contact,index) => index.toString() === id);
 
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: contactToEdit?.firstName ||'',
    lastName: contactToEdit?.lastName || "",
    status: contactToEdit?.status || 'inactive',
  });

  useEffect(() => {
    const contactToEdit = contacts.find((contact, index) => index.toString() === id);
    if (contactToEdit) {
      setFormData(contactToEdit);
    }
  }, [id, contacts]);

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

  const handleFormSubmit = (updatedData: ContactFormData) => {
    const updatedContact: Contact = {
      ...formData,
      ...updatedData,
    };

    const contactIndex = contacts.findIndex((contact, index) => index.toString() === id);
    if (contactIndex !== -1) {
      dispatch(updateContact({ index: contactIndex, updatedContact: updatedContact }));
    }

    navigation('/');
  };

  return (
    <div className="flex ">
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
          <h1 className="text-2xl font-bold mb-4">Edit Contact</h1>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <ContactForm
            initialFormData={{
              firstName: formData.firstName,
              lastName: formData.lastName,
              status: formData.status,
            }}
            onSubmit={handleFormSubmit}
            isEditMode={true} // Set isEditMode to true for EditContactPage
          />
        </div>
      </div>
    </div>
  );
};

export default EditContactPage;
