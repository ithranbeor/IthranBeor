# Work Experience API Documentation

## Base URL

```
http://localhost:8000/api
```

## Endpoints

### 1. List & Create Work Experiences

**GET** `/work-experience/`

- Retrieve all work experiences
- Returns: Array of work experience objects with nested images

**POST** `/work-experience/`

- Create a new work experience
- Content-Type: `multipart/form-data`
- Required Fields:
  - `logo` (ImageField): Logo image file
  - `title` (string): Job title
  - `company_name` (string): Company name
  - `company_address` (string): Company address

- Optional Fields:
  - `subtitle` (string): Subtitle/additional title info
  - `pills` (array): List of skills/tags (JSON format: `["skill1", "skill2"]`)

**Example POST Request:**

```bash
curl -X POST http://localhost:8000/api/work-experience/ \
  -F "logo=@path/to/logo.png" \
  -F "title=Full-Stack Developer" \
  -F "subtitle=Intern" \
  -F "company_name=USTP - CITC" \
  -F "company_address=USTP, Cagayan de Oro City" \
  -F "pills=[\"Full-Stack\", \"UI/UX\", \"Backend\"]"
```

---

### 2. Retrieve, Update, Delete Work Experience

**GET** `/work-experience/<id>/`

- Retrieve a specific work experience with all images

**PUT** `/work-experience/<id>/`

- Update a work experience
- Content-Type: `multipart/form-data`
- All fields are optional

**DELETE** `/work-experience/<id>/`

- Delete a work experience (also deletes all associated images)

**Example PUT Request:**

```bash
curl -X PUT http://localhost:8000/api/work-experience/1/ \
  -F "title=Updated Title" \
  -F "pills=[\"New Skill\"]"
```

---

### 3. Upload Images for Work Experience

**GET** `/work-experience/<id>/images/`

- Retrieve all images for a specific work experience

**POST** `/work-experience/<id>/images/`

- Upload one or more images for a work experience
- Content-Type: `multipart/form-data`
- Required Fields:
  - `image` (ImageField): Image file

**Example POST Request (Single Image):**

```bash
curl -X POST http://localhost:8000/api/work-experience/1/images/ \
  -F "image=@path/to/image.jpg"
```

**Example POST Request (Multiple Images):**

```bash
curl -X POST http://localhost:8000/api/work-experience/1/images/ \
  -F "image=@path/to/image1.jpg" \
  -F "image=@path/to/image2.jpg"
```

---

## Response Format

### Work Experience Object

```json
{
    "id": 1,
    "logo": "http://localhost:8000/media/work_experience/logos/logo.png",
    "title": "Full-Stack Developer",
    "subtitle": "Intern",
    "company_name": "USTP - CITC",
    "company_address": "USTP, Cagayan de Oro City",
    "pills": ["Full-Stack", "UI/UX", "Backend"],
    "images": [
        {
            "id": 1,
            "image": "http://localhost:8000/media/work_experience/images/image1.jpg",
            "created_at": "2026-07-22T10:30:00Z"
        },
        {
            "id": 2,
            "image": "http://localhost:8000/media/work_experience/images/image2.jpg",
            "created_at": "2026-07-22T10:31:00Z"
        }
    ],
    "created_at": "2026-07-22T10:30:00Z",
    "updated_at": "2026-07-22T10:30:00Z"
}
```

### Work Experience Image Object

```json
{
    "id": 1,
    "image": "http://localhost:8000/media/work_experience/images/image.jpg",
    "created_at": "2026-07-22T10:30:00Z"
}
```

---

## Usage with Django Admin

1. Create a superuser:

```bash
python manage.py createsuperuser
```

2. Go to: `http://localhost:8000/admin/`

3. Login with your credentials

4. Manage Work Experiences through the admin interface

---

## Frontend Integration Example (React/TypeScript)

```typescript
// Fetch all work experiences
async function fetchWorkExperiences() {
    const response = await fetch("http://localhost:8000/api/work-experience/");
    return response.json();
}

// Create new work experience
async function createWorkExperience(formData: FormData) {
    const response = await fetch("http://localhost:8000/api/work-experience/", {
        method: "POST",
        body: formData,
    });
    return response.json();
}

// Upload images
async function uploadImages(workExperienceId: number, formData: FormData) {
    const response = await fetch(
        `http://localhost:8000/api/work-experience/${workExperienceId}/images/`,
        {
            method: "POST",
            body: formData,
        },
    );
    return response.json();
}

// Update work experience
async function updateWorkExperience(id: number, formData: FormData) {
    const response = await fetch(
        `http://localhost:8000/api/work-experience/${id}/`,
        {
            method: "PUT",
            body: formData,
        },
    );
    return response.json();
}

// Delete work experience
async function deleteWorkExperience(id: number) {
    const response = await fetch(
        `http://localhost:8000/api/work-experience/${id}/`,
        {
            method: "DELETE",
        },
    );
    return response.ok;
}
```

---

## Error Responses

### 400 Bad Request

```json
{
    "field_name": ["Error message"]
}
```

### 404 Not Found

```json
{
    "detail": "Not found."
}
```

### 500 Internal Server Error

```json
{
    "detail": "Internal server error"
}
```

---

## Notes

- Images are stored in `backend/media/work_experience/` directory
- The `pills` field accepts a JSON array of strings
- Dates must be in YYYY-MM-DD format
- All image uploads must be in standard image formats (PNG, JPG, GIF, etc.)
- Maximum file size depends on server configuration (default: typically 2.5MB
  per file)
