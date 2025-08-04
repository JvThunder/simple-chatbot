from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from chatbot.gpt import gpt_call, get_chat_session_id

# Create your views here.
def backend_test(request):
    try:
        if request.method == 'GET':
            return JsonResponse({
                "message": "test_data"
            })
    except:
        return HttpResponse(status=500)
    
@csrf_exempt
def chatbot_call(request):
    try:
        if request.method == 'POST':
            data = JSONParser().parse(request)
            
            if "chat_session_id" not in data:
                return JsonResponse({
                    "error": "Chat session ID is required"
                }, status=400)
            if "query" not in data:
                return JsonResponse({
                    "error": "Query is required"
                }, status=400)
            
            gpt_response = gpt_call(data["query"], data["chat_session_id"])
            return JsonResponse({
                "message": gpt_response[1:]
            })
    except Exception as e:
        print("Error:", e)
        return HttpResponse(status=500)
    
@csrf_exempt
def create_chat_session(request):
    try:
        if request.method == 'POST':
            chat_session_id = get_chat_session_id()
            return JsonResponse({
                "chat_session_id": chat_session_id
            })
    except Exception as e:
        print("Error:", e)
        return HttpResponse(status=500)

    
@csrf_exempt
def chatbot_call_with_files(request):
    try:
        if request.method == 'POST':
            query = request.POST.get('query', '').strip()
            chat_session_id = request.POST.get('chat_session_id', '')
            uploaded_file = request.FILES.get('file')

            if not chat_session_id:
                return JsonResponse({'error': 'Chat session ID is required.'}, status=400)

            if not uploaded_file or not uploaded_file.name.endswith('.txt'):
                return JsonResponse({'error': 'Only .txt files are allowed.'}, status=400)

            try:
                file_content = uploaded_file.read().decode('utf-8')
            except UnicodeDecodeError:
                return JsonResponse({'error': 'Unable to decode the uploaded file using UTF-8.'}, status=400)

            # If no query provided, use a default prompt
            if not query:
                query = "Please analyze the uploaded file content."

            # Call GPT with query as the user message and the file content as additional system context.
            gpt_response = gpt_call(query, chat_session_id, context=file_content)

            return JsonResponse({
                'message': gpt_response  # Exclude the system prompt or first message if applicable
            })
    except Exception as e:
        print("Error in chatbot_call_with_files:", e)
        return HttpResponse(status=500)