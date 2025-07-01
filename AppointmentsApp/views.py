from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404

from AppointmentsApp.models import Appointment, Feedback
from AppointmentsApp.serializers import AppointmentSerializer, FeedbackSerializer


@csrf_exempt
def appointmentApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            appointments = Appointment.objects.all()
            serializer = AppointmentSerializer(appointments, many=True)
            return JsonResponse(serializer.data, safe=False)
        else:
            appointment = get_object_or_404(Appointment, pk=id)
            serializer = AppointmentSerializer(appointment)
            return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AppointmentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        appointment = get_object_or_404(Appointment, pk=id)
        serializer = AppointmentSerializer(appointment, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        appointment = get_object_or_404(Appointment, pk=id)
        appointment.delete()
        return JsonResponse({'message': 'Appointment deleted successfully'}, status=204)


@csrf_exempt
def feedbackApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            feedbacks = Feedback.objects.all()
            serializer = FeedbackSerializer(feedbacks, many=True)
            return JsonResponse(serializer.data, safe=False)
        else:
            feedback = get_object_or_404(Feedback, pk=id)
            serializer = FeedbackSerializer(feedback)
            return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = FeedbackSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        feedback = get_object_or_404(Feedback, pk=id)
        serializer = FeedbackSerializer(feedback, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        feedback = get_object_or_404(Feedback, pk=id)
        feedback.delete()
        return JsonResponse({'message': 'Feedback deleted successfully'}, status=204)
