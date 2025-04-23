import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UploadVeggie from './components/UploadVeggie';
import UploadImage from './components/UploadImage'
import './App.css'




function App() {
  const [count, setCount] = useState(0);

  return (
    
    <div className="flex items-center justify-between p-4">
      
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-xl">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>
      <div className="tw-text-3xl tw-text-blue-500 tw-font-bold">
         Hello Tailwind v4!
      </div>
      <div>
        <h1>SmartFarm Market</h1>
       <UploadVeggie />
      </div>
      <div className="App">
        <h1>SmartFarm Market</h1>
        <UploadImage />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
    
  );
}

export default App