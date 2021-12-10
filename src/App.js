import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import './App.css';
import AddEdit from './pages/AddEdit';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import View from './pages/View';
import Home from './pages/Home';
import Header from './components/Header';



function App() {
  return (
  <BrowserRouter>
  <div className="App">
    <Header/>1
  <ToastContainer position="top-center" />
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/add" component={AddEdit} />
    <Route path="/update/:id" component={AddEdit} />
    <Route path="/view/:id" component={View} />
  </Switch>
  </div>
  </BrowserRouter>
  );
}

export default App;
