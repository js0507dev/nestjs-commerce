import { SetMetadata } from '@nestjs/common';

/* eslint-disable @typescript-eslint/naming-convention */
export const IS_PUBLIC_KEY = 'isPublic';
/**
 * 로그인 필요하지 않는 API에서 사용할 Decorator
 * 해당 decorator 사용시 로그인체크 하지 않음
 * e.g. @Public()
 * @constructor
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
