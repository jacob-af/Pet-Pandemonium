import { Route, BrowserRouter as Router } from "react-router-dom";

import { ChatProvider } from "./utils/ChatState";
import Footer from "./components/Footer/Footer";
import Game from "./pages/Game";
import { GameProvider } from "./utils/GameState";
import Lobby from "./pages/Lobby";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import React from "react";
import { SocketProvider } from "./utils/SocketState";
import { UserProvider } from "./utils/UserState";
import grass_field from "./assets/img/grass_field.png";

function App() {
  return (
    <Router>
      <body
        style={{
          backgroundImage: `url(${grass_field})`,
          backgroundSize: "100% auto", // Ensure it covers the full width and auto-adjusts the height
          backgroundRepeat: "repeat-y", // Repeats the background vertically
          height: "100vh", // Full viewport height
          width: "100vw", // Full viewport width
          margin: 0, // Removes any default margin
          padding: 0, // Removes any default padding
          overflowX: "hidden" // Prevents horizontal scroll if needed
        }}
      >
        <UserProvider>
          <SocketProvider>
            <Navbar />
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <ChatProvider>
              <GameProvider>
                <Route exact path="/lobby" component={Lobby} />
                <Route exact path="/game" component={Game} />
              </GameProvider>
            </ChatProvider>
            <Footer />
          </SocketProvider>
        </UserProvider>
      </body>
    </Router>
  );
}

export default App;
