import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import MainContent from '../components/dash_content';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
     
      <div className="d-flex">
        <Sidebar onTabChange={handleTabChange} />
        <div className="flex-grow-1 p-3">
          <MainContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
