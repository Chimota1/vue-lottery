export type ServiceFactory<T> = () => T

/**
 * Registry keys for the services registered on app initialization.
 * Name is the single source of truth for both sides of the lookup.
 */
export const serviceNames = {
  auth: 'auth',
  users: 'users',
} as const

/**
 * Universal lazy service registry (tiny DI container).
 * Stays entity-agnostic: concrete services are registered in the app layer
 * (`src/app/providers/services.ts`), consumers resolve them by name with
 * `ServiceProvider.get<T>(serviceNames.x)`.
 */
export class ServiceProvider {
  private static factories = new Map<string, ServiceFactory<unknown>>()
  private static instances = new Map<string, unknown>()

  static register<T>(name: string, factory: ServiceFactory<T>): void {
    this.factories.set(name, factory as ServiceFactory<unknown>)
  }

  static get<T>(name: string): T {
    let instance = this.instances.get(name)

    if (!instance) {
      const factory = this.factories.get(name)

      if (!factory) {
        throw new Error(`Service "${name}" is not registered. Did initServices() run?`)
      }

      instance = factory()
      this.instances.set(name, instance)
    }

    return instance as T
  }
}
