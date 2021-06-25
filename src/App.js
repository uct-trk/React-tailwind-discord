import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Home from './components/Home/Home';
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

      <Route exact path="/channels">
        <Home/>
      </Route>

      <Route exact path="/channels/:id">
        <Home/>
      </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
