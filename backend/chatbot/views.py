from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from chatbot.gpt import gpt_call

# Create your views here.
def backend_test(request):
    try:
        if request.method == 'GET':
            return JsonResponse({
                "message": "test_data"
            })
    except:
        return HttpResponse(status=500)
    
def chatbot_call(request):
    try:
        if request.method == 'POST':
            data = JSONParser().parse(request)
            gpt_response = gpt_call(data["query"])
            return JsonResponse({
                "message": gpt_response
            })
    except:
        return HttpResponse(status=500)