import React, { useState } from 'react';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  status: string;
}

interface ContactFormProps {
  initialFormData: ContactFormData;
  onSubmit: (formData: ContactFormData) => void;
  isEditMode: boolean; // Add the isEditMode prop
}

const ContactForm: React.FC<ContactFormProps> = ({ initialFormData, onSubmit, isEditMode }) => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex items-center justify-center h-200 w-300">
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4 flex items-center">
          <label className="block font-medium mr-2">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block font-medium mr-2">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block font-medium mr-2">Status:</label>
          <label className="inline-block mr-2">
            <input
              type="radio"
              name="status"
              value="active"
              checked={formData.status === 'active'}
              onChange={handleInputChange}
            />
            Active
          </label>
          <label className="inline-block">
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={formData.status === 'inactive'}
              onChange={handleInputChange}
            />
            Inactive
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 w-full"
        >
          {isEditMode ? 'Update Contact' : 'Create Contact'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
