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

// Interfaces
export * from './interface/feature-flag.interface';

// Services
export * from './services/feature-flag.service';

// Decorators
export * from './Decorators/featureFlagDecorator';

// Modules
export * from './Modules/FeatureFlagModule';