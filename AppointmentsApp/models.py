from django.db import models

# Create your models here.
# Appointment model 
class Appointment(models.Model):
    patient_name = models.CharField(max_length=100)
    doctor_name = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    

# Optional feedback model
class Feedback(models.Model):
    FEEDBACK_TYPES = [
        ('bug', 'Bug'),
        ('suggestion', 'Suggestion'),
        ('other', 'Other'),
    ]
    name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    type = models.CharField(max_length=20, choices=FEEDBACK_TYPES)
    description = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
