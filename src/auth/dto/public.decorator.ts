import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic'; // Key for the metadata after change
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);