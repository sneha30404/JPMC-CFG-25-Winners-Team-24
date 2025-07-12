# backend/api/serializers.py
from rest_framework import serializers
from .models import User, Course, UserCourseProgress, CommunityPost, GroupChat, ChatMessage

class UserSerializer(serializers.ModelSerializer):
    progress = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'phone_number', 'first_name', 'last_name', 'role', 'business_sector', 'has_success_tag', 'progress']
    
    def get_progress(self, obj):
        # Get total number of courses
        total_courses = UserCourseProgress.objects.filter(
            user=obj
        ).count()

        if total_courses == 0:
            return 0
            
        # Get number of completed courses for the user
        completed_courses = UserCourseProgress.objects.filter(
            user=obj,
            completed=True
        ).count()
        
        # Calculate percentage
        return int((completed_courses / total_courses) * 100)

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class UserCourseProgressSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    class Meta:
        model = UserCourseProgress
        fields = ['id', 'course', 'completed']

class CommunityPostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.first_name', read_only=True)
    class Meta:
        model = CommunityPost
        fields = ['id', 'author', 'author_name', 'content', 'created_at']

class ChatMessageSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.first_name', read_only=True)
    class Meta:
        model = ChatMessage
        fields = ['id', 'author', 'author_name', 'content', 'timestamp']

class GroupChatSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)
    class Meta:
        model = GroupChat
        fields = ['id', 'name', 'members']