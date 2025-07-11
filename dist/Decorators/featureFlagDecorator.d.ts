import 'reflect-metadata';
import { FeatureFlagService } from '../services/feature-flag.service';
export declare const FEATURE_FLAG_METADATA_KEY = "feature-flag";
/**
 * Carga la configuración de feature flags
 * Este método debe ser llamado antes de usar los decoradores
 * @param config - configuración de las feature flags
 */
export declare function loadFeatureFlagConfiguration(config: any): void;
/**
 * Decorador que valida feature flags antes de ejecutar un método
 */
export declare function FeatureFlag(flagName: string): any;
/**
 * Obtiene el nombre de la feature flag asociada a un método decorado
 */
export declare function getFeatureFlagName(target: any, propertyKey: string | symbol): string | undefined;
/**
 * Obtiene el servicio de feature flags (para uso avanzado)
 */
export declare function getFeatureFlagService(): FeatureFlagService;
