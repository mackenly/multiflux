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
  const [updated, setUpdated] = useState(false);

  async function updateStuff() {
    if (sessionStorage.getItem("selectedStream")) {
      setStream(JSON.parse(
        sessionStorage.getItem("selectedStream")
      ));
    }
    if (sessionStorage.getItem("streamData")) {
      setStreamData(JSON.parse(
        sessionStorage.getItem("streamData")
      ));
    }
    if (sessionStorage.getItem("streamOutputs")) {
      setStreamOutputs(JSON.parse(
        sessionStorage.getItem("streamOutputs")
      ));
    }
    if (stream !== null && streamData !== null && streamOutputs !== null) {
      console.log(stream, streamData, streamOutputs);
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    updateStuff();
  }, [updated]);

  return (
    <div className="App">
      <Auth />
      <Header className="App-header" />
      <main className="App-body">
        <Preview streamData={streamData} streamOutputs={streamOutputs} />
        <Options streamData={streamData} streamOutputs={streamOutputs} />
        <Chat />
        <Updates />
      </main>
      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
