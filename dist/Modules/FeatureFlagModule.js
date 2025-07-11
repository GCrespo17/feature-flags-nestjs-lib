"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FeatureFlagModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagModule = void 0;
const common_1 = require("@nestjs/common");
const feature_flag_service_1 = require("../services/feature-flag.service");
/**
 * Módulo global que registra el servicio de feature flags en NestJS
 * Disponible en toda la app sin necesidad de importarlo varias veces
 */
let FeatureFlagModule = FeatureFlagModule_1 = class FeatureFlagModule {
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
    static forRoot(config) {
        const service = new feature_flag_service_1.FeatureFlagService();
        if (config) {
            service.loadConfiguration(config);
        }
        return {
            module: FeatureFlagModule_1,
            providers: [
                {
                    provide: feature_flag_service_1.FeatureFlagService,
                    useValue: service
                }
            ],
            exports: [feature_flag_service_1.FeatureFlagService],
            global: true
        };
    }
};
exports.FeatureFlagModule = FeatureFlagModule;
exports.FeatureFlagModule = FeatureFlagModule = FeatureFlagModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], FeatureFlagModule);
//# sourceMappingURL=FeatureFlagModule.js.map