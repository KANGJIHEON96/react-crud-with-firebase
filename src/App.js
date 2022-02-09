import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import './App.css';
import AddEdit from './pages/AddEdit';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import View from './pages/View';
import Home from './pages/Home';
import Header from './components/Header';
import Reply from './pages/Reply';


function App() {
  return (
  <BrowserRouter>
  <div className="App">
    <Header/>
  <ToastContainer position="top-center" />
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/add" component={AddEdit} />
    <Route path="/update/:id" component={AddEdit} />
    <Route path="/view/:id" component={View} />
    <Route path="/reply/:id" component={Reply} />
  </Switch>
  </div>
  </BrowserRouter>
  );
}


export default App;
