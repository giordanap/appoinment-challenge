export interface EventPublisher {
  publish(message: any, countryISO: string): Promise<void>;
}
