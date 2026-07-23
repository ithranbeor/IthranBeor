from django.contrib import admin
from django.contrib.postgres.fields import ArrayField
from django.forms import CharField, Textarea
from .models import Project, WorkExperience, WorkExperienceImage


admin.site.register(Project)


class WorkExperienceImageInline(admin.TabularInline):
    model = WorkExperienceImage
    extra = 10
    fields = ['image']


class WorkExperienceAdmin(admin.ModelAdmin):
    inlines = [WorkExperienceImageInline]
    list_display = ['title', 'company_name', 'created_at']
    list_filter = ['company_name']
    search_fields = ['title', 'company_name', 'company_address']
    readonly_fields = ['created_at', 'updated_at']
    
    formfield_overrides = {
        ArrayField: {'widget': Textarea(attrs={'rows': 10, 'cols': 50})},
    }
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'subtitle', 'logo')
        }),
        ('Company Details', {
            'fields': ('company_name', 'company_address')
        }),
        ('Skills & Experience', {
            'fields': ('pills',),
            'description': 'Enter skills/tags as comma-separated values. Example: Python, Django, React'
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


admin.site.register(WorkExperience, WorkExperienceAdmin)