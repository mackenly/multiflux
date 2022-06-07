// Copyright Mackenly Jones. All rights reserved.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the GNU AFFERO GENERAL PUBLIC LICENSE 3.0.

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response;
  const contentType = headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json());
  } else {
    return response.text();
  }
}

async function verify(request) {
  // check if the token is valid
  const { headers } = request;
  const init = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${headers.get("Authorization")}`,
      Accept: "application/json",
    },
  };
  console.log(headers);
  const response = await fetch(
    "https://api.cloudflare.com/client/v4/user/tokens/verify",
    init
  );
  const body = await gatherResponse(response);
  if (response.status === 401) {
    throw new Error("Unauthorized");
  } else if (response.status !== 200) {
    throw new Error(body);
  } else {
    return body;
  }
}

async function userDetails(request) {
  // get user's data
  const { headers } = request;
  const init = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${headers.get("Authorization")}`,
      Accept: "application/json",
    },
  };
  const response = await fetch(
    "https://api.cloudflare.com/client/v4/user/",
    init
  );
  const body = await gatherResponse(response);
  if (response.status === 401) {
    throw new Error("Unauthorized");
  } else if (response.status !== 200) {
    throw new Error(body);
  }
  return body;
}

/**
 * Handle a request to the login endpoint by sending a login request to the CloudFlare API.
 * @param {*} request Contains the request object from the incoming request.
 * @returns The response to the request.
 */
async function handleRequest(request) {
  try {
    await verify(request);
    return new Response(await userDetails(request), {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "json/application",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    });
  } catch (error) {
    console.log(error);
    switch (error.message) {
      case "Unauthorized":
        return new Response(await JSON.stringify(error.message), {
          status: 401,
          headers: {
            "Content-Type": "json/application",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        });
      default:
        return new Response(await JSON.stringify(error.message), {
          status: 500,
          headers: {
            "Content-Type": "json/application",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        });
    }
  }
}

/**
 * Handles a request to the login endpoint.
 * @param {*} context
 * @returns If the request is a GET, the response to the user and accounts request in a list. Else, an error 400.
 */
export async function onRequest(context) {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    data, // arbitrary space for passing data between middlewares
  } = context;

  // handle options requests
  if (request.method === "OPTIONS") {
    return new Response("", {
      status: 201,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // if post request, handle it
  if (request.method === "GET") {
    return handleRequest(request);
  }

  // return an error if request is not a post
  return new Response("Invalid Request", {
    status: 400,
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  });
}
