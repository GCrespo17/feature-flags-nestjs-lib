import { DynamicModule } from '@nestjs/common';
import { FeatureFlagsConfiguration } from '../interface/feature-flag.interface';
/**
 * Módulo global que registra el servicio de feature flags en NestJS
 * Disponible en toda la app sin necesidad de importarlo varias veces
 */
export declare class FeatureFlagModule {
    /**
     * Método estático para configurar el módulo con opciones iniciales
     * @param config - Objeto de configuración con flags iniciales
     * @returns Módulo dinámico para registro en NestJS
     *
     * @example
     * ```ts
     * @Module({
     *   imports: [
     *     FeatureFlagModule.forRoot({
     *       nuevoDashboard: {
     *         enabled: true,
     *         environment: ['prod'],
     *         users: ['admin']
     *       }
     *     })
     *   ]
     * })
     * export class AppModule {}
     * ```
     */
    static forRoot(config?: FeatureFlagsConfiguration): DynamicModule;
}
