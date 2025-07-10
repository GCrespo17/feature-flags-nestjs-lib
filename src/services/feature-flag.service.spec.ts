import {FeatureFlagService} from './feature-flag.service'
import {FeatureFlagsConfiguration, FeatureFlagContext} from '../interface/feature-flag.interface'

describe('FeatureFlagService', ()=>{
    let service: FeatureFlagService;

    //Antes de cada prueba creamos un servicio nuevo
    beforeEach(()=>{
        service = new FeatureFlagService();
    });

    it('Deberia existir el servicio', ()=>{
        expect(service).toBeDefined();
    });

    //Pruebas para cargar la configuracion
    it('Deberia cargar la configuracion correctamente', ()=>{
        const config: FeatureFlagsConfiguration = {
            'ejemplo-feature':{
                environment: ['dev'],
                users: ['admin']
            }
        };

        service.loadConfiguration(config);

        expect(service.getFlagConfig('ejemplo-feature')).toEqual(config['ejemplo-feature']);
    });

    //Pruebas principales
    describe('isFeatureEnabled', ()=>{
        beforeEach(()=>{
            const config: FeatureFlagsConfiguration = {
                'feature-habilitada': {
                    enabled: true
                },
                'feature-deshabilitada':{
                    enabled: false
                },
                'feature-solo-dev':{
                    environment: ['dev']
                },
                'feature-solo-admin':{
                    users: ['admin']
                }
            }

            service.loadConfiguration(config);
        });

        it('Deberia devolver falso para feature inexistente', ()=>{
            expect(service.isFeatureEnabled('no-existe')).toBe(false);
        });

        it('Deberia devolver verdadero para feature habilitada', ()=>{
            expect(service.isFeatureEnabled('feature-habilitada')).toBe(true);
        });

        it('Deberia devolver falso si la feature esta deshabilitada', ()=>{
            expect(service.isFeatureEnabled('feature-deshabilitada')).toBe(false);
        });

        it('Deberia respetar las restricciones de ambiente', ()=>{
            const contextoDev: FeatureFlagContext = {
                environment: 'dev'
            };
            const contextoProd: FeatureFlagContext = {
                environment: 'prod'
            };
            expect(service.isFeatureEnabled('feature-solo-dev', contextoDev)).toBe(true);
            expect(service.isFeatureEnabled('feature-solo-dev', contextoProd)).toBe(false);
        });

        it('Deberia respetar las restricciones de usuario', ()=>{
            const contextoAdmin: FeatureFlagContext = {
                user: 'admin'
            };
            const contextoUser: FeatureFlagContext = {
                user: 'user'
            };

            expect(service.isFeatureEnabled('feature-solo-admin', contextoAdmin)).toBe(true);
            expect(service.isFeatureEnabled('feature-solo-admin', contextoUser)).toBe(false);
        });
    });

    //Pruebas de metodos auxiliares
    describe('métodos auxiliares', () => {
        beforeEach(() => {
            const config: FeatureFlagsConfiguration = {
                'feature1': { enabled: true },
                'feature2': { enabled: false }
            };

            service.loadConfiguration(config);
        });

        it('debería devolver todos los nombres', () => {
            const nombres = service.getAllFlagNames();
            expect(nombres).toContain('feature1');
            expect(nombres).toContain('feature2');
            expect(nombres).toHaveLength(2);
        });

        it('debería verificar si existe una feature', () => {
            expect(service.flagExists('feature1')).toBe(true);
            expect(service.flagExists('no-existe')).toBe(false);
        });

        it('debería actualizar una feature', () => {
            service.updateFlag('feature1', { enabled: false });
            expect(service.getFlagConfig('feature1')?.enabled).toBe(false);
        });

        it('debería eliminar una feature', () => {
            expect(service.removeFlag('feature1')).toBe(true);
            expect(service.flagExists('feature1')).toBe(false);
        });
    });

});