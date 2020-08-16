from django.contrib import admin
from .models import User, Team, MemberShip, Comment,Article

# Register your models here.
admin.site.register(User)
admin.site.register(Team)
admin.site.register(MemberShip)
admin.site.register(Comment)
admin.site.register(Article)
