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

  async function getStreamOutputs(key, accountId, streamId) {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        "account-id": `${accountId}`,
        Accept: "application/json",
      },
    };
    const response = await fetch(
      `/api/streams/live_inputs/${streamId}/outputs`,
      init
    );
    const body = await response.json();
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status !== 200) {
      throw new Error(body.errors[0].message);
    }
    return body;
  }

  async function getStreamData(key, accountId, streamId) {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        "account-id": `${accountId}`,
        Accept: "application/json",
      },
    };
    const response = await fetch(`/api/streams/live_inputs/${streamId}`, init);
    const body = await response.json();
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status !== 200) {
      throw new Error(body.errors[0].message);
    }
    return body;
  }
  // List outputs, Live input details

  useEffect(() => {
    // update every 5 seconds
    const interval = setInterval(() => {
      try {
        const updatedStreamOutputs = getStreamOutputs(
          sessionStorage.getItem("key"),
          JSON.parse(sessionStorage.getItem("selectedAccount")).id,
          JSON.parse(sessionStorage.getItem("selectedStream")).uid
        );
        sessionStorage.setItem("streamOutputs", JSON.stringify(updatedStreamOutputs));
        const updatedStreamData = getStreamData(
          sessionStorage.getItem("key"),
          JSON.parse(sessionStorage.getItem("selectedAccount")).id,
          JSON.parse(sessionStorage.getItem("selectedStream")).uid
        );
        sessionStorage.setItem("streamData", JSON.stringify(updatedStreamData));
      } catch (e) {}
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Auth />
      <Header className="App-header" />
      <main className="App-body">
        <Preview />
        <Options />
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
