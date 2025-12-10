// src/api/private-api.js

const API_BASE = import.meta.env.VITE_API_BASE || window.location.origin;

// Helper for authenticated requests
async function authRequest(path, method = "GET", body = null) {
  const token = localStorage.getItem("adminToken"); // Retrieve token

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = token;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, options);

  if (!res.ok) {
    const message = await res.text();
    // Auto-logout on 401
    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
    }
    throw new Error(message || `Request failed: ${res.status}`);
  }

  return res.json();
}

/* --- AUTH --- */
export function login(credentials) {
  // This is a public endpoint but part of the admin flow
  return fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  }).then(async (res) => {
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  });
}

/* --- GENERIC CRUD HELPERS --- */
// We can make generic functions to save writing 50+ exports
export const api = {
  // DEVELOPER
  developer: {
    skills: {
      create: (data) => authRequest("/api/developer/skills", "POST", data),
      update: (id, data) => authRequest(`/api/developer/skills/${id}`, "PUT", data),
      delete: (id) => authRequest(`/api/developer/skills/${id}`, "DELETE"),
    },
    projects: {
      create: (data) => authRequest("/api/developer/projects", "POST", data),
      update: (id, data) => authRequest(`/api/developer/projects/${id}`, "PUT", data),
      delete: (id) => authRequest(`/api/developer/projects/${id}`, "DELETE"),
    },
    services: {
      create: (data) => authRequest("/api/developer/services", "POST", data),
      update: (id, data) => authRequest(`/api/developer/services/${id}`, "PUT", data),
      delete: (id) => authRequest(`/api/developer/services/${id}`, "DELETE"),
    },
  },
  
  // DESIGNER
  designer: {
    gallery: {
      create: (data) => authRequest("/api/designer/gallery", "POST", data),
      update: (id, data) => authRequest(`/api/designer/gallery/${id}`, "PUT", data),
      delete: (id) => authRequest(`/api/designer/gallery/${id}`, "DELETE"),
    },
    tools: {
      create: (data) => authRequest("/api/designer/tools", "POST", data),
      update: (id, data) => authRequest(`/api/designer/tools/${id}`, "PUT", data),
      delete: (id) => authRequest(`/api/designer/tools/${id}`, "DELETE"),
    },
    services: {
      create: (data) => authRequest("/api/designer/services", "POST", data),
      update: (id, data) => authRequest(`/api/designer/services/${id}`, "PUT", data),
      delete: (id) => authRequest(`/api/designer/services/${id}`, "DELETE"),
    },
  },

  // CREATOR
  creator: {
    sketches: {
      create: (data) => authRequest("/api/creator/sketches", "POST", data),
      update: (id, data) => authRequest(`/api/creator/sketches/${id}`, "PUT", data),
      delete: (id) => authRequest(`/api/creator/sketches/${id}`, "DELETE"),
    },
    books: {
      create: (data) => authRequest("/api/creator/books", "POST", data),
      update: (id, data) => authRequest(`/api/creator/books/${id}`, "PUT", data),
      delete: (id) => authRequest(`/api/creator/books/${id}`, "DELETE"),
    },
    thoughts: {
      create: (data) => authRequest("/api/creator/thoughts", "POST", data),
      update: (id, data) => authRequest(`/api/creator/thoughts/${id}`, "PUT", data),
      delete: (id) => authRequest(`/api/creator/thoughts/${id}`, "DELETE"),
    },
  },

  // BLOGGER
  blogger: {
    snippets: {
      create: (data) => authRequest("/api/blogger/snippets", "POST", data),
      update: (id, data) => authRequest(`/api/blogger/snippets/${id}`, "PUT", data),
      delete: (id) => authRequest(`/api/blogger/snippets/${id}`, "DELETE"),
    },
    roadmaps: {
      create: (data) => authRequest("/api/blogger/roadmaps", "POST", data),
      update: (id, data) => authRequest(`/api/blogger/roadmaps/${id}`, "PUT", data),
      delete: (id) => authRequest(`/api/blogger/roadmaps/${id}`, "DELETE"),
    },
    articles: {
      create: (data) => authRequest("/api/blogger/articles", "POST", data),
      update: (id, data) => authRequest(`/api/blogger/articles/${id}`, "PUT", data),
      delete: (id) => authRequest(`/api/blogger/articles/${id}`, "DELETE"),
    },
  },

  // PROFILE (Singleton - Update Only)
  profile: {
    update: (data) => authRequest("/api/profile", "PATCH", data),
  }
};