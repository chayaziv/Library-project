// API Configuration
export const API_CONFIG = {
  // Update this URL to match your friend's server
  BASE_URL: "http://localhost:5130/api",

  // Timeout for API requests (in milliseconds)
  TIMEOUT: 10000,

  // Headers that will be sent with every request
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },
};

// You can also add environment-specific configurations
export const getApiUrl = () => {
  // In production, you might want to use environment variables
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || API_CONFIG.BASE_URL;
  }
  return API_CONFIG.BASE_URL;
};
