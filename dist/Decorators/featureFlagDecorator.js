"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_FLAG_METADATA_KEY = void 0;
exports.loadFeatureFlagConfiguration = loadFeatureFlagConfiguration;
exports.FeatureFlag = FeatureFlag;
exports.getFeatureFlagName = getFeatureFlagName;
exports.getFeatureFlagService = getFeatureFlagService;
require("reflect-metadata");
const feature_flag_service_1 = require("../services/feature-flag.service");
// Instancia del servicio de feature flags
const flagService = new feature_flag_service_1.FeatureFlagService();
exports.FEATURE_FLAG_METADATA_KEY = 'feature-flag';
/**
 * Carga la configuración de feature flags
 * Este método debe ser llamado antes de usar los decoradores
 * @param config - configuración de las feature flags
 */
function loadFeatureFlagConfiguration(config) {
    flagService.loadConfiguration(config);
}
/**
 * Decorador que valida feature flags antes de ejecutar un método
 */
function FeatureFlag(flagName) {
    return function (target, propertyKey, descriptor) {
        // Guardar metadata
        Reflect.defineMetadata(exports.FEATURE_FLAG_METADATA_KEY, flagName, target, propertyKey);
        // Si no hay descriptor o no es función, salir
        if (!descriptor || !descriptor.value) {
            return descriptor;
        }
        // Guardar el método original
        const originalMethod = descriptor.value;
        // Reemplazar con validación
        descriptor.value = function (...args) {
            // Contexto que puedes personalizar
            const context = {
                user: 'admin', // ← Cambiar por contexto real
                environment: 'prod' // ← Cambiar por ambiente real
            };
            const isEnabled = flagService.isFeatureEnabled(flagName, context);
            if (!isEnabled) {
                throw new Error(`La feature "${flagName}" está desactivada para este contexto`);
            }
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
/**
 * Obtiene el nombre de la feature flag asociada a un método decorado
 */
function getFeatureFlagName(target, propertyKey) {
    return Reflect.getMetadata(exports.FEATURE_FLAG_METADATA_KEY, target, propertyKey);
}
/**
 * Obtiene el servicio de feature flags (para uso avanzado)
 */
function getFeatureFlagService() {
    return flagService;
}
//# sourceMappingURL=featureFlagDecorator.js.map