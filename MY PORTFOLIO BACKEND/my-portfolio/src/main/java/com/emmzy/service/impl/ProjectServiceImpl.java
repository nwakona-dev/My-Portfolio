package com.emmzy.service.impl;

import com.emmzy.model.Project;
import com.emmzy.repository.ProjectRepository;
import com.emmzy.service.ProjectService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Project> getPublishedProjects() {
        return projectRepository
                .findByPublishedTrueOrderByCreatedAtDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Project not found with ID: " + id
                        )
                );
    }

    @Override
    @Transactional(readOnly = true)
    public List<Project> searchProjectsByTitle(String title) {
        if (title == null || title.isBlank()) {
            return List.of();
        }

        return projectRepository
                .findByTitleContainingIgnoreCase(title.trim());
    }

    @Override
    public Project createProject(Project project) {
        if (project == null) {
            throw new IllegalArgumentException(
                    "Project details must not be null."
            );
        }

        project.setId(null);

        LocalDateTime now = LocalDateTime.now();

        project.setCreatedAt(now);
        project.setUpdatedAt(now);

        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(Long id, Project project) {
        if (project == null) {
            throw new IllegalArgumentException(
                    "Project details must not be null."
            );
        }

        Project existingProject = getProjectById(id);

        existingProject.setTitle(project.getTitle());
        existingProject.setDescription(project.getDescription());
        existingProject.setImageUrl(project.getImageUrl());
        existingProject.setTechnologies(project.getTechnologies());
        existingProject.setGithubUrl(project.getGithubUrl());
        existingProject.setLiveUrl(project.getLiveUrl());
        existingProject.setPublished(project.isPublished());
        existingProject.setUpdatedAt(LocalDateTime.now());

        return projectRepository.save(existingProject);
    }

    @Override
    public void deleteProject(Long id) {
        Project project = getProjectById(id);
        projectRepository.delete(project);
    }

    @Override
    public Project updatePublishedStatus(
            Long id,
            boolean published
    ) {
        Project project = getProjectById(id);

        project.setPublished(published);
        project.setUpdatedAt(LocalDateTime.now());

        return projectRepository.save(project);
    }
}
