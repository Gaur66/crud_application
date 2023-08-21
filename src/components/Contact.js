import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import Modal from "./Model/Model"; // Correct the path to the Modal component
import { AiOutlineMenuUnfold, AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate,useParams } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector from react-redux
import { useDispatch } from 'react-redux';
import { deleteContact } from './redux/contactSlice';
import { RootState } from './redux/types';
const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const navigation = useNavigate();
  const dispatch = useDispatch()
 
  // Use useSelector to get contacts from Redux store
  const contacts = useSelector((state) => state.contact);
  console.log(contacts,"dj")

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateContact = () => {
    navigation('/createcontact');
  };
  const handleEditContact = (contactId) => {
    console.log(contactId,"dkkffk")
  navigation(`/editcontact/${contactId}`)
  };

  const handleDeleteContact = (contactId) => {
    console.log(contactId,'d')
    // Dispatch deleteContact action to delete the contact from Redux store
    dispatch(deleteContact(contactId));
  };

  return (
    <div className="flex ">
      {isMobile && (
        <button
          onClick={toggleSideNav}
          className={`p-2 text-black absolute top-2 left-2 z-30 ${
            showSideNav ? "hidden" : ""
          }`}
        >
          <AiOutlineMenuUnfold size={24} />
        </button>
      )}

      {showSideNav || !isMobile ? (
        <div
          className={`w-72 bg-dark-purple ${
            isMobile ? "fixed top-0 left-0 h-full z-20" : "z-10"
          }`}
        >
          <SideNav />
        </div>
      ) : null}

      <div
        className={`flex-grow p-4 md:p-8 bg-gray-100 ${
          showSideNav && isMobile ? "ml-72" : ""
        }`}
        style={{
          maxWidth: isMobile && showSideNav ? "calc(100vw - 72px)" : "none",
          overflowX: isMobile && showSideNav ? "hidden" : "auto",
        }}
      >
        {isMobile && (
          <button
            onClick={toggleSideNav}
            className={`p-2 text-black absolute top-2 left-2 z-30 ${
              showSideNav ? "" : "hidden"
            }`}
          >
            <AiOutlineMenuUnfold size={24} />
          </button>
        )}

        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Contact List</h1>
          <button
            onClick={handleCreateContact}
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 mx-auto block"
          >
            Create Contact
          </button>
        </div>

        {contacts.contacts.length > 0 ? (
          /* Show contact list */
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.contacts.map((contact,index) => (
              <div key={contact.id} className="bg-white p-4 rounded-md shadow">
                <h2 className="text-lg font-semibold mb-2">FirstName:{contact.firstName} <br/>LastName:{contact.lastName}</h2>
                <p>Status: {contact.status}</p>
                <div className="mt-2">
                  <button
                    onClick={() => handleEditContact(index)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteContact(index)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Show modal */
          <div className="mt-20">
            {showModal && (
              <Modal onClose={handleCloseModal}>
                <div className="flex items-center justify-center">
                  <AiOutlineCloseCircle
                    size={24}
                    onClick={handleCloseModal}
                    className="cursor-pointer mr-2"
                  />
                  <br />
                  <p>No contacts found. Please add a contact using the "Create Contact" button.</p>
                </div>
              </Modal>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
