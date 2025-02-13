import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'akalin-tech-api-postgres', // This should match your service name in docker-compose.yml
  port: 5432,
  username: 'postgres', // Use your Docker PostgreSQL credentials
  password: 'postgres', // Use your Docker PostgreSQL credentials
  database: 'mydatabase',
  entities: [User], // Explicitly include User entity
  synchronize: true, // Be careful with this in production
  logging: true, // Add this to see SQL queries
};