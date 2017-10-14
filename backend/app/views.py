#!/usr/bin/env python
# -*- coding: utf-8 -*-

##------------------------------------------------------------##
'''
    File name: views.py
    Author: Paul Duc-Vinh TRAN
    E-Mail : dvp.tran@gmail.com
    Date created: 11/09/2017
    Date last modified: 14/10/2017
    Python Version: 2.7
'''
##------------------------------------------------------------##
#Imports
from app import app
from flask import make_response,\
                    abort, jsonify, Blueprint, Flask, request,current_app


import pandas as pd
import json
from datetime import timedelta
from functools import update_wrapper
import googlemaps
from datetime import datetime
import httplib, urllib, base64
from scipy import spatial as sp
import numpy as np



import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

##------------------------------------------------------------##


##------------------------------------------------------------##
def crossdomain(origin=None, methods=None, headers=None, max_age=21600,
                attach_to_all=True, automatic_options=True):
    """Decorator function that allows crossdomain requests.
      Courtesy of
      https://blog.skyred.fi/articles/better-crossdomain-snippet-for-flask.html
    """
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        """ Determines which methods are allowed
        """
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        """The decorator function
        """
        def wrapped_function(*args, **kwargs):
            """Caries out the actual cross domain code
            """
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers
            h['Cache-Control'] = 'no-store, no-cache'
            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            h['Access-Control-Allow-Credentials'] = 'true'
            h['Access-Control-Allow-Headers'] = \
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator


##------------------------------------------------------------##
#set env
main = Blueprint('main', __name__)
#global var
maps_key = "AIzaSyCJrQw4dgu7auRmHypUdwprbQKUnpqh0Ic"
prim_key = "8005ceb8c33a4f88b8bcff3b53cac416"
sec_key = "ae83cd4796654604a685d0ccd0f62cb4"
vin1 = "SIM523751599"

data = pd.read_csv("app/data/data.csv",sep=";")
##------------------------------------------------------------##
#functions
gmaps = googlemaps.Client(key=maps_key)
def get_direction(start,end):
    now = datetime.now()
    directions_result = gmaps.directions(start,
                                         end,
                                         mode="driving",
                                         departure_time=now)
    print("______________________________")
    print(directions_result)
    try:
        return(directions_result[0]["legs"][0]["distance"])
    except Exception as e:
        print(e)
        return(None)


    
##------------------------------------------------------------##
@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"




@app.route("/api/search", methods = ['GET', 'POST'])
@crossdomain(origin='*')
def search():
    if 'latitude' in request.args or "longitude" in request.args:
        if request.args['latitude'] and request.args['longitude'] :
            latitude = request.args['latitude']
            longitude = request.args['longitude']
            print(latitude)
            print(longitude)
            X = data[["latitude","longitude"]].as_matrix()
            out = sp.distance.cdist([[latitude,longitude]],X,metric="euclidean")
            out = out.argsort()[0][0:10]
            #out = [list(data.loc[x].nom_station.values) for x in a.argsort()][0][0:3]
            #lat = data.loc[out.argmin()].latitude
            #long = data.loc[out.argmin()].longitude
            #type_charge = data.loc[out.argmin()].type_charge
            output = [{"key":x,"latitude":data.loc[x].latitude,"longitude":data.loc[x].longitude,"type_charge":data.loc[x].type_charge,"prix":data.loc[x].prix,"distance":get_direction(str(latitude)+","+str(longitude),str(data.loc[x].latitude)+","+str(data.loc[x].longitude))} for x in out]
            return(json.dumps({"response":output}))
        else:
            return(json.dumps({"response":"Je n'ai pas compris "}))
    return(json.dumps({"response":"Pas d'argument"}))
    
    
    

