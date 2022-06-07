// Copyright Mackenly Jones. All rights reserved.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the GNU AFFERO GENERAL PUBLIC LICENSE 3.0.

import { useState, useEffect } from "react";

import { Header } from "./components/Header";
import { Auth } from "./components/auth/Auth";
import { Preview } from "./components/preview/Preview";
import { Options } from "./components/options/Options";
import { Chat } from "./components/chat/Chat";
import { Updates } from "./components/updates/Updates";
import { Footer } from "./components/Footer";
import "./App.css";
import "./components/auth/Auth.css";
import "./components/options/Options.css";
import "./components/chat/Chat.css";
import "./components/updates/Updates.css";
import "./components/preview/Preview.css";

function App() {
  const [stream, setStream] = useState(null);
  const [streamData, setStreamData] = useState(null);
  const [streamOutputs, setStreamOutputs] = useState(null);

  function updateStuff() {
    if (sessionStorage.getItem("selectedStream")) {
      const selectedStream = JSON.parse(
        sessionStorage.getItem("selectedStream")
      );
      setStream(selectedStream);
    }
    if (sessionStorage.getItem("streamData")) {
      const selectedStreamData = JSON.parse(
        sessionStorage.getItem("streamData")
      );
      setStreamData(selectedStreamData);
    }
    if (sessionStorage.getItem("streamOutputs")) {
      const selectedStreamOutputs = JSON.parse(
        sessionStorage.getItem("streamOutputs")
      );
      setStreamOutputs(selectedStreamOutputs);
    }
  }

  useEffect(() => {
    updateStuff();
  });
  return (
    <div className="App">
      <Auth />
      <Header className="App-header" />
      <main className="App-body">
        {
          stream !== null && streamData !== null && streamOutputs !== null ? (
            <>
              <Preview streamData={streamData} streamOutputs={streamOutputs} />
              <Options streamData={streamData} streamOutputs={streamOutputs} />
              <Chat />
              <Updates />
              </>
            ) : <div>Loading...</div>
        }
      </main>
      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
