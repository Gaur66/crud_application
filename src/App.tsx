import React from 'react';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './components/Dasboard';
import Contact from './components/Contact';
import CreateContactpage from './components/CreateContactpage';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import EditContactPage from './components/EditContactPage';
const queryClient = new QueryClient();



function App() {
  return (
 
    <QueryClientProvider client={queryClient}>
   
   <Provider store={store}>
   <BrowserRouter>
   <Routes>

<Route path="/" element={<Contact />} />

<Route path="/createcontact" element={<CreateContactpage />} />
<Route path="/editcontact/:id" element={<EditContactPage />} />
<Route path="/dashboard" element={<Dashboard />} />
</Routes>
    </BrowserRouter>
    </Provider>
    </QueryClientProvider>

  );
}

export default App;
