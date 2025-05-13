import middy from "@middy/core";
import { AppError } from "../errors";

export const errorHandler = (): middy.MiddlewareObj => {
  return {
    onError: async (handler) => {
      if (handler.error instanceof AppError) {
        handler.response = {
          statusCode: handler.error.statusCode,
          body: JSON.stringify({ error: handler.error.message }),
        };
      } else {
        // Loggear error no controlado
        console.error(handler.error);
        handler.response = {
          statusCode: 500,
          body: JSON.stringify({ error: "Internal Server Error" }),
        };
      }
    },
  };
};
