from rest_framework import serializers
from AppointmentsApp.models import Appointment, Feedback

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'patient_name', 'doctor_name', 'date', 'time']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'name', 'email', 'type', 'description', 'submitted_at']