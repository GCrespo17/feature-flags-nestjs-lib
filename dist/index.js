"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Interfaces
__exportStar(require("./interface/feature-flag.interface"), exports);
// Services
__exportStar(require("./services/feature-flag.service"), exports);
// Decorators
__exportStar(require("./Decorators/featureFlagDecorator"), exports);
// Modules
__exportStar(require("./Modules/FeatureFlagModule"), exports);
//# sourceMappingURL=index.js.map