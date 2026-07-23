# Portfolio Database Setup - Complete Summary

## ✅ What Was Created

### Database Models

1. **WorkExperience** - Main model storing work experience data
   - Logo (image upload)
   - Title, Subtitle
   - Start Date, End Date
   - Company Name
   - Company Address
   - Pills (skills/tags as array)
   - Timestamps (auto-managed)

2. **WorkExperienceImage** - Related model for storing multiple images per
   experience
   - ForeignKey to WorkExperience
   - Image field
   - Timestamp for ordering

### API Endpoints

- `GET/POST /api/work-experience/` - List all or create new work experience
- `GET/PUT/DELETE /api/work-experience/<id>/` - Manage individual experiences
- `GET/POST /api/work-experience/<id>/images/` - Manage experience images

### Backend Infrastructure

- **Serializers** - REST API serialization for both models
- **Views** - CRUD operations with multipart form support
- **Admin Interface** - Django admin for easy management with inline image
  upload
- **Media Configuration** - Proper file upload/serving setup

### Database Migration

- Migration file:
  `portfolio/migrations/0002_workexperience_alter_project_id_workexperienceimage.py`
- Applied to PostgreSQL database

---

## 🚀 How to Use

### Option 1: Django Admin (Easiest for Management)

1. Ensure you have a superuser:
   ```bash
   python manage.py createsuperuser
   ```
2. Visit: `http://localhost:8000/admin/`
3. Go to "Work Experiences" section
4. Click "Add Work Experience"
5. Upload logo, fill in details, and add images inline

### Option 2: API Endpoints

- See `API_DOCUMENTATION.md` for detailed endpoint documentation
- Use cURL, Postman, or JavaScript fetch to interact with API

### Option 3: Frontend Integration

Update your frontend to fetch data from the API instead of using hardcoded data:

```typescript
const response = await fetch("http://localhost:8000/api/work-experience/");
const experiences = await response.json();
```

---

## 📁 File Structure

```
backend/
├── portfolio/
│   ├── migrations/
│   │   └── 0002_workexperience_alter_project_id_workexperienceimage.py
│   ├── admin.py (updated)
│   ├── models.py (updated)
│   ├── serializers.py (updated)
│   ├── views.py (updated)
│   └── urls.py (updated)
├── config/
│   ├── settings.py (updated - added MEDIA_ROOT, MEDIA_URL)
│   └── urls.py (updated - added media serving)
└── media/
    └── work_experience/
        ├── logos/ (auto-created on upload)
        └── images/ (auto-created on upload)
```

---

## 📋 Sample Data Structure (Response Format)

```json
{
    "id": 1,
    "logo": "http://localhost:8000/media/work_experience/logos/example.png",
    "title": "Full-Stack Developer & Administrative Support Intern",
    "subtitle": "February 2026 – May 2025",
    "start_date": "2026-02-01",
    "end_date": "2025-05-31",
    "company_name": "USTP – CITC Dean's Office",
    "company_address": "USTP, Information and Communications Technology Building...",
    "pills": [
        "Full-Stack & UI/UX",
        "Backend Engineering",
        "Feature Optimization"
    ],
    "images": [
        {
            "id": 1,
            "image": "http://localhost:8000/media/work_experience/images/img1.jpg",
            "created_at": "2026-07-22T10:30:00Z"
        }
    ],
    "created_at": "2026-07-22T10:30:00Z",
    "updated_at": "2026-07-22T10:30:00Z"
}
```

---

## ⚙️ Configuration Details

### CORS

- Already configured for `http://localhost:5173` (Vite frontend)
- Update `CORS_ALLOWED_ORIGINS` in `config/settings.py` for production

### Media Files

- Upload directory: `backend/media/`
- Access via: `http://localhost:8000/media/...`
- Automatic serving in development mode (DEBUG=True)

### Database

- Using PostgreSQL (as configured in `settings.py`)
- All migrations applied successfully

---

## 🔄 Next Steps

1. **Test the API** - Use the endpoints to create/read/update/delete work
   experiences
2. **Update Frontend** - Modify `WorkPage.tsx` to fetch from API instead of
   hardcoded data
3. **Deploy** - Configure static/media file serving for production
4. **Add Authentication** - Consider adding authentication for POST/PUT/DELETE
   operations

---

## 📚 Documentation

- Full API documentation: See `API_DOCUMENTATION.md`
- Django admin: `http://localhost:8000/admin/`
- API root: `http://localhost:8000/api/work-experience/`
