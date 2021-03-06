// Copyright Mackenly Jones. All rights reserved.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the GNU AFFERO GENERAL PUBLIC LICENSE 3.0.

import { useState, useEffect } from "react";
import { Cloudflare } from "./output-options/Cloudflare";
import { Rtmp } from "./output-options/Rtmp";
import { Srt } from "./output-options/Srt";

import cfstream from "../../assets/cfstream.svg";
import rtmp from "../../assets/rtmp.svg";
import srt from "../../assets/srt.svg";
import add from "../../assets/add.svg";
import remove from "../../assets/remove.svg";

export function Options() {
  const [outputs, setOutputs] = useState([
    {
      id: 1,
      type: "cloudflare",
      displayName: "Cloudflare",
      icon: cfstream,
      content: <Cloudflare />,
    },
  ]);
  const [active, setActive] = useState(outputs[0]);
  const [counter, setCounter] = useState(outputs.length + 1);
  const [outputsData, setOutputsData] = useState(null);

  function isEqual(obj1, obj2) {
    var props1 = Object.getOwnPropertyNames(obj1);
    var props2 = Object.getOwnPropertyNames(obj2);
    if (props1.length != props2.length) {
      return false;
    }
    for (var i = 0; i < props1.length; i++) {
      let val1 = obj1[props1[i]];
      let val2 = obj2[props1[i]];
      let isObjects = isObject(val1) && isObject(val2);
      if (
        (isObjects && !isEqual(val1, val2)) ||
        (!isObjects && val1 !== val2)
      ) {
        return false;
      }
    }
    return true;
  }
  function isObject(object) {
    return object != null && typeof object === "object";
  }

  async function addOutput(urlIn, streamKeyIn) {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("key"),
        "account-id": JSON.parse(sessionStorage.getItem("selectedAccount")).id,
      },
      body: JSON.stringify({
        url: urlIn,
        streamKey: streamKeyIn,
      }),
    };
    const response = await fetch(
      `/api/streams/live_inputs/${
        JSON.parse(sessionStorage.getItem("selectedStream")).uid
      }/outputs`,
      init
    );
    const body = await response.json();
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status !== 200) {
      throw new Error(body);
    }
    setOutputs([
      ...outputs,
      {
        id: body.result.uid,
        type: "rtmp",
        displayName: "RTMP",
        icon: rtmp,
        content: (
          <Rtmp
            key={body.result.uid}
            id={body.result.uid}
            url={body.result.url}
            streamKey={body.result.streamKey}
            status={body.result.status}
          />
        ),
      },
    ]);
    setActive(outputs[0]);
    getOutputs();
  }

  async function removeOutput(id) {
    const init = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("key"),
        "account-id": JSON.parse(sessionStorage.getItem("selectedAccount")).id,
      },
    };
    const response = await fetch(
      `/api/streams/live_inputs/${
        JSON.parse(sessionStorage.getItem("selectedStream")).uid
      }/outputs/${id}`,
      init
    );
    const body = await response.json();
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status !== 200) {
      throw new Error(body);
    }
    setActive(outputs[0]);
    getOutputs();
  }

  async function getOutputs() {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("key"),
        "account-id": JSON.parse(sessionStorage.getItem("selectedAccount")).id,
      },
    };
    const response = await fetch(
      `/api/streams/live_inputs/${
        JSON.parse(sessionStorage.getItem("selectedStream")).uid
      }/outputs`,
      init
    );
    const data = await response.json();
    if (!isEqual(data, JSON.parse(sessionStorage.getItem("streamOutputs")))) {
      renderOutputs(data);
      sessionStorage.setItem("streamOutputs", JSON.stringify(data));
    }
  }

  function renderOutputs(data) {
    setOutputsData(data);
    const out = data.result.map((output) => {
      return {
        id: output.uid,
        type: "rtmp",
        displayName: "RTMP",
        icon: rtmp,
        content: (
          <Rtmp
            key={output.uid}
            id={output.uid}
            url={output.url}
            streamKey={output.streamKey}
            status={output.status}
          />
        ),
      };
    });
    setOutputs([
      {
        id: 1,
        type: "cloudflare",
        displayName: "Cloudflare",
        icon: cfstream,
        content: <Cloudflare />,
      },
      ...out,
    ]);
  }

  useEffect(
    function () {
      // update every second
      const interval = setInterval(() => {
        try {
          if (outputs.length < 2) {
            getOutputs();
          }
        } catch (e) {
          console.error(e);
        }
      }, 2000);
      return function cleanup() {
        clearInterval(interval);
      };
    },
    [outputs.length]
  );

  useEffect(function () {
    const interval = setInterval(() => {
      try {
        if (outputsData !== null) {
          const newOutputs = JSON.parse(
            sessionStorage.getItem("streamOutputs")
          );
          if (!isEqual(newOutputs, outputsData)) {
            renderOutputs(newOutputs);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }, 2000);
    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="Options">
      <h2>Options and Outputs</h2>
      <div className="Options-tabs">
        {outputs.map((output) => {
          var classNames = "Options-tab";
          if (active === output) {
            classNames = "Options-tab Options-tab-active";
          }
          if (output.type === "srt") {
            return (
              <div
                className={classNames}
                key={output.id + "-" + output.type}
                onClick={() => setActive(output)}
              >
                <img
                  src={output.icon}
                  className="srt-header-tab"
                  alt={output.displayName + " Icon"}
                />
              </div>
            );
          }
          return (
            <div
              className={classNames}
              key={output.id + "-" + output.type}
              onClick={() => setActive(output)}
            >
              <img src={output.icon} alt={output.displayName + " Icon"} />
              <p>{output.displayName}</p>
            </div>
          );
        })}
        <button
          className="Options-tabs-add right-rounded"
          onClick={() => {
            // add a new output to the list
            setCounter(counter + 1);
            const newOutput = {
              id: counter,
              type: "rtmp",
              displayName: "RTMP",
              icon: rtmp,
              content: <Rtmp key={counter} id={counter} url="" streamKey="" />,
            };
            setOutputs([...outputs, newOutput]);
            setActive(newOutput);
          }}
        >
          <img src={add} alt="Add Icon" />
          <p>Add RTMP</p>
        </button>
        {/*
                    <button className="Options-tabs-add right-rounded" onClick={
                        () => {
                            // add a new output to the list
                            setCounter( counter + 1 );
                            const newOutput = {
                                id: counter,
                                type: 'srt',
                                displayName: 'SRT',
                                icon: srt,
                                content: <Srt
                                    streamData={streamData}
                                    streamOutputs={streamOutputs}
                                />
                            };
                            setOutputs( [...outputs, newOutput] );
                            setActive( newOutput );
                        }
                    }>
                        <img src={ add } alt="Add Icon" />
                        <p>Add</p>
                        <img src={ srt } className="srt-logo" alt="SRT" />
                    </button>
                */}
      </div>
      <div className="Options-content-header">
        <h3>{active.displayName}</h3>
        {active.type !== "cloudflare" && (
          <img
            src={remove}
            height="30px"
            title={"Remove " + active.displayName}
            alt={"Remove " + active.displayName}
            onClick={() => {
              // delete the output
              if (
                active.id.toString() !== "1" &&
                active.id.toString().length < 4
              ) {
                getOutputs();
              } else {
                removeOutput(active.id);
              }
            }}
          />
        )}
      </div>
      <>{active.content}</>
      {active.id.toString() !== "1" && active.id.toString().length < 4 && (
        <button
          className="Options-change-button"
          onClick={() => {
            const url = document.getElementById(active.id + "-url").value;
            const streamKey = document.getElementById(active.id + "-key").value;
            try {
              addOutput(url, streamKey);
            } catch (e) {
              console.error(e);
            }
          }}
        >
          Add Output
        </button>
      )}
      {active.id.toString().length > 3 && (
        <button
          className="Options-change-button"
          onClick={() => {
            const oldId = active.id;
            const url = document.getElementById(active.id + "-url").value;
            const streamKey = document.getElementById(active.id + "-key").value;
            try {
              removeOutput(oldId);
              addOutput(url, streamKey);
            } catch (e) {
              console.error(e);
            }
          }}
        >
          Update Output
        </button>
      )}
    </div>
  );
}
