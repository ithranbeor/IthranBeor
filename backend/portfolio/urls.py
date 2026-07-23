from django.urls import path
from .views import (
    ProjectListView,
    WorkExperienceListCreateView,
    WorkExperienceDetailView,
    WorkExperienceImageUploadView,
    WorkExperienceImageDeleteView,
)

urlpatterns = [
    path("projects/", ProjectListView.as_view()),
    path("work-experience/", WorkExperienceListCreateView.as_view(), name="work-experience-list"),
    path("work-experience/<int:pk>/", WorkExperienceDetailView.as_view(), name="work-experience-detail"),
    path("work-experience/<int:work_experience_id>/images/", WorkExperienceImageUploadView.as_view(), name="work-experience-images"),
    path("work-experience/<int:work_experience_id>/images/<int:image_id>/", WorkExperienceImageDeleteView.as_view(), name="work-experience-image-delete"),
]