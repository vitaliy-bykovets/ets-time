'use strict';
const AuthMiddleware = (ctx, next) => {
  ctx._vars = { user_id: 1 };
  next();
};
module.exports = AuthMiddleware;
