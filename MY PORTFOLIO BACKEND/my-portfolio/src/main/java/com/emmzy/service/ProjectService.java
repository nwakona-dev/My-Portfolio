package com.emmzy.service;

import com.emmzy.model.Project;

import java.util.List;

public interface ProjectService {

    List<Project> getAllProjects();

    List<Project> getPublishedProjects();

    Project getProjectById(Long id);

    List<Project> searchProjectsByTitle(String title);

    Project createProject(Project project);

    Project updateProject(Long id, Project project);

    void deleteProject(Long id);

    Project updatePublishedStatus(Long id, boolean published);
}
