import React from 'react';
import { X, Settings, HelpCircle, LogOut } from 'lucide-react';

interface ProfileProps {
  showProfile: boolean;
  toggleProfile: () => void;
}

const Profile: React.FC<ProfileProps> = ({ showProfile, toggleProfile }) => {
  const user = {
    name: "Profile",
    email: "user@VChat.com",
    avatar: "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1741604349~exp=1741607949~hmac=cd8b436839508d68a0a73b972f7e4cf9a1c86566f2e2f9cc7334609da16825eb&w=900",
    plan: "Free Plan",
    joinDate: "Joined January 2025"
  };

  return (
    <div 
      className={`fixed inset-y-0 right-0 z-40 w-80 bg-white shadow-lg transform ${
        showProfile ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out flex flex-col h-full`}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium">Profile</h2>
        <button 
          onClick={toggleProfile}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="text-center mb-8">
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-xl font-medium">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
          <div className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {user.plan}
          </div>
          <p className="text-xs text-gray-500 mt-2">{user.joinDate}</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Usage Statistics</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Messages</span>
                  <span>45/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <Settings size={18} className="mr-3" />
                <span>Settings</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <HelpCircle size={18} className="mr-3" />
                <span>Help & Support</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors text-red-600">
              <div className="flex items-center">
                <LogOut size={18} className="mr-3" />
                <span>Log Out</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">VChat v1.0.0</p>
      </div>
    </div>
  );
};

export default Profile;