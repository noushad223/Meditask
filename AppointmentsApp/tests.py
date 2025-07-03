from django.test import TestCase, Client
from django.urls import reverse
from .models import Appointment, Feedback
import json


# Create your tests here.
class AppointmentModelTest(TestCase):
    def test_create_appointment(self):
        appointment = Appointment.objects.create(
            patient_name="John Doe",
            doctor_name="Dr. John",
            date="2026-01-01",
            time="14:00:00"
        )
        self.assertEqual(appointment.patient_name, "John Doe")
        self.assertEqual(appointment.doctor_name, "Dr. John")
        self.assertEqual(str(appointment.date), "2026-01-01")
        self.assertEqual(str(appointment.time), "14:00:00")

class FeedbackModelTest(TestCase):
    def test_create_feedback(self):
        feedback = Feedback.objects.create(
            name="User",
            email="user@example.com",
            type="suggestion",
            description="Add dark mode"
        )
        self.assertEqual(feedback.name, "User")
        self.assertEqual(feedback.email, "user@example.com")
        self.assertEqual(feedback.type, "suggestion")
        self.assertEqual(feedback.description, "Add dark mode")