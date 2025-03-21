import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Importamos useNavigate para la redirección

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate() // Hook para navegación

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simula una respuesta de inicio de sesión
    setTimeout(() => {
      setIsLoading(false)
      // En lugar de mostrar un alert, navegamos a la página /chat
      navigate('/chat')
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-3 px-4 md:px-6 shadow-md dark:bg-blue-800">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <span className="text-xl">🔒</span> Sign In
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full mx-auto h-full flex flex-col justify-center">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Sign In to Your Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-center p-4">
        <p className="text-gray-600 dark:text-gray-400">Powered by Social-Retriever</p>
      </footer>
    </div>
  )
}

export default Signin