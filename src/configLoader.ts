
export const configVar: any = {}; // Exported empty object

export async function loadConfig() {

    fetch('./config.json')
    .then(response => response.json())
    .then(config => {
        Object.assign(configVar, config); // Correct way to update the exported object
        console.log("Config Loaded:", configVar);
    })
    .catch(error => console.error("Failed to load config.json:", error));

}


