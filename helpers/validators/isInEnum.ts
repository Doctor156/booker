'use strict';

export function isInEnum(field: any, enumType: object): boolean {
    return Object.values(enumType).includes(field);
}