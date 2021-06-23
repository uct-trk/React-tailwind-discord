import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/">
      <Header />
      <Hero/>
      </Route>

      {/* <Route path="/channels">
        <Home/>
      </Route> */}
      </Switch>
      </Router>
    </div>
  );
}

export default App;
