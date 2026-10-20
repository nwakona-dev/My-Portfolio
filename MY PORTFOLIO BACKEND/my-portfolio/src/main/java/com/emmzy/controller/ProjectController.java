package com.emmzy.controller;

import com.emmzy.model.Project;
import com.emmzy.repository.ProjectRepository;
import com.emmzy.service.ProjectService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectRepository projectRepository;

    public ProjectController(
            ProjectService projectService,
            ProjectRepository projectRepository
    ) {
        this.projectService = projectService;
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getPublishedProjects() {
        return ResponseEntity.ok(
                projectService.getPublishedProjects()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getPublishedProjectById(
            @PathVariable Long id
    ) {
        Project project = projectService.getProjectById(id);

        if (!project.isPublished()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Project not found."
            );
        }

        return ResponseEntity.ok(project);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchPublishedProjects(
            @RequestParam String title
    ) {
        if (title.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        List<Project> projects =
                projectRepository
                        .findByPublishedTrueAndTitleContainingIgnoreCase(
                                title.trim()
                        );

        return ResponseEntity.ok(projects);
    }
}
