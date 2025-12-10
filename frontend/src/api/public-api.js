// src/api/public-api.js

const API_BASE = import.meta.env.VITE_API_BASE || window.location.origin;

// small helper
async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed: ${res.status}`);
  }

  return res.json();
}

/* ===========================
   DEVELOPER PUBLIC ENDPOINTS
   base: /api/developer
   =========================== */

// Skills
export function getDeveloperSkills() {
  return request("/api/developer/skills");
}

export function getDeveloperSkillById(id) {
  return request(`/api/developer/skills/${id}`);
}

// Projects
export function getDeveloperProjects() {
  return request("/api/developer/projects");
}

export function getDeveloperProjectById(id) {
  return request(`/api/developer/projects/${id}`);
}

// Services
export function getDeveloperServices() {
  return request("/api/developer/services");
}

export function getDeveloperServiceById(id) {
  return request(`/api/developer/services/${id}`);
}

/* ===========================
   DESIGNER PUBLIC ENDPOINTS
   base: /api/designer
   =========================== */

export function getDesignerGallery() {
  return request("/api/designer/gallery");
}

export function getDesignerGalleryItemById(id) {
  return request(`/api/designer/gallery/${id}`);
}

export function getDesignerTools() {
  return request("/api/designer/tools");
}

export function getDesignerToolById(id) {
  return request(`/api/designer/tools/${id}`);
}

export function getDesignerServices() {
  return request("/api/designer/services");
}

export function getDesignerServiceById(id) {
  return request(`/api/designer/services/${id}`);
}

/* ===========================
   CREATOR PUBLIC ENDPOINTS
   base: /api/creator
   =========================== */

export function getCreatorSketches() {
  return request("/api/creator/sketches");
}

export function getCreatorSketchById(id) {
  return request(`/api/creator/sketches/${id}`);
}

export function getCreatorBooks() {
  return request("/api/creator/books");
}

export function getCreatorBookById(id) {
  return request(`/api/creator/books/${id}`);
}

export function getCreatorThoughts() {
  return request("/api/creator/thoughts");
}

export function getCreatorThoughtById(id) {
  return request(`/api/creator/thoughts/${id}`);
}

/* ===========================
   BLOGGER PUBLIC ENDPOINTS
   base: /api/blogger
   =========================== */

export function getBloggerSnippets() {
  return request("/api/blogger/snippets");
}

export function getBloggerSnippetById(id) {
  return request(`/api/blogger/snippets/${id}`);
}

export function getBloggerRoadmaps() {
  return request("/api/blogger/roadmaps");
}

export function getBloggerRoadmapById(id) {
  return request(`/api/blogger/roadmaps/${id}`);
}

export function getBloggerArticles() {
  return request("/api/blogger/articles");
}

export function getBloggerArticleById(id) {
  return request(`/api/blogger/articles/${id}`);
}

/* ===========================
   PROFILE ENDPOINTS
   base: /api/profile
   =========================== */

export function getProfile() {
  return request("/api/profile");
}