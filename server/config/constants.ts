export const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
export const JWT_EXPIRES_IN = '5m';

export const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

export const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://trgn312:pass@localhost:5432/db';

export const APP_PORT = parseInt(process.env.PORT || '3000', 10);

// Notification events (Socket.io)
export const NOTIFICATION_EVENT = {
  NEW_NOTIFICATION: 'new_notification',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
};

// Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};
