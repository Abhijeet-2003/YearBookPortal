from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Profile)
admin.site.register(Team_Member)
admin.site.register(Testimonial)
admin.site.register(PollQuestion)
admin.site.register(PollAnswer)
admin.site.register(ProfileQuestion)
admin.site.register(ProfileAnswers)
admin.site.register(Announcement)
admin.site.register(Leaderboard)