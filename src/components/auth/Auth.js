// Copyright Mackenly Jones. All rights reserved.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the GNU AFFERO GENERAL PUBLIC LICENSE 3.0.

import { useState, useEffect } from "react";

import paste from "../../assets/paste.svg";

export function Auth() {
  const [active, setActive] = useState();

  if (
    sessionStorage.getItem("isSelecting") === "false" &&
    sessionStorage.getItem("key") !== null &&
    sessionStorage.getItem("key") !== undefined
  ) {
    return;
  }

  return (
    <div className="Auth">
      <div className="Auth-box">
        <div className="Auth-box-header">
          <h2>Cloudflare Connection</h2>
        </div>
        <div className="Auth-box-content">
          {active !== undefined ? (
            active
          ) : sessionStorage.getItem("key") === null ? (
            <Login setActive={setActive} />
          ) : (
            <Select setActive={setActive} />
          )}
        </div>
      </div>
    </div>
  );
}

function Login(props) {
  const [key, setKey] = useState("");

  const getAccountDetails = async (key) => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      },
    };
    const response = await fetch("/api/accounts", init);
    const body = await response.json();
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status !== 200) {
      throw new Error(body.errors[0].message);
    }
    return body;
  };

  const handleLogin = async (key) => {
    try {
      if (key === "") {
        throw Error("Please enter a key");
      }
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${key}`,
        },
        redirect: "follow",
      };
      const response = await fetch("/api/login", init).catch((err) => {
        throw Error("Key validation failed");
      });
      const data = await response.json();

      if (response.status === 200) {
        // get account details
        const accountDetails = await getAccountDetails(key).catch((err) => {
          throw Error("Account details failed");
        });
        sessionStorage.setItem(
          "accountDetails",
          JSON.stringify(accountDetails)
        );
        sessionStorage.setItem("key", key);
        sessionStorage.setItem("isSelecting", true);
        sessionStorage.setItem("user", JSON.stringify(data));
        props.setActive(<Select setActive={props.setActive} />);
      } else {
        throw Error("Invalid key");
      }
    } catch (error) {
      throw Error(error);
    }
  };

  return (
    <div className="Auth-Login">
      <div className="Auth-Login-Container">
        <p>Enter your authentication information below.</p>
        <details>
          <summary>Required Token Permissions</summary>
          <p>
            When creating your token use the Read all Resources template and
            then also add Edit permissions for Account/Stream
          </p>
        </details>
        <div className="Auth-form">
          <label>Auth Key:</label>
          <br />
          <div className="Auth-form-key">
            <input
              type="password"
              placeholder="5f4dcc3b5aa765d61d8327deb882cf99"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                e.target.type = "text";
                setTimeout(() => {
                  e.target.type = "password";
                }, 1500);
              }}
            />
            <img
              src={paste}
              height="18x"
              alt="Paste from clipboard"
              onClick={() => {
                navigator.clipboard.readText().then((text) => {
                  setKey(text.trim());
                });
                document.getElementById("key-pasted").classList.add("show");
                setTimeout(() => {
                  try {
                    document
                      .getElementById("key-pasted")
                      .classList.remove("show");
                  } catch (error) {}
                }, 2000);
              }}
            />
          </div>
          <span id="key-pasted">Pasted 🤿</span>
          <br />
          <span id="key-error-text">
            Invalid Key{" "}
            <a
              href="https://dash.cloudflare.com/profile/api-tokens"
              target="_blank"
              rel="noopener noreferrer"
            >
              See your keys.
            </a>
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          handleLogin(key).catch((error) => {
            console.error(error);
            document.getElementById("key-error-text").innerText = error.message;
            document.getElementById("key-error-text").classList.add("show");
            setTimeout(() => {
              try {
                document
                  .getElementById("key-error-text")
                  .classList.remove("show");
              } catch (error) {}
            }, 2000);
          });
        }}
      >
        Login
      </button>
    </div>
  );
}

function Logout(props) {
  return (
    <div className="Auth-Logout">
      <div className="Auth-Logout-Container">
        <p>Are you sure?</p>
        <button
          id="Auth-Logout-Cancel"
          onClick={() => {
            props.setActive(<Select setActive={props.setActive} />);
          }}
        >
          Cancel
        </button>
      </div>
      <button
        onClick={() => {
          sessionStorage.clear();
          props.setActive(<Login setActive={props.setActive} />);
        }}
      >
        Yes, Logout
      </button>
    </div>
  );
}

function Select(props) {
  const [selectedAccount, setSelectedAccount] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [selectedStream, setSelectedStream] = useState({});
  const [streams, setStreams] = useState([]);

  async function getAccountDetails(key) {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      },
    };
    const response = await fetch("/api/accounts", init);
    const body = await response.json();
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status !== 200) {
      throw new Error(body.errors[0].message);
    }
    return body;
  }

  async function getStreamDetails(key, accountID) {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        "account-id": `${accountID}`,
        Accept: "application/json",
      },
    };
    const response = await fetch("/api/streams/live_inputs", init);
    const body = await response.json();
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status !== 200) {
      throw new Error(body.errors[0].message);
    }
    return body;
  }

  function handleAccountSelect(account) {
    setSelectedAccount(account);
    sessionStorage.setItem("selectedAccount", JSON.stringify(account));
    getStreamDetails(sessionStorage.getItem("key"), account.id)
      .then((streamsList) => {
        setStreams(streamsList.result);
        setSelectedStream(streams[0]);
        sessionStorage.setItem("selectedStream", JSON.stringify(streams[0]));
        console.log(
          "Account Changed: No stream selected, setting default stream"
        );
      })
      .catch((err) => {
        throw Error("Streams failed");
      });
  }

  function grabAccounts() {
    const stored = JSON.parse(sessionStorage.getItem("accountDetails"));
    if (stored === undefined || stored === null) {
      console.log("No account details found, getting account details");
      getAccountDetails(sessionStorage.getItem("key"))
        .catch((err) => {
          throw Error("Account details failed: " + err.message);
        })
        .then((res) => {
          sessionStorage.setItem("accountDetails", JSON.stringify(res));
          setAccounts(res.result);
        });
    } else {
      setAccounts(stored.result);
    }
  }

  function selectedAccountGrab() {
    const selectedStored = JSON.parse(
      sessionStorage.getItem("selectedAccount")
    );
    if (selectedStored === null || selectedStored === undefined) {
      console.log("No account selected, setting default account");
      setSelectedAccount(accounts[0]);
      sessionStorage.setItem("selectedAccount", JSON.stringify(accounts[0]));
    } else {
      setSelectedAccount(selectedStored);
    }
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
    try {
      const key = sessionStorage.getItem("key");
      if (key === undefined || key === null) {
        console.log("No key found, redirecting to login");
        props.setActive(<Login setActive={props.setActive} />);
      }

      grabAccounts();

      selectedAccountGrab();
    } catch (error) {
      console.error(error.message);
    }
  }, [props]);

  return (
    <div className="Auth-Select">
      <div className="Auth-Select-Container">
        <p>Select A Stream</p>
        <div className="Auth-form">
          <div className="Auth-form-account">
            <select
              name="account-selector"
              id="account-selector"
              onChange={(e) => {
                if (e.target.selectedIndex !== 0) {
                  handleAccountSelect(accounts[e.target.selectedIndex - 1]);
                }
              }}
            >
              <option value="">Select an account</option>
              {accounts.map((account) => {
                return (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="Auth-form-stream">
            <select
              name="stream-selector"
              id="stream-selector"
              onChange={(e) => {
                if (e.target.selectedIndex !== 0) {
                  setSelectedStream(streams[e.target.selectedIndex - 1]);
                  sessionStorage.setItem(
                    "selectedStream",
                    JSON.stringify(streams[e.target.selectedIndex - 1])
                  );
                }
              }}
            >
              <option value="">Select a stream</option>
              {streams.map((stream) => {
                return (
                  <option key={stream.uid} value={stream.uid}>
                    {stream.meta.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button
          id="Auth-Select-Use"
          onClick={() => {
            console.log("Stream selected: " + selectedStream);
            if (
              selectedStream.uid !== undefined &&
              selectedStream.uid !== null
            ) {
              getStreamData(
                sessionStorage.getItem("key"),
                selectedAccount.id,
                selectedStream.uid
              )
                .then((streamData) => {
                  getStreamOutputs(
                    sessionStorage.getItem("key"),
                    selectedAccount.id,
                    selectedStream.uid
                  )
                    .then((streamOutputs) => {
                      sessionStorage.setItem(
                        "streamData",
                        JSON.stringify(streamData)
                      );
                      sessionStorage.setItem(
                        "streamOutputs",
                        JSON.stringify(streamOutputs)
                      );
                      sessionStorage.setItem("isSelecting", false);
                      window.location.reload();
                    })
                    .catch((err) => {
                      throw Error("Stream outputs failed");
                    });
                })
                .catch((err) => {
                  throw Error("Stream data failed");
                });
            }
          }}
        >
          Select Stream
        </button>
        <button
          id="Auth-Select-Add"
          onClick={() => {
            window.open(
              `https://dash.cloudflare.com/${selectedAccount.id}/stream/inputs/create`,
              "_blank",
              "noopener noreferrer"
            );
          }}
        >
          Create Stream on Cloudflare
        </button>
      </div>
      <button
        onClick={() => {
          props.setActive(<Logout setActive={props.setActive} />);
        }}
      >
        Logout
      </button>
    </div>
  );
}
