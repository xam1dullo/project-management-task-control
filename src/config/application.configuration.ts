import { Configuration, Value } from '@itgorillaz/configify';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

@Configuration()
export class ApplicationConfig {
  @IsNotEmpty()
  @Value('APP_PORT')
  appPort: number;

  @IsNotEmpty()
  @IsString()
  @Value('NODE_ENV')
  nodeEnv: string;
}
