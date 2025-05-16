"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Declare variables to hold configuration values
let client_id = "";
let redirect_url = "";
let issuer_url = "";
let secret = "";
// Add event listener to the logout button to redirect to the index page
const button = document.getElementById('logout');
button.addEventListener('click', () => {
    window.location.href = "index.html";
});
// Add event listener to load configuration file when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadConfigFile();
});
// Function to load the configuration file
function loadConfigFile() {
    fetch('./dist/config.json') // Fetch the config.json file
        .then(response => response.json()) // Parse the response as JSON
        .then((config) => {
        // Assign configuration values to variables
        client_id = config.client_id || "";
        issuer_url = config.issuer_url || "";
        secret = config.client_secret || "";
        redirect_url = config.redirect_uri || "";
        // Call the getCode function to handle the authorization code
        getCode();
    })
        .catch(error => console.error("Failed to load config.json:", error));
}
function getCode() {
    return __awaiter(this, void 0, void 0, function* () {
        const code = new URLSearchParams(window.location.search).get("code");
        if (!code) {
            console.error("No authorization code found");
            return;
        }
        alert(code);
        // Prepare the request body for the token request
        const body = new URLSearchParams({
            grant_type: "authorization_code",
            //client_id: client_id,
            redirect_uri: redirect_url,
            code: code,
        });
        try {
            // Check if required configuration values are missing
            if (!client_id || !secret || !issuer_url || !redirect_url) {
                console.error("Missing required configuration values");
                return;
            }
            // Encode client_id and secret for Basic Authentication
            const basicAuth = btoa(`${client_id}:${secret}`);
            // Make a POST request to the token endpoint
            const response = yield fetch(`${issuer_url}/oauth2/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Basic ${basicAuth}`
                },
                body: body.toString()
            });
            // Check if the response is not OK
            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}: ${yield response.text()}`);
            }
            // Parse the token data from the response
            const tokenData = yield response.json();
            console.log("Token Data:", tokenData); // Log the token data for debugging
        }
        catch (error) {
            console.error("Request failed:", error); // Handle errors during the request
        }
    });
}
