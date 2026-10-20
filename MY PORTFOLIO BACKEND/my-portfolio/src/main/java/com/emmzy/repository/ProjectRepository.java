package com.emmzy.repository;

import com.emmzy.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByPublishedTrueOrderByCreatedAtDesc();

    List<Project> findByPublishedOrderByCreatedAtDesc(boolean published);

    List<Project> findByTitleContainingIgnoreCase(String title);

    Optional<Project> findByTitleIgnoreCase(String title);

    boolean existsByTitleIgnoreCase(String title);

    List<Project> findByPublishedTrueAndTitleContainingIgnoreCase(String title);

    Optional<Project> findByGithubUrl(String githubUrl);
}
