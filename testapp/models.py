from django.db import models
from tinymce.models import HTMLField


class User(models.Model):
    uid = models.AutoField(primary_key=True)  # 用户id，主键
    name = models.CharField(blank=False, null=False, max_length=100)  # 用户名
    gender = models.BooleanField(default=False)  # 性别
    email = models.EmailField(blank=False, null=False)
    birthday = models.DateField(default="2000-1-1")
    password = models.CharField(max_length=30, null=False, blank=False, default="a12345678")
    tags = models.TextField(default="")
    uphoto = models.ImageField(upload_to="uphoto/", default="uphoto/default.jpg")  # 头像

    def __str__(self):
        return self.name


class UserToken(models.Model):
    user = models.OneToOneField(to='User',on_delete=models.CASCADE)
    token = models.CharField(max_length=64)


class Article(models.Model):
    aid = models.AutoField(primary_key=True)
    uid = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(blank=False, null=False, max_length=100)
    content = HTMLField()

    def __str__(self):
        return self.title


class Team(models.Model):
    tid = models.AutoField(primary_key=True)
    creatorid = models.IntegerField()
    uidlist = models.ManyToManyField(User)
    tname = models.CharField(blank=False, null=False, max_length=100)

    def __str__(self):
        return self.tname


class MemberShip(models.Model):
    tid = models.ForeignKey(Team, on_delete=models.CASCADE)
    uid = models.ForeignKey(User, on_delete=models.CASCADE)
    isManager = models.BooleanField(default=False)

    class Meta:
        unique_together = (("tid", "uid"),)

    def __str__(self):
        return str(self.tid) + '/' + str(self.uid)


class Comment(models.Model):
    cid = models.AutoField(primary_key=True)
    aid = models.ForeignKey(Article, on_delete=models.CASCADE)
    uid = models.ForeignKey(User, on_delete=models.CASCADE)
    content = HTMLField()
