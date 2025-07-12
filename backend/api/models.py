# backend/api/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('trainee', 'Trainee'),
        ('graduate', 'Graduate'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    phone_number = models.CharField(max_length=15, unique=True)
    business_sector = models.CharField(max_length=50, blank=True, null=True)
    has_success_tag = models.BooleanField(default=False)
    # To link a mentor (graduate) to a trainee
    assigned_mentor = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='mentees')
    success_story = models.TextField(blank=True, null=True)
    # We remove the default username and use phone_number for login
    username = None
    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    is_refresher = models.BooleanField(default=False) # True for graduate refreshers

class UserCourseProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ('user', 'course')

class CommunityPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class GroupChat(models.Model):
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(User, related_name='chat_groups')
    
class ChatMessage(models.Model):
    chat = models.ForeignKey(GroupChat, on_delete=models.CASCADE, related_name='messages')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)