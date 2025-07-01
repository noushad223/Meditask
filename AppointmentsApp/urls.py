from django.urls import path
from AppointmentsApp import views

urlpatterns = [
    path('appointments/', views.appointmentApi, name='appointments'),
    path('appointments/<int:id>/', views.appointmentApi, name='appointment-detail'),
    
    path('feedback/', views.feedbackApi, name='feedback'),
    path('feedback/<int:id>/', views.feedbackApi, name='feedback-detail'),
]
