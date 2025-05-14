"use strict";
//import {configVar, loadConfig} from './configLoader';
const btn = document.getElementById('goToSession');
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
});
function loadConfig() {
    fetch('./dist/config.json')
        .then(response => response.json())
        .then((config) => {
        redirectToCognito(config);
    })
        .catch(error => console.error("Failed to load config.json:", error));
}
function redirectToCognito(config) {
    btn.addEventListener('click', () => {
        const encodedURL = encodeURIComponent(config.redirect_uri);
        const cognitoUrl = `${config.issuer_url}/login?` +
            `client_id=${config.client_id}` +
            `&redirect_uri=${encodedURL}` +
            `&response_type=${config.response_type}` +
            `&scope=${config.scope}`;
        alert(cognitoUrl);
        console.log("Generated Cognito URL:", cognitoUrl);
        window.location.href = cognitoUrl;
    });
}
