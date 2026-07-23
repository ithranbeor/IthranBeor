from rest_framework import serializers
from .models import Project, WorkExperience, WorkExperienceImage


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class WorkExperienceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperienceImage
        fields = ['id', 'image', 'created_at']


class WorkExperienceSerializer(serializers.ModelSerializer):
    images = WorkExperienceImageSerializer(many=True, read_only=True)

    class Meta:
        model = WorkExperience
        fields = [
            'id',
            'logo',
            'title',
            'subtitle',
            'company_name',
            'company_address',
            'pills',
            'images',
            'created_at',
            'updated_at'
        ]