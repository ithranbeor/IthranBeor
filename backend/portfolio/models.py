from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    github_url = models.URLField()
    live_url = models.URLField(blank=True)

    def __str__(self):
        return self.title


class WorkExperience(models.Model):
    logo = models.ImageField(upload_to='work_experience/logos/')
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    company_name = models.CharField(max_length=255)
    company_address = models.TextField()
    pills = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} at {self.company_name}"

    class Meta:
        ordering = ['-created_at']


class WorkExperienceImage(models.Model):
    work_experience = models.ForeignKey(
        WorkExperience,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(upload_to='work_experience/images/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.work_experience.title}"

    class Meta:
        ordering = ['created_at']