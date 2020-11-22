import React, { useState } from "react";
import ServerList from "./components/server-list.jsx";

function App() {
  return (
    <React.Fragment>
      <div data-testid="app" class="container">
        <h1>GameBrowser</h1>
        <ServerList />
        
      </div>
      <footer>
        <div class="container">
          <div class="footer-icons">
            <a href="https://github.com/jonifen/gamebrowser-web" target="_blank" rel="noopener noreferrer"><span class="icon-github"></span></a>
          </div>
          <p>
            Created by Jon Cain @ <a href="https://jonifen.co.uk">jonifen.co.uk</a>
          </p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default App;