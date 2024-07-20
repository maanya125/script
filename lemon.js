// Define the functions as provided

function base64Decode(input) {
  return Buffer.from(input, 'base64').toString('utf8');
}

function base64Encode(input) {
  return Buffer.from(input, 'utf8').toString('base64');
}

// Modify the payload
function modifyPayload(payload) {
  // Decode the payload
  let decodedPayload = JSON.parse(base64Decode(payload));

  // Modify some fields
  decodedPayload.profileStatusReason = 1000;  // Modify the profileStatusReason field
  decodedPayload.userProfile.firstName = "John";  // Modify the firstName field
  decodedPayload.userProfile.lastName = "Doe";  // Modify the lastName field

  // Encode the modified payload back to base64
  let modifiedPayload = base64Encode(JSON.stringify(decodedPayload));

  return modifiedPayload;
}

// Main function
function modifyResponse(response) {
  // Parse the JSON response
  let jsonResponse = JSON.parse(response);

  // Decode, modify and encode the payload
  jsonResponse.asnp.payload = modifyPayload(jsonResponse.asnp.payload);

  // Convert the modified JSON back to string
  let modifiedResponse = JSON.stringify(jsonResponse);

  return modifiedResponse;
}

// Example usage

// Original JSON response with a base64-encoded payload

var obj = $response.body
// Modify the response
let modifiedResponse = modifyResponse(obj);
$done({body: JSON.stringify(modifiedResponse)});
