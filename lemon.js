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

  // Update the specified fields
  decodedPayload.responseType = "INITIAL";
  decodedPayload.profileStatus = "PROFILE_AVAILABLE";
  decodedPayload.profileStatusReason = 1000;
  decodedPayload.profileStatusReasonText = "Profile Available due to an acquired plan provisioned and ACTIVE";
  decodedPayload.appLicenseMode = "PAID";
  decodedPayload.appProfile = {
    "appId": "RocketIOS1",
    "accessibleItems": [
      {
        "status": "ACTIVE",
        "source": {
          "owner_id": "1E55127C60B4F9040A495C79@AdobeID",
          "id": "0B10E44A1414D2DC572A",
          "type": "LICENSE",
          "status_reason": "NORMAL",
          "can_access_until": 1725544243292
        },
        "fulfillable_items": {
          "cc_storage": {
            "enabled": true,
            "feature_sets": {
              "CS_LVL_2": {
                "id": "CS_LVL_2",
                "label": "CS LVL 2",
                "enabled": true
              },
              "VRT_30": {
                "id": "VRT_30",
                "label": "VRT 30",
                "enabled": true
              }
            },
            "charging_model": {
              "cap": 100,
              "unit": "GB",
              "model": "RECURRING",
              "overage": "NA"
            }
          },
          "core_services_cc": {
            "enabled": true,
            "feature_sets": {
              "CS_LVL_2": {
                "id": "CS_LVL_2",
                "label": "CS LVL 2",
                "enabled": true
              }
            },
            "charging_model": {
              "model": "RECURRING",
              "overage": "NA",
              "rollover": 0
            }
          }
        }
      }
    ]
  };

  // Encode the modified payload back to base64
  let modifiedPayload = base64Encode(JSON.stringify(decodedPayload));

  return modifiedPayload;
}

// Main function
function modifyResponse(response) {
  // Parse the JSON response
  let jsonResponse = JSON.parse(response);

  // Decode, modify, and encode the payload
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
