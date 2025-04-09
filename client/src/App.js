import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import Main from "./components/layout/Main";
import Profile from "./components/pages/Profile";
import Shipments from "./components/pages/Shipments";

import Dashboard from "./components/Masters/Dashboard";
import weightProcess from "./components/Masters/WeightProcess";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); 

function App() {
  const token = sessionStorage.getItem("token");

  // useEffect(() => {
  //   socket.on('testMessage', (message) => {
  //     console.log('Message from server:', message);
  //     alert(message); // Show an alert for testing
  //   });
  //   return () => {
  //     socket.off('testMessage');
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Connected to Socket.IO server:", socket.id);
  //   });

  //   socket.on("taskCreated", (task) => {
  //     console.log("New task created:", task); 
  //     alert(`New Task: ${task.title}`); 
  //   });

  //   socket.on('TaskUpdated', (task) => {
  //     console.log('Task updated:', task);
  //     alert(`Task updated: ${task.title}`);
  //   });
  //   socket.on('taskDeleted', (taskId) => {
  //     console.log('Task deleted:', taskId);
  //     alert(`Task deleted: ${taskId}`);
  //   });
    
  //   return () => {
  //     socket.off("taskCreated");
  //     socket.off('TaskUpdated');
  //     socket.off('taskDeleted');
  //   };
  // }, []);

  return (
    <div className="App">
    <Switch>

      <Route path="/sign-up" exact component={SignUp} />
      <Route path="/sign-in" exact component={SignIn} />
      {token && (
        <Main>
          <Route path="/home" exact component={Home} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/weight-process" exact component={weightProcess} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/shipments" exact component={Shipments} />
        </Main>
      )}

      <Redirect from="*" to={token ? "/home" : "/sign-in"} />
    </Switch>
  </div>
  );
}

export default App;
