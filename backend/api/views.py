# backend/api/views.py
from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import (
    User,
    Course,
    UserCourseProgress,
    CommunityPost,
    GroupChat,
    ChatMessage,
)
from .serializers import (
    UserSerializer,
    CourseSerializer,
    UserCourseProgressSerializer,
    CommunityPostSerializer,
    GroupChatSerializer,
    ChatMessageSerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken


# HACKATHON LOGIN: FAKE OTP
class LoginView(views.APIView):
    def post(self, request, *args, **kwargs):
        phone_number = request.data.get("phone_number")
        otp = request.data.get("otp")  # We will ignore the OTP value

        if not phone_number:
            return Response(
                {"error": "Phone number is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # For prototype, any OTP is valid. Find or create user.
        user = User.objects.get(phone_number=phone_number)
        if user is None:
            return Response(
                {"error": "User not found"}, status=status.HTTP_400_BAD_REQUEST
            )

        # For demo purposes, let's assign roles and data if user is new

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": UserSerializer(user).data,
            }
        )


class PhoneCheckView(views.APIView):
    def post(self, request, *args, **kwargs):
        phone_number = request.data.get("phone_number")
        user = User.objects.filter(phone_number=phone_number)
        return Response(
            {
                "exists": user.exists(),
            }
        )

class RegisterView(views.APIView):
    def post(self, request, *args, **kwargs):
        phone_number = request.data.get("phone_number")
        role = request.data.get("role")
        name = request.data.get("name")
        business_sector = request.data.get("business_sector")
        
        # create the user, if role is admin then no business sector
        if role == "admin":
            user, created = User.objects.get_or_create(
                phone_number=phone_number,
                role=role,
            )
        else:
            user, created = User.objects.get_or_create(
                phone_number=phone_number,
                role=role,
            )

        user.first_name = name
        user.business_sector = business_sector
        user.save()
        
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": UserSerializer(user).data,
            }
        )

class PromoteUserView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id, *args, **kwargs):
        try:
            user = User.objects.get(id=user_id)
            if user.role == 'trainee':
                user.role = 'graduate'
                user.save()
                return Response({
                    'message': 'User successfully promoted to Graduate',
                    'user': UserSerializer(user).data
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'error': 'User is not a trainee'
                }, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({
                'error': 'User not found'
            }, status=status.HTTP_404_NOT_FOUND)

class DashboardView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        if user.role == "admin":
            trainees = User.objects.filter(role="trainee")
            graduates = User.objects.filter(role="graduate")
            return Response(
                {
                    "trainees": UserSerializer(trainees, many=True).data,
                    "graduates": UserSerializer(graduates, many=True).data,
                }
            )
        elif user.role == "trainee":
            courses = Course.objects.filter(is_refresher=False)
            progress = UserCourseProgress.objects.filter(user=user)
            return Response(
                {
                    "courses": CourseSerializer(courses, many=True).data,
                    "progress": UserCourseProgressSerializer(progress, many=True).data,
                }
            )
        elif user.role == "graduate":
            courses = Course.objects.filter(is_refresher=True)
            return Response({"refreshers": CourseSerializer(courses, many=True).data})
        return Response(status=status.HTTP_400_BAD_REQUEST)


class CourseProgressView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        course_id = request.data.get("course_id")
        completed = request.data.get("completed")
        progress, created = UserCourseProgress.objects.update_or_create(
            user=request.user, course_id=course_id, defaults={"completed": completed}
        )
        return Response(UserCourseProgressSerializer(progress).data)


class CommunityPostListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = CommunityPost.objects.all().order_by("-created_at")
    serializer_class = CommunityPostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class GroupChatListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GroupChatSerializer

    def get_queryset(self):
        return self.request.user.chat_groups.all()

    # Admin can create chats and add members
    def perform_create(self, serializer):
        chat = serializer.save()
        member_ids = self.request.data.get("members", [])
        members = User.objects.filter(id__in=member_ids)
        chat.members.add(*members, self.request.user)


class ChatMessageListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        chat_id = self.kwargs["chat_id"]
        # Ensure user is a member of the chat
        if GroupChat.objects.filter(id=chat_id, members=self.request.user).exists():
            return ChatMessage.objects.filter(chat_id=chat_id).order_by("timestamp")
        return ChatMessage.objects.none()

    def perform_create(self, serializer):
        chat_id = self.kwargs["chat_id"]
        chat = GroupChat.objects.get(id=chat_id)
        serializer.save(author=self.request.user, chat=chat)
