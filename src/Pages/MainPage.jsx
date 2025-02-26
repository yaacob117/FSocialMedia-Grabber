import Chatbot from "../Components/Chatbot"
import Navbar from "../Components/Navbar"

export const MainPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
        <Chatbot />
    </div>
  )
}