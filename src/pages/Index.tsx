import { useState } from 'react';
import Map from '@/components/Map';
import Sidebar from '@/components/Sidebar';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="relative">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Map />
    </div>
  );
};

export default Index;