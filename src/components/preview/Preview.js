// Copyright Mackenly Jones. All rights reserved.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the GNU AFFERO GENERAL PUBLIC LICENSE 3.0.

import { useState, useEffect } from "react";
import { Stream } from "@cloudflare/stream-react";

import cfstream from "../../assets/cfstream.svg";
import colorbars from "../../assets/colorbars.png";

export function Preview() {
  const [streamName, setStreamName] = useState("");
  const [streamId, setStreamId] = useState("");
  const [streamingState, setStreamingState] = useState("disconnected");

  useEffect(() => {
    // update every second
    const interval = setInterval(() => {
      try {
        const data = JSON.parse(sessionStorage.getItem("streamData"));
        const outs = JSON.parse(sessionStorage.getItem("streamOutputs"));
        setStreamName("- " + data.result.meta.name);
        setStreamId(outs.result[0].uid);
        setStreamingState(data.result.status.current.state);
      } catch (e) {}
      switch (streamingState) {
        case "connected":
          // streaming:
          break;
        case "disconnected":
          // not streaming:
          break;
        default:
          // unknown:
          break;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Preview">
      <div className="Preview-header">
        <div className="Preview-header-status">
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="10" fill="red" />
          </svg>
          <h2>Live Preview {streamName}</h2>
        </div>
        <div className="Preview-header-icons">
          <img src={cfstream} alt="cfstream" />
        </div>
      </div>
      <div className="Preview-content">
        {streamingState === "connected" ? (
          <Stream controls autoplay src={streamId} />
        ) : (
          <div className="notStreaming">
            <p>{ streamingState }...</p>
          </div>
        )}
      </div>
    </div>
  );
}
