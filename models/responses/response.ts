'use strict';

export class BaseResponses {
    static getSuccessResponse(data: any): { success: boolean, data: any } {
      return {
        success: true,
        data: data,
      }
    }

  static getErrorResponse(error: any): { success: boolean, data: any } {
      return {
        success: false,
        data: error,
      }
  }
}
