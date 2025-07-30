
import './App.css'
import Component from '../Components/Components'

function App() {
  
  return (
    <div className='flex flex-col w-full h-dvh bg-black gap-10'>
        <div >
          <h1 className="text-4xl font-bold text-white text-center mt-8">
        Username & Password Generator
        </h1>
        <p className="text-gray-300 text-center text-sm mt-2">
          Securely generate random Gmail ids and strong passwords.
        </p>
        </div>
      <div className='relative flex flex-wrap inset-x-0 justify-center'>
        <div className='relative flex flex-wrap justify-center flex-col rounded-2xl p-2 bg-white gap-12'>
          <Component props={"Gmail Generator"}/>
          <Component props={"Password Generator"}/>
        </div>
      </div>
      <br />
    </div>
  )
}

export default App
