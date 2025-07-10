import 'reflect-metadata';
import { 
  FeatureFlag, 
  FEATURE_FLAG_METADATA_KEY, 
  getFeatureFlagName,
  loadFeatureFlagConfiguration
} from './featureFlagDecorator';

describe('FeatureFlag Decorator', () => {
  
  // ========================================
  // SETUP: Cargar configuración antes de las pruebas
  // ========================================
  beforeAll(() => {
    // Configurar las feature flags para los tests
    loadFeatureFlagConfiguration({
      testFeature: {
        enabled: true
      },
      mathFlag: {
        enabled: true
      },
      inputFlag: {
        enabled: true
      },
      greetingFlag: {
        enabled: true
      },
      baseFlag: {
        enabled: true
      },
      childFlag: {
        enabled: true
      },
      flagA: {
        enabled: true
      },
      flagB: {
        enabled: true
      },
      nuevoDashboard: {
        enabled: true,
        environment: ['prod'],
        users: ['admin', 'dev']
      },
      featureDeshabilitada: {
        enabled: false
      },
      featureInexistente: {
        enabled: false
      }
    });
  });

  describe('@FeatureFlag metadata behavior', () => {
    it('should attach metadata to a decorated method', () => {
      class TestController {
        @FeatureFlag('testFeature')
        testMethod() {
          return 'OK';
        }
      }

      const metadata = Reflect.getMetadata(
        FEATURE_FLAG_METADATA_KEY,
        TestController.prototype,
        'testMethod'
      );

      expect(metadata).toBe('testFeature');
    });

    it('should store distinct metadata for multiple methods', () => {
      class MultiFeature {
        @FeatureFlag('flagA')
        a() {
          return 'A';
        }

        @FeatureFlag('flagB')
        b() {
          return 'B';
        }

        c() {
          return 'C';
        }
      }

      expect(getFeatureFlagName(MultiFeature.prototype, 'a')).toBe('flagA');
      expect(getFeatureFlagName(MultiFeature.prototype, 'b')).toBe('flagB');
      expect(getFeatureFlagName(MultiFeature.prototype, 'c')).toBeUndefined();
    });

    it('should not affect original method execution when flag is enabled', () => {
      class Controller {
        @FeatureFlag('mathFlag')
        compute(): number {
          return 3 * 7;
        }
      }

      const instance = new Controller();
      expect(instance.compute()).toBe(21);
    });

    it('should preserve method behavior with parameters', () => {
      class Controller {
        @FeatureFlag('inputFlag')
        echo(msg: string): string {
          return `Echo: ${msg}`;
        }
      }

      const ctrl = new Controller();
      expect(ctrl.echo('hola')).toBe('Echo: hola');
    });
  });

  describe('getFeatureFlagName()', () => {
    it('should return the flag for decorated methods', () => {
      class WithFlag {
        @FeatureFlag('greetingFlag')
        greet() {
          return 'Hi';
        }
      }

      const flag = getFeatureFlagName(WithFlag.prototype, 'greet');
      expect(flag).toBe('greetingFlag');
    });

    it('should return undefined for undecorated methods', () => {
      class NoFlag {
        speak() {
          return 'Hello';
        }
      }

      expect(getFeatureFlagName(NoFlag.prototype, 'speak')).toBeUndefined();
    });

    it('should isolate flags across inheritance', () => {
      class Base {
        @FeatureFlag('baseFlag')
        baseAction() {
          return 'base';
        }
      }

      class Child extends Base {
        @FeatureFlag('childFlag')
        childAction() {
          return 'child';
        }
      }

      expect(getFeatureFlagName(Base.prototype, 'baseAction')).toBe('baseFlag');
      expect(getFeatureFlagName(Child.prototype, 'childAction')).toBe('childFlag');
    });
  });

  describe('FeatureFlagService integration', () => {
    it('should execute method if flag is enabled', () => {
      class Controller {
        @FeatureFlag('nuevoDashboard')
        render() {
          return 'Dashboard visible';
        }
      }

      const instance = new Controller();
      expect(instance.render()).toBe('Dashboard visible');
    });

    it('should throw error for disabled feature', () => {
      class Controller {
        @FeatureFlag('featureDeshabilitada')
        render() {
          return 'Nunca se ejecuta';
        }
      }

      const instance = new Controller();
      expect(() => instance.render()).toThrow(
        /La feature "featureDeshabilitada" está desactivada/
      );
    });

    it('should throw error for non-existent feature', () => {
      class Controller {
        @FeatureFlag('noExisteEnLaConfig')
        render() {
          return 'Nunca se ejecuta';
        }
      }

      const instance = new Controller();
      expect(() => instance.render()).toThrow(
        /La feature "noExisteEnLaConfig" está desactivada/
      );
    });
  });
});