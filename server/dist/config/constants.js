"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ROLES = exports.NOTIFICATION_EVENT = exports.APP_PORT = exports.DATABASE_URL = exports.BCRYPT_SALT_ROUNDS = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = void 0;
exports.JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
exports.JWT_EXPIRES_IN = "5m";
exports.BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
exports.DATABASE_URL = process.env.DATABASE_URL || "postgresql://trgn312:pass@localhost:5432/db";
exports.APP_PORT = parseInt(process.env.PORT || "3000", 10);
exports.NOTIFICATION_EVENT = {
    NEW_NOTIFICATION: "new_notification",
    CONNECTED: "connected",
    DISCONNECTED: "disconnected",
};
exports.USER_ROLES = {
    ADMIN: "admin",
    USER: "user",
};
//# sourceMappingURL=constants.js.map