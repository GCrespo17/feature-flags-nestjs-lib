# Feature Flags NestJS

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/GCrespo17/feature-flags-nestjs-lib)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-Compatible-red.svg)](https://nestjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

Una librería moderna y fácil de usar para implementar **feature flags** en aplicaciones NestJS. Permite controlar la activación de funcionalidades basándose en ambiente, usuarios específicos o configuraciones personalizadas.

**Proyecto desarrollado para Tópicos Especiales de Programación**
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-Compatible-red.svg)](https://nestjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

Una librería moderna y fácil de usar para implementar **feature flags** en aplicaciones NestJS. Permite controlar la activación de funcionalidades basándose en ambiente, usuarios específicos o configuraciones personalizadas.

## 🚀 Características

- ✅ **Integración nativa con NestJS** - Decoradores y servicios listos para usar
- ✅ **TypeScript completo** - Tipado fuerte y autocompletado
- ✅ **Configuración flexible** - Por ambiente, usuario o criterios personalizados
- ✅ **Sin dependencias externas** - Solo requiere NestJS
- ✅ **Fácil de testear** - Servicio injectable y mockeable
- ✅ **Decorador para controladores** - Protege endpoints automáticamente
- ✅ **API intuitiva** - Métodos claros y bien documentados

## 📦 Instalación

### 🚀 Instalación desde GitHub

Como esta librería está hospedada en GitHub, puedes instalarla directamente:

```bash
npm install https://github.com/GCrespo17/feature-flags-nestjs-lib.git
```

```bash
yarn add https://github.com/GCrespo17/feature-flags-nestjs-lib.git
```

```bash
pnpm add https://github.com/GCrespo17/feature-flags-nestjs-lib.git
```

### 📌 Instalación para desarrollo local

Si quieres clonar y contribuir al desarrollo:

```bash
# Clonar el repositorio
git clone https://github.com/GCrespo17/feature-flags-nestjs-lib.git

# Entrar al directorio
cd feature-flags-nestjs-lib

# Instalar dependencias
npm install

# Compilar la librería
npm run build

# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

### 🔗 Instalación usando npm link (desarrollo local)

Para desarrollo y testing local:

```bash
# En el directorio de la librería
npm link

# En tu proyecto NestJS
npm link feature-flags-nestjs
```

## 🛠️ Configuración inicial

### 1. Importa el módulo en tu AppModule

```typescript
import { Module } from '@nestjs/common';
import { FeatureFlagModule } from 'feature-flags-nestjs';

@Module({
  imports: [
    FeatureFlagModule.forRoot({
      // Configuración inicial de feature flags
      nuevoDashboard: {
        enabled: true,
        environment: ['dev', 'test'],
        description: 'Nuevo dashboard con métricas avanzadas'
      },
      pagoConTarjeta: {
        enabled: false,
        users: ['admin', 'tester'],
        description: 'Sistema de pagos con tarjeta de crédito'
      },
      modoOscuro: {
        enabled: true,
        description: 'Tema oscuro para la aplicación'
      }
    })
  ],
  // ... resto de tu configuración
})
export class AppModule {}
```

> **Nota**: Asegúrate de que el nombre del import coincida con el nombre del paquete en tu `package.json`. Si es diferente, ajusta el import según corresponda.

### 2. O configúralo dinámicamente

```typescript
@Module({
  imports: [
    FeatureFlagModule.forRoot(), // Sin configuración inicial
  ]
})
export class AppModule {}
```

## 📖 Uso básico

### En servicios

```typescript
import { Injectable } from '@nestjs/common';
import { FeatureFlagService } from 'feature-flags-nestjs';

@Injectable()
export class UserService {
  constructor(private readonly featureFlagService: FeatureFlagService) {}

  async getUsers() {
    // Verificar si la nueva API está habilitada
    if (this.featureFlagService.isFeatureEnabled('nuevaApiUsuarios')) {
      return this.getUsersFromNewAPI();
    }
    
    return this.getUsersFromOldAPI();
  }

  async processPayment(userId: string) {
    const context = {
      user: 'admin',
      environment: 'prod'
    };

    if (this.featureFlagService.isFeatureEnabled('pagoConTarjeta', context)) {
      return this.processCardPayment(userId);
    }
    
    return this.processTraditionalPayment(userId);
  }
}
```

> **Nota**: El import debe coincidir con el nombre de tu paquete. Si has personalizado el nombre en `package.json`, ajusta el import según corresponda.

### En controladores con decorador

```typescript
import { Controller, Get } from '@nestjs/common';
import { FeatureFlag } from 'feature-flags-nestjs';

@Controller('dashboard')
export class DashboardController {
  
  @Get('new')
  @FeatureFlag('nuevoDashboard') // ⚡ Protege automáticamente el endpoint
  getNewDashboard() {
    return { message: 'Nuevo dashboard con métricas avanzadas' };
  }

  @Get('analytics')
  @FeatureFlag('analytics', { environment: 'prod' }) // Con contexto específico
  getAnalytics() {
    return { analytics: 'datos avanzados' };
  }
}
```

> **Nota**: Verifica que el decorador `@FeatureFlag` esté correctamente exportado desde la librería. Si el nombre del paquete es diferente, ajusta el import.

## 🔧 API completa

### FeatureFlagService

#### `isFeatureEnabled(flagName: string, context?: FeatureFlagContext): boolean`

Verifica si una feature flag está habilitada.

```typescript
// Verificación simple
const isEnabled = this.featureFlagService.isFeatureEnabled('miFeature');

// Con contexto específico
const isEnabled = this.featureFlagService.isFeatureEnabled('miFeature', {
  user: 'admin',
  environment: 'dev'
});
```

#### `loadConfiguration(config: FeatureFlagsConfiguration): void`

Carga una nueva configuración de feature flags.

```typescript
this.featureFlagService.loadConfiguration({
  nuevaFeature: {
    enabled: true,
    environment: ['dev'],
    users: ['tester']
  }
});
```

#### `updateFlag(flagName: string, config: FeatureFlagConfig): void`

Actualiza una feature flag específica.

```typescript
this.featureFlagService.updateFlag('miFeature', {
  enabled: true,
  users: ['admin', 'user']
});
```

#### `removeFlag(flagName: string): boolean`

Elimina una feature flag.

```typescript
const removed = this.featureFlagService.removeFlag('featureObsoleta');
```

#### `flagExists(flagName: string): boolean`

Verifica si existe una feature flag.

```typescript
if (this.featureFlagService.flagExists('miFeature')) {
  // La feature existe
}
```

#### `getAllFlagNames(): string[]`

Obtiene todos los nombres de feature flags.

```typescript
const flags = this.featureFlagService.getAllFlagNames();
console.log(flags); // ['feature1', 'feature2', ...]
```

#### `getFlagConfig(flagName: string): FeatureFlagConfig | undefined`

Obtiene la configuración de una feature flag específica.

```typescript
const config = this.featureFlagService.getFlagConfig('miFeature');
console.log(config); // { enabled: true, users: ['admin'] }
```

### Decorador @FeatureFlag

Protege endpoints automáticamente basándose en feature flags.

```typescript
import { FeatureFlag } from 'feature-flags-nestjs';

@Controller('api')
export class ApiController {
  
  @Get('endpoint')
  @FeatureFlag('miFeature') // Básico
  basicEndpoint() {
    return { message: 'Feature habilitada' };
  }

  @Get('admin')
  @FeatureFlag('adminFeature', { user: 'admin' }) // Con contexto
  adminEndpoint() {
    return { message: 'Solo para admins' };
  }
}
```

## 📝 Interfaces

### FeatureFlagConfig

```typescript
interface FeatureFlagConfig {
  enabled?: boolean;           // Si está habilitada (default: true)
  environment?: string[];      // Ambientes permitidos ['dev', 'prod']
  users?: string[];           // Usuarios específicos ['admin', 'tester']
  description?: string;       // Descripción de la feature
}
```

### FeatureFlagContext

```typescript
interface FeatureFlagContext {
  environment?: string;       // Ambiente actual 'dev' | 'test' | 'prod'
  user?: string;             // Usuario actual 'admin' | 'user' | etc.
}
```

### FeatureFlagsConfiguration

```typescript
interface FeatureFlagsConfiguration {
  [flagName: string]: FeatureFlagConfig;
}
```

## 🧪 Testing

La librería está diseñada para ser fácil de testear:

```typescript
import { Test } from '@nestjs/testing';
import { FeatureFlagService } from 'feature-flags-nestjs';

describe('UserService', () => {
  let service: UserService;
  let featureFlagService: FeatureFlagService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: FeatureFlagService,
          useValue: {
            isFeatureEnabled: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
    featureFlagService = module.get<FeatureFlagService>(FeatureFlagService);
  });

  it('debería usar nueva API cuando feature está habilitada', () => {
    // Mock del servicio
    jest.spyOn(featureFlagService, 'isFeatureEnabled').mockReturnValue(true);
    
    // Tu test aquí
    const result = service.getUsers();
    expect(featureFlagService.isFeatureEnabled).toHaveBeenCalledWith('nuevaApiUsuarios');
  });
});
```

## 🎯 Ejemplos de uso común

### Rollout gradual

```typescript
// Habilitar para ciertos usuarios primero
this.featureFlagService.updateFlag('nuevaFeature', {
  enabled: true,
  users: ['user1', 'user2', 'user3']
});

// Luego expandir a más usuarios
this.featureFlagService.updateFlag('nuevaFeature', {
  enabled: true,
  users: ['user1', 'user2', 'user3', 'user4', 'user5']
});

// Finalmente habilitar para todos
this.featureFlagService.updateFlag('nuevaFeature', {
  enabled: true
});
```

### Diferentes comportamientos por ambiente

```typescript
// En desarrollo: mostrar datos de prueba
// En producción: mostrar datos reales
const showTestData = this.featureFlagService.isFeatureEnabled('testData', {
  environment: process.env.NODE_ENV
});

if (showTestData) {
  return this.getTestData();
} else {
  return this.getProductionData();
}
```

### A/B Testing básico

```typescript
// Determinar qué versión mostrar basándose en el usuario
const showVersionA = this.featureFlagService.isFeatureEnabled('versionA', {
  user: currentUser.id
});

return showVersionA ? this.getVersionA() : this.getVersionB();
```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia ISC. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

Desarrollado para **Tópicos Especiales de Programación**.

---

⭐ Si te gusta este proyecto, ¡no olvides darle una estrella en GitHub!
