from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    DestroyAPIView,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Project, WorkExperience, WorkExperienceImage
from .serializers import ProjectSerializer, WorkExperienceSerializer, WorkExperienceImageSerializer


class ProjectListView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class WorkExperienceListCreateView(ListCreateAPIView):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        # Log incoming data for easier debugging of 400 responses
        try:
            data_preview = {k: v for k, v in request.data.items()}
        except Exception:
            data_preview = str(request.data)
        print("[WorkExperienceListCreateView] incoming data keys:", list(request.data.keys()))
        # show files separately
        try:
            file_keys = list(request.FILES.keys())
        except Exception:
            file_keys = []
        print("[WorkExperienceListCreateView] incoming files:", file_keys)

        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("[WorkExperienceListCreateView] validation errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class WorkExperienceDetailView(RetrieveUpdateDestroyAPIView):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer
    parser_classes = (MultiPartParser, FormParser)


class WorkExperienceImageUploadView(ListCreateAPIView):
    serializer_class = WorkExperienceImageSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        work_experience_id = self.kwargs.get('work_experience_id')
        return WorkExperienceImage.objects.filter(work_experience_id=work_experience_id)

    def perform_create(self, serializer):
        work_experience_id = self.kwargs.get('work_experience_id')
        work_experience = WorkExperience.objects.get(id=work_experience_id)
        serializer.save(work_experience=work_experience)
        
class WorkExperienceImageDeleteView(DestroyAPIView):
  serializer_class = WorkExperienceImageSerializer

  def get_queryset(self):
      work_experience_id = self.kwargs.get('work_experience_id')
      return WorkExperienceImage.objects.filter(work_experience_id=work_experience_id)

  def get_object(self):
      queryset = self.get_queryset()
      image_id = self.kwargs.get('image_id')
      obj = queryset.filter(pk=image_id).first()
      if obj is None:
          from django.http import Http404
          raise Http404("Image not found for this work experience")
      return obj

