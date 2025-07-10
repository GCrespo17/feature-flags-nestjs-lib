import { Module, Global, DynamicModule } from '@nestjs/common';
import { FeatureFlagService } from '../services/feature-flag.service';
import { FeatureFlagsConfiguration } from '../interface/feature-flag.interface';

/**
 * Módulo global que registra el servicio de feature flags en NestJS
 * Disponible en toda la app sin necesidad de importarlo varias veces
 */
@Global()
@Module({})
export class FeatureFlagModule {
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
  static forRoot(config?: FeatureFlagsConfiguration): DynamicModule {
    const service = new FeatureFlagService();

    if (config) {
      service.loadConfiguration(config);
    }

    return {
      module: FeatureFlagModule,
      providers: [
        {
          provide: FeatureFlagService,
          useValue: service
        }
      ],
      exports: [FeatureFlagService],
      global: true
    };
  }
}
