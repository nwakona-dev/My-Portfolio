import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  UploadCloud,
  X,
  Image as ImageIcon,
} from "lucide-react";

import {
  createProject,
  getAdminProjectById,
  updateProject,
  uploadProjectImage,
} from "../../services/projectService";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const emptyProject = {
  title: "",
  description: "",
  imageUrl: "",
  technologies: "",
  githubUrl: "",
  liveUrl: "",
  published: false,
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

// Convert backend-relative paths into complete image URLs.
// Keep absolute URLs and temporary local previews unchanged.
const getProjectImageUrl = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== "string") {
    return "";
  }

  const trimmedUrl = imageUrl.trim();

  if (!trimmedUrl) {
    return "";
  }

  if (/^(https?:\/\/|blob:|data:)/i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  return `${API_BASE_URL.replace(/\/+$/, "")}/${trimmedUrl.replace(/^\/+/, "")}`;
};

export default function AdminProjectForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(emptyProject);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [removeExistingImage, setRemoveExistingImage] = useState(false);

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [imageLoadError, setImageLoadError] = useState(false);

  // Load the project details when editing.
  useEffect(() => {
    let active = true;

    async function loadProject() {
      if (!isEditing) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const project = await getAdminProjectById(id);

        if (!active) return;

        const savedImageUrl = project.imageUrl ?? "";

        setForm({
          title: project.title ?? "",
          description: project.description ?? "",
          imageUrl: savedImageUrl,
          technologies: project.technologies ?? "",
          githubUrl: project.githubUrl ?? "",
          liveUrl: project.liveUrl ?? "",
          published: Boolean(project.published),
        });

        setImageFile(null);
        setImagePreview(savedImageUrl);
        setRemoveExistingImage(false);
        setImageLoadError(false);
      } catch (err) {
        if (active) {
          setError(err.message || "Could not load this project.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProject();

    return () => {
      active = false;
    };
  }, [id, isEditing]);

  // Revoke temporary preview URLs when they are replaced or discarded.
  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Choose a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("The image must not exceed 5 MB.");
      event.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setImageFile(file);
    setImagePreview(previewUrl);
    setImageLoadError(false);
    setRemoveExistingImage(false);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setImageLoadError(false);
    setRemoveExistingImage(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.title.trim() || !form.description.trim()) {
      setError("Project title and description are required.");
      return;
    }

    setSubmitting(true);

    try {
      // Preserve the saved URL unless the user replaces or removes it.
      let imageUrl = form.imageUrl;

      if (imageFile) {
        const uploadedImage = await uploadProjectImage(imageFile);

        imageUrl =
          typeof uploadedImage === "string"
            ? uploadedImage
            : uploadedImage?.imageUrl;

        if (!imageUrl) {
          throw new Error(
            "The image was uploaded, but the server did not return an image URL."
          );
        }
      } else if (removeExistingImage) {
        imageUrl = "";
      }

      const payload = {
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        imageUrl,
        technologies: form.technologies.trim(),
        githubUrl: form.githubUrl.trim(),
        liveUrl: form.liveUrl.trim(),
      };

      if (isEditing) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }

      navigate("/admin/projects", {
        replace: true,
        state: {
          message: isEditing
            ? "Project updated successfully."
            : "Project created successfully.",
        },
      });
    } catch (err) {
      setError(err.message || "Could not save the project.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-panel admin-empty-state">
        Loading project...
      </div>
    );
  }

  const resolvedImageUrl = getProjectImageUrl(imagePreview);

  return (
    <section>
      <div className="admin-welcome-row">
        <div>
          <p className="admin-eyebrow">PROJECT MANAGEMENT</p>

          <h2>{isEditing ? "Edit project" : "Create a project"}</h2>

          <p className="admin-muted">
            Add the project details you want to display in your portfolio.
          </p>
        </div>

        <Link
          to="/admin/projects"
          className="admin-secondary-button"
        >
          <ArrowLeft size={17} />
          Back to projects
        </Link>
      </div>

      {error && (
        <div
          className="admin-alert admin-alert-error"
          role="alert"
        >
          {error}
        </div>
      )}

      <form
        className="admin-panel admin-project-form"
        onSubmit={handleSubmit}
      >
        {/* Basic information */}
        <div className="admin-form-section">
          <h3>Basic information</h3>

          <p>Give your project a clear title and description.</p>

          <div className="admin-form-field">
            <label htmlFor="title">Project title *</label>

            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              maxLength={150}
              required
              placeholder="e.g. Online Grocery Store"
            />

            <span className="admin-field-hint">
              {form.title.length}/150 characters
            </span>
          </div>

          <div className="admin-form-field">
            <label htmlFor="description">Description *</label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              maxLength={1000}
              rows={5}
              required
              placeholder="Describe what the project does..."
            />

            <span className="admin-field-hint">
              {form.description.length}/1000 characters
            </span>
          </div>

          <div className="admin-form-field">
            <label htmlFor="technologies">Technologies</label>

            <input
              id="technologies"
              name="technologies"
              value={form.technologies}
              onChange={handleChange}
              maxLength={500}
              placeholder="React, Spring Boot, MySQL"
            />

            <span className="admin-field-hint">
              Separate technologies with commas.
            </span>
          </div>
        </div>

        {/* Project image */}
        <div className="admin-form-section">
          <h3>Project image</h3>

          <p>
            Select an image from your computer. You can replace it when
            editing the project.
          </p>

          <div className="admin-form-field">
            <label htmlFor="projectImage">Upload image</label>

            <input
              ref={fileInputRef}
              id="projectImage"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              hidden
            />

            {imagePreview && !removeExistingImage ? (
              <div className="admin-image-upload">
                <div className="admin-image-preview">
                  {!imageLoadError ? (
                    <img
                      key={resolvedImageUrl}
                      src={resolvedImageUrl}
                      alt="Project preview"
                      onLoad={() => setImageLoadError(false)}
                      onError={(event) => {
                        console.error(
                          "Failed to load project image:",
                          event.currentTarget.src
                        );
                        setImageLoadError(true);
                      }}
                    />
                  ) : (
                    <div className="admin-image-placeholder">
                      <ImageIcon size={32} />
                      <strong>Image could not be loaded</strong>
                      <span>
                        Check that the image exists on the backend server.
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    className="admin-image-remove"
                    onClick={handleRemoveImage}
                    aria-label="Remove project image"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="admin-image-actions">
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadCloud size={16} />
                    Replace image
                  </button>

                  <span className="admin-field-hint">
                    {imageFile
                      ? imageFile.name
                      : "Current project image"}
                  </span>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="admin-image-dropzone"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon size={32} />
                <strong>Choose a project image</strong>
                <span>Click to browse your files</span>
                <small>JPG, PNG or WebP · Maximum 5 MB</small>
              </button>
            )}
          </div>
        </div>

        {/* Project links */}
        <div className="admin-form-section">
          <h3>Project links</h3>

          <p>Provide links to your source code and live demo.</p>

          <div className="admin-form-field">
            <label htmlFor="githubUrl">GitHub URL</label>

            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              value={form.githubUrl}
              onChange={handleChange}
              maxLength={500}
              placeholder="https://github.com/username/repository"
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="liveUrl">Live demo URL</label>

            <input
              id="liveUrl"
              name="liveUrl"
              type="url"
              value={form.liveUrl}
              onChange={handleChange}
              maxLength={500}
              placeholder="https://your-project.example"
            />
          </div>
        </div>

        {/* Publishing */}
        <div className="admin-publish-option">
          <label className="admin-checkbox-label">
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
            />

            <span>
              <strong>Publish project</strong>
              <small>
                Allow this project to appear on your public portfolio.
              </small>
            </span>
          </label>
        </div>

        {/* Form actions */}
        <div className="admin-form-footer">
          <Link
            to="/admin/projects"
            className="admin-secondary-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="admin-primary-button"
            disabled={submitting}
          >
            <Save size={17} />

            {submitting
              ? "Saving..."
              : isEditing
                ? "Save changes"
                : "Create project"}
          </button>
        </div>
      </form>
    </section>
  );
}
