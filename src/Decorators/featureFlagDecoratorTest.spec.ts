import 'reflect-metadata';
import { FeatureFlag, FEATURE_FLAG_METADATA_KEY, getFeatureFlagName } from './featureFlagDecorator';


describe('FeatureFlag Decorator', () => {
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

    it('should not affect original method execution', () => {
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

  describe('FeatureFlagService integration mock', () => {
    // Simulación directa en el decorador ya que usas instancia única
    it('should throw if feature is disabled in context', () => {
      class Controller {
        @FeatureFlag('nuevoDashboard')
        render() {
          return 'Visible';
        }
      }

      const instance = new Controller();

      // Tu decorador lanza Error si el contexto no habilita la flag
      expect(() => instance.render()).toThrow(
        /La feature "nuevoDashboard" está desactivada/
      );
    });

    it('should execute method if flag is enabled', () => {
      class Controller {
        @FeatureFlag('nuevoDashboard')
        render() {
          return 'Visible';
        }
      }

      // En tu decorador, el flagService está cargado para permitir 'nuevoDashboard' en 'prod' y 'admin'
      const result = new Controller().render();
      expect(result).toBe('Visible');
    });
  });
});
