//import {configVar, loadConfig} from './configLoader';
const btn = document.getElementById('goToSession') as HTMLButtonElement;

document.addEventListener('DOMContentLoaded', () => {
    loadConfig(); 
});

function loadConfig() {

    fetch('./dist/config.json')
    .then(response => response.json())
    .then((config: Config) => {
        redirectToCognito(config)
    })
    .catch(error => console.error("Failed to load config.json:", error));

}

function redirectToCognito(config: Config) {
    btn.addEventListener('click', () => {
        
        const encodedURL = encodeURIComponent(config.redirect_uri)
        const cognitoUrl = `${config.issuer_url}/login?` +
        `client_id=${config.client_id}` +
        `&redirect_uri=${encodedURL}` +
        `&response_type=${config.response_type}` +
        `&scope=${config.scope}`;

        alert(cognitoUrl)
        console.log("Generated Cognito URL:", cognitoUrl);
        window.location.href = cognitoUrl;
    });
}    


interface Config {
  issuer_url: string;
  client_id: string;
  response_type: string;
  scope: string;
  redirect_uri: string;
  userpool_url: string;
  client_secret: string;
}
