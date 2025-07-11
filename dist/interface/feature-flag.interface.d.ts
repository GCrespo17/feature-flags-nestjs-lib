export interface FeatureFlagConfig {
    environment?: string[];
    users?: string[];
    enabled?: boolean;
    description?: string;
}
export interface FeatureFlagsConfiguration {
    [flagName: string]: FeatureFlagConfig;
}
export interface FeatureFlagContext {
    environment?: string;
    user?: string;
}
