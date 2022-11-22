const constants = {
  statusCodes: {
    OK: 200,
    CREATED: 201,
    DELETED: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },

  messages: {
    BAD_REQUEST: 'Bad request',
    NOT_FOUND: 'not found',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
  },
};

module.exports = constants;
