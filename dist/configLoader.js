var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const configVar = {}; // Exported empty object
export function loadConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        fetch('./config.json')
            .then(response => response.json())
            .then(config => {
            Object.assign(configVar, config); // Correct way to update the exported object
            console.log("Config Loaded:", configVar);
        })
            .catch(error => console.error("Failed to load config.json:", error));
    });
}
