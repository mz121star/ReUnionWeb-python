from django.http import HttpResponse
from mongoengine import *
from django.shortcuts import render_to_response
class Feeds(Document):
    Title = StringField()
    FromType=StringField()
    FromSite=StringField()
    Content=StringField()
    
    meta = {"collection": "ResultData_Max_new_ENG"}
    
def index(request):
        #connect('resultdata_db', host='192.168.122.87', port=27017)
        #result='' 
        #for e in Feeds.objects[:10]:
        #    result=result,e["Title"], e["FromType"], e["Content"]
         
        
        return render_to_response('index.html', {})