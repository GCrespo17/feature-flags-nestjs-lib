"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagService = void 0;
class FeatureFlagService {
    constructor() {
        this.configuration = {};
    }
    //Carga la feature flag desde un objeto
    loadConfiguration(config) {
        this.configuration = { ...config };
    }
    //Verifica si la feature esta encendida para este usuario
    isFeatureEnabled(flagName, context = {}) {
        //Verificar si existe la feasture flag
        const flagConfig = this.configuration[flagName];
        if (!flagConfig) {
            return false;
        }
        //Verifica si esta deshabilitada
        if (flagConfig.enabled === false) {
            return false;
        }
        //Verificar si esta en el ambiente correcto
        if (flagConfig.environment && flagConfig.environment.length > 0) {
            if (!context.environment || !flagConfig.environment.includes(context.environment)) {
                return false;
            }
        }
        //Verificar restriccion de usuario
        if (flagConfig.users && flagConfig.users.length > 0) {
            if (!context.user || !flagConfig.users.includes(context.user)) {
                return false;
            }
        }
        return true;
    }
    getConfiguration() {
        return { ...this.configuration };
    }
    getFlagConfig(flagName) {
        return this.configuration[flagName];
    }
    getAllFlagNames() {
        return Object.keys(this.configuration);
    }
    updateFlag(flagName, config) {
        this.configuration[flagName] = { ...config };
    }
    removeFlag(flagName) {
        if (this.configuration[flagName]) {
            delete this.configuration[flagName];
            return true;
        }
        return false;
    }
    flagExists(flagName) {
        return flagName in this.configuration;
    }
}
exports.FeatureFlagService = FeatureFlagService;
//# sourceMappingURL=feature-flag.service.js.map