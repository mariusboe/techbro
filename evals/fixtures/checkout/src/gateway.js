async function rawRequest(url, options) {
  return fetch(url, options);
}

async function requestWithJson(url, options) {
  const response = await rawRequest(url, options);
  return response;
}

async function gatewayRequest(url, options) {
  const response = await requestWithJson(url, options);
  if (!response.ok) {
    throw new Error(`Gateway error ${response.status}`);
  }
  return response.json();
}

export async function refund(amount) {
  if (amount < 0) {
    throw new RangeError("amount must be >= 0");
  }
  if (amount === 0) {
    return { status: "noop" };
  }
  return gatewayRequest("https://gateway.example/refund", {
    method: "POST",
    body: JSON.stringify({ amount }),
  });
}
