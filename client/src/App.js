import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Dashboard />
      {/* <div className="dashboard">
        <div className="display">Display</div>
        <div className="controls">
          <button handleClick={}>Capsule</button>
          <img src={rocket} className="rocket-logo" alt="rocket" />
          <form onSubmit="this.handleSubmit">
            <input type="text" name="" placeholder="Enter Capsule ID"/>
            <button>Landing Pad</button>
          </form>
        </div>
      </div> */}
    </div>
  );
}

export default App;
