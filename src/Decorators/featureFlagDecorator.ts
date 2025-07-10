import 'reflect-metadata';
import { FeatureFlagService } from '../services/feature-flag.service';

// Instancia del servicio de feature flags
const flagService = new FeatureFlagService();
export const FEATURE_FLAG_METADATA_KEY = 'feature-flag';

/**
 * Carga la configuración de feature flags
 * Este método debe ser llamado antes de usar los decoradores
 * @param config - configuración de las feature flags
 */
export function loadFeatureFlagConfiguration(config: any): void {
  flagService.loadConfiguration(config);
}

/**
 * Decorador que valida feature flags antes de ejecutar un método
 */
export function FeatureFlag(flagName: string): any {
  return function (target: any, propertyKey: string, descriptor: any): any {
    
    // Guardar metadata
    Reflect.defineMetadata(
      FEATURE_FLAG_METADATA_KEY,
      flagName,
      target,
      propertyKey
    );

    // Si no hay descriptor o no es función, salir
    if (!descriptor || !descriptor.value) {
      return descriptor;
    }

    // Guardar el método original
    const originalMethod = descriptor.value;

    // Reemplazar con validación
    descriptor.value = function (...args: any[]) {
      // Contexto que puedes personalizar
      const context = {
        user: 'admin',        // ← Cambiar por contexto real
        environment: 'prod'   // ← Cambiar por ambiente real
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
export function getFeatureFlagName(target: any, propertyKey: string | symbol): string | undefined {
  return Reflect.getMetadata(FEATURE_FLAG_METADATA_KEY, target, propertyKey);
}

/**
 * Obtiene el servicio de feature flags (para uso avanzado)
 */
export function getFeatureFlagService(): FeatureFlagService {
  return flagService;
}