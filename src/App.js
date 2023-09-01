
import './App.css';
import Delete from './Delete';
import Get from './Get';
import GetById from './GetById';
import Put from './Put';
import Post from './DataInsert';
import TempNewForm from './TempNewForm';




function App() {
  return (
    <div className='App' height="100" width="50">
      <h1>Post method</h1>
      <Post/>
      <h1>Get method</h1>
    <Get /> 
    <h1>GetById method</h1>
    <GetById/>
    <h1>Delete</h1>
    <Delete/>
    <h1>Put</h1>
    <Put/>
    <TempNewForm/>
        </div>
       
       
   
  );
}

export default App;
