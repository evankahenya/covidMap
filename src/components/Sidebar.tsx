import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '300px', zIndex: 1000 }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-10 top-4 bg-white shadow-md"
        onClick={onToggle}
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">COVID-19 Statistics</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Total Cases (Africa)</h3>
            <p className="text-2xl font-bold text-blue-600">9.5M</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold mb-2">Recovered</h3>
            <p className="text-2xl font-bold text-green-600">8.9M</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-semibold mb-2">Deaths</h3>
            <p className="text-2xl font-bold text-red-600">270K</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;