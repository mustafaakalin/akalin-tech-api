import { IsString, IsNotEmpty, Matches, IsArray } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @Matches(/^(regularuser)$/, { each: true, message: 'Role must be "regularuser"' })
  roles: string;
}