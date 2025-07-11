import { FeatureFlagsConfiguration, FeatureFlagContext, FeatureFlagConfig } from '../interface/feature-flag.interface';
export declare class FeatureFlagService {
    private configuration;
    loadConfiguration(config: FeatureFlagsConfiguration): void;
    isFeatureEnabled(flagName: string, context?: FeatureFlagContext): boolean;
    getConfiguration(): FeatureFlagsConfiguration;
    getFlagConfig(flagName: string): FeatureFlagConfig;
    getAllFlagNames(): string[];
    updateFlag(flagName: string, config: FeatureFlagConfig): void;
    removeFlag(flagName: string): boolean;
    flagExists(flagName: string): boolean;
}
