
import { useCallback, useEffect, useState } from "react";
import { getPublishedProjects } from "../services/projectService";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPublishedProjects();

      if (!Array.isArray(data)) {
        throw new Error("Invalid projects response from the server.");
      }

      setProjects(data);
    } catch (err) {
      setError(err.message || "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetchProjects: fetchProjects,
  };
};

export default useProjects;
