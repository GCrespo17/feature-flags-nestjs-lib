/**
 * Feature Flags Library for NestJS
 * Provides decorators and services for managing feature flags
 *
 * @example
 * ```typescript
 * import { FeatureFlagService, FeatureFlag } from 'nestjs-feature-flags';
 *
 * // En el servicio
 * @Injectable()
 * export class MyService {
 *   constructor(private featureFlagService: FeatureFlagService) {}
 * }
 *
 * // En el controlador
 * @FeatureFlag('newFeature')
 * @Get('endpoint')
 * getEndpoint() {
 *   // Tu lógica aquí
 * }
 * ```
 */
export * from './interface/feature-flag.interface';
export * from './services/feature-flag.service';
export * from './Decorators/featureFlagDecorator';
export * from './Modules/FeatureFlagModule';
