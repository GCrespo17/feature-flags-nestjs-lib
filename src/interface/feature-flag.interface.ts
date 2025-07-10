//Configuracion de una feature flag individual

export interface FeatureFlagConfig{
    //Ambientes donde esta activa: ['dev', 'test', 'prod']
    environment?: string[];

    //Usuarios que pueden usarla: ['admin', 'tester']
    users?: string[];

    //Define si esta encendida o apagada
    enabled?: boolean;

    //Describe para que sirve la feature flag
    description?: string;
}

//Configuracion completa de todas las feature flags
export interface FeatureFlagsConfiguration{
    [flagName: string]: FeatureFlagConfig;
}

//Informacion del usuario/request actual
export interface FeatureFlagContext{
    //Ambiente actual: 'dev', 'test', 'prod'
    environment?: string;

    //Usuario actual: 'admin', 'user', etc
    user?: string;
}