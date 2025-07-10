
import {FeatureFlagsConfiguration, FeatureFlagContext, FeatureFlagConfig} from '../interface/feature-flag.interface';



export class FeatureFlagService{
    private configuration: FeatureFlagsConfiguration={};

    //Carga la feature flag desde un objeto
    loadConfiguration(config: FeatureFlagsConfiguration): void{
        this.configuration = {... config};
    }

    //Verifica si la feature esta encendida para este usuario
    isFeatureEnabled(flagName: string, context: FeatureFlagContext = {}): boolean{
        //Verificar si existe la feasture flag
        const flagConfig =  this.configuration[flagName];
        if(!flagConfig){
            return false;
        }

        //Verifica si esta deshabilitada
        if(flagConfig.enabled === false){
            return false;
        }

        //Verificar si esta en el ambiente correcto
        if (flagConfig.environment && flagConfig.environment.length > 0){
            if(!context.environment || !flagConfig.environment.includes(context.environment)){
                return false;
            }
        }

        //Verificar restriccion de usuario
        if(flagConfig.users && flagConfig.users.length > 0){
            if(!context.user || !flagConfig.users.includes(context.user)){
                return false;
            }
        }

        return true;

    }

    getConfiguration(): FeatureFlagsConfiguration{
        return {...this.configuration};
    }

    getFlagConfig(flagName: string){
        return this.configuration[flagName];
    }

    getAllFlagNames():string[]{
        return Object.keys(this.configuration);
    }

    updateFlag(flagName: string, config: FeatureFlagConfig): void{
        this.configuration[flagName] = {...config};
    }

    removeFlag(flagName: string): boolean{
        if (this.configuration[flagName]){
            delete this.configuration[flagName];
            return true;
        }
        return false;
    }

    flagExists(flagName: string):boolean{
        return flagName in this.configuration;
    }

}