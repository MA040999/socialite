import axios from "axios";

// the baseURL should to point to localhost in development
// and your domain in production
const app = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `http://localhost:4000/`
      : "http://localhost:4000/",
  withCredentials: true,
});

export default app;
