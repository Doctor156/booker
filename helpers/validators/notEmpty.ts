'use strict';

export function notEmpty(field: any, type: string = 'string'): boolean {
    return typeof field === type && !!field;
}
