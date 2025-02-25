import { Link } from 'react-router-dom'
import { Home, MessageCircle, User, LogOut } from 'lucide-react'

export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl">🐕</span>
            <span className="text-lg font-bold text-blue-600">Social-Retriever</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 md:gap-2">
            <Link 
              to="/" 
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              title="Home"
            >
              <Home size={20} />
            </Link>
            <Link 
              to="/chat" 
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              title="Chat"
            >
              <MessageCircle size={20} />
            </Link>
            <Link 
              to="/profile" 
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              title="Profile"
            >
              <User size={20} />
            </Link>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-200 mx-1"></div>
            
            {/* Sign Out Button */}
            <button 
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar