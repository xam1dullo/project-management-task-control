import { Configuration, Value } from '@itgorillaz/configify';

@Configuration()
export class DatabaseConfig {
  @Value('DATABASE_HOST')
  host: string;

  @Value('DATABASE_PORT')
  port: number;

  @Value('DATABASE_USER')
  user: string;

  @Value('DATABASE_PASSWORD')
  password: string;

  @Value('DATABASE_NAME')
  name: string;
}
