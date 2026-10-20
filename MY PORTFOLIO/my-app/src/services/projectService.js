
import { apiRequest } from "./apiClient";

const PUBLIC_PROJECTS_URL = "/api/projects";
const ADMIN_PROJECTS_URL = "/api/admin/projects";
const ADMIN_IMAGE_UPLOAD_URL = "/api/admin/projects/images";

export function getPublishedProjects() {
  return apiRequest(PUBLIC_PROJECTS_URL);
}

export function getProjectById(id) {
  return apiRequest(`${PUBLIC_PROJECTS_URL}/${id}`);
}

export function getAllProjects() {
  return apiRequest(ADMIN_PROJECTS_URL);
}

export function getAdminProjectById(id) {
  return apiRequest(`${ADMIN_PROJECTS_URL}/${id}`);
}

export function createProject(project) {
  return apiRequest(ADMIN_PROJECTS_URL, {
    method: "POST",
    body: project,
  });
}

export function updateProject(id, project) {
  return apiRequest(`${ADMIN_PROJECTS_URL}/${id}`, {
    method: "PUT",
    body: project,
  });
}

export function updatePublishedStatus(id, published) {
  return apiRequest(
    `${ADMIN_PROJECTS_URL}/${id}/publish?published=${published}`,
    { method: "PATCH" }
  );
}

export function deleteProject(id) {
  return apiRequest(`${ADMIN_PROJECTS_URL}/${id}`, {
    method: "DELETE",
  });
}

// Upload an image selected from File Explorer.
export function uploadProjectImage(file) {
  const body = new FormData();
  body.append("file", file);

  return apiRequest(ADMIN_IMAGE_UPLOAD_URL, {
    method: "POST",
    body,
  });
}
