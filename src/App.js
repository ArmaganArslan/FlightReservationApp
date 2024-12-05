import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FlightSearchForm from './components/FlightSearchForm';
import FlightList from './components/FlightList';
import MyFlights from './components/MyFlights';
import Sidebar from './components/Sidebar';
import PromoCards from './components/PromoCards';
import './App.css';
import './index.css';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <div className="min-h-screen bg-purple-50">
          <div className="max-w-7xl mx-auto p-4">
            <Header />
            
            <main className="mt-6">
              <Routes>
                <Route path="/" element={
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-3/4 space-y-6">
                      <FlightSearchForm />
                      <div className="flex flex-col-reverse lg:flex-row gap-6">
                        <div className="lg:w-8/12">
                          <FlightList />
                        </div>
                        <div className="lg:w-4/12">
                          <Sidebar />
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/4 space-y-4">
                      <PromoCards />
                    </div>
                  </div>
                } />
                <Route path="/my-flights" element={<MyFlights />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;

