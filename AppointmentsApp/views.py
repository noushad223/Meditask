from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from AppointmentsApp.models import Appointment, Feedback
from AppointmentsApp.serializers import AppointmentSerializer, FeedbackSerializer
# Create your views here.

# Api endpoints
@csrf_exempt
def appointmentApi(request, id=0):
    if request.method=='GET':
        appointments = Appointment.objects.all()
        appointments_serializer= AppointmentSerializer(appointments, many=True)
        return JsonResponse(appointments_serializer.data, safe=True)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        appointment_serializer = AppointmentSerializer(data=data)
        if appointment_serializer.is_valid():
            appointment_serializer.save()
            return JsonResponse(appointment_serializer.data, status=201)
        return JsonResponse(appointment_serializer.errors, status=400)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        try:
            appointment = Appointment.objects.get(id=id)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Appointment not found'}, status=404)

        appointment_serializer = AppointmentSerializer(appointment, data=data)
        if appointment_serializer.is_valid():
            appointment_serializer.save()
            return JsonResponse(appointment_serializer.data)
        return JsonResponse(appointment_serializer.errors, status=400)

    elif request.method == 'DELETE':
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse({'message': 'Appointment deleted successfully'}, status=204)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Appointment not found'}, status=404)