import 'reflect-metadata';
import { FeatureFlagService } from '../services/feature-flag.service'; // ajusta ruta si cambias carpetas

// Este servicio podría venir de inyección externa, pero aquí usamos instancia directa
const flagService = new FeatureFlagService();
export const FEATURE_FLAG_METADATA_KEY = 'feature-flag';

// Puedes cargar flags manualmente o desde un módulo central
flagService.loadConfiguration({
  nuevoDashboard: {
    enabled: true,
    environment: ['prod'],
    users: ['admin', 'dev']
  }
});

// ...existing code...
// ...existing code...
export function FeatureFlag(flagName: string) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void | PropertyDescriptor { // <-- Cambia aquí
    Reflect.defineMetadata(
      FEATURE_FLAG_METADATA_KEY,
      flagName,
      target,
      propertyKey
    );

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const context = {
        user: 'admin',
        environment: 'prod'
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
// ...existing code...
/**
 * Obtiene el nombre de la feature flag asociada a un método decorado
 * @param target - prototipo de clase (ej. Controller.prototype)
 * @param propertyKey - nombre del método
 * @returns nombre de la flag o undefined
 */
export function getFeatureFlagName(
  target: Object,
  propertyKey: string | symbol
): string | undefined {
  return Reflect.getMetadata(FEATURE_FLAG_METADATA_KEY, target, propertyKey);
}


