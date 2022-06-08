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
      `/api/streams/live_inputs/${streamId}/videos`,
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

  useEffect(() => {
    // update every 5 seconds
    const interval = setInterval(() => {
      try {
        const data = JSON.parse(sessionStorage.getItem("streamData"));
        //const outs = JSON.parse(sessionStorage.getItem("streamOutputs"));
        setStreamName("- " + data.result.meta.name);
        if (data.result.status.current.state !== streamingState) {
          if (
            sessionStorage.getItem("key") !== null &&
            sessionStorage.getItem("selectedAccount") !== null &&
            sessionStorage.getItem("selectedStream") !== null
          ) {
            const key = sessionStorage.getItem("key");
            const id = JSON.parse(sessionStorage.getItem("selectedAccount")).id;
            const uid = JSON.parse(
              sessionStorage.getItem("selectedStream")
            ).uid;
            if (key && id && uid) {
              getStreamOutputs(key, id, uid).then((streamOutputs) => {
                if (streamOutputs.result[0].uid !== streamId) {
                  setStreamId(streamOutputs.result[0].uid);
                }
              });
            }
          }
        }
        setStreamingState(data.result.status.current.state);
      } catch (e) {
        console.error(e);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Preview">
      <div className="Preview-header">
        <div className="Preview-header-status">
          {streamingState === "connected" ? (
            <svg height="20" width="20">
              <circle cx="10" cy="10" r="10" fill="red" />
            </svg>
          ) : (
            <svg height="20" width="20">
              <circle cx="10" cy="10" r="10" fill="yellow" />
            </svg>
          )}
          <h2>Live Preview {streamName}</h2>
        </div>
        <div className="Preview-header-icons">
          {streamingState === "connected" ? (
            <img src={cfstream} alt="cfstream" />
          ) : null}
        </div>
      </div>
      <div className="Preview-content">
        {streamingState === "connected" && streamId !== "" ? (
            <div>
            <Stream controls muted autoplay src={JSON.parse(
                sessionStorage.getItem("selectedStream")
              ).uid} />
          </div>
        ) : (
          <div className="notStreaming">
            <p>{streamingState}...</p>
          </div>
        )}
        {/*<div className="videoPlayer">
            <iframe
              title="Stream Preview"
              src={`https://iframe.videodelivery.net/${JSON.parse(
                sessionStorage.getItem("selectedStream")
              ).uid}`}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowfullscreen="true"
            ></iframe>
          </div>*/}
      </div>
    </div>
  );
}
