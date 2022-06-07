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

/**
 * Handle a request to the outputs endpoint by sending a get outputs request to the CloudFlare API.
 * @param {*} request Contains the request object from the incoming request.
 * @returns The response to the request.
 */
async function handleRequest(request, params) {
  const { headers } = request;
  try {
    // get accounts
    const init = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${headers.get("Authorization")}`,
      },
    };
    console.log(init);
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${headers.get(
        "account-id"
      )}/stream/live_inputs/${params.id}/outputs/${params.output_id}`,
      init
    );
    const body = await gatherResponse(response);
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status !== 200) {
      throw new Error(body);
    }
    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.log(error);
    switch (error.message) {
      case "Unauthorized":
        return new Response(await JSON.stringify(error.message), {
          status: 401,
          headers: {
            "Content-Type": "json/application",
          },
        });
      default:
        return new Response(await error.message, {
          status: 500,
          headers: {
            "Content-Type": "json/application",
          },
        });
    }
  }
}

/**
 * Handles a request to the outputs endpoint.
 * @param {*} context
 * @returns If the request is a GET, the response to the request. Else, an error 400.
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

  // if delete request, handle it
  if (request.method === "DELETE") {
    return handleRequest(request, params);
  }

  // return an error if request is not a post
  return new Response("Invalid Request", {
    status: 400,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
