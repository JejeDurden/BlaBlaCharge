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
import pandas as pd
import googlemaps
from datetime import datetime
import httplib, urllib, base64
import json

##------------------------------------------------------------##
#global var
maps_key = "AIzaSyCJrQw4dgu7auRmHypUdwprbQKUnpqh0Ic"
prim_key = "8005ceb8c33a4f88b8bcff3b53cac416"
sec_key = "ae83cd4796654604a685d0ccd0f62cb4"
vin1 = "SIM523751599"
##------------------------------------------------------------##

def clean_response(data):
    data = data.replace("\n","")
    data = data.strip("[").strip("]")
    data = data.split(",")
    data = map(lambda x: x.replace(" ","").replace('"',''),data)
    return data

def clean_response2(data):
    data = data.replace("\n","")
    data = data.strip("[").strip("]")
    #data = data.split(",")
    #data = map(lambda x: x.replace(" ","").replace('"',''),data)
    return data

#get all charging spots
def get_chg_spot():
    headers = {
        # Request headers
        'Ocp-Apim-Subscription-Key': prim_key,
    }

    params = urllib.urlencode({
    })

    try:
        conn = httplib.HTTPSConnection('renaultcafeapi.litmus.cloud')
        conn.request("GET", "/hoc/charging_spots?%s" % params, "{body}", headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        data = clean_response(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))
        data = None
    return data

#get charging spot info
def get_chg_info(chg_id):
    headers = {
        # Request headers
        'Ocp-Apim-Subscription-Key': prim_key,
    }

    params = urllib.urlencode({
    })

    try:
        conn = httplib.HTTPSConnection('renaultcafeapi.litmus.cloud')
        conn.request("GET", "/hoc/charging_spots/"+chg_id+"/data?%s" % params, "{body}", headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        data = clean_response(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))
        data = None
    return data

#get car names
def get_car_names():
    headers = {
        # Request headers
        'Ocp-Apim-Subscription-Key': prim_key,
    }

    params = urllib.urlencode({
    })

    try:
        conn = httplib.HTTPSConnection('renaultcafeapi.litmus.cloud')
        conn.request("GET", "/hoc/cars?%s" % params, "{body}", headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        data = clean_response(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))
        data=None
    return data


#get car data 
def get_car_data(car_id):
    headers = {
        # Request headers
        'Ocp-Apim-Subscription-Key': prim_key,
    }

    params = urllib.urlencode({
    })

    try:
        conn = httplib.HTTPSConnection('renaultcafeapi.litmus.cloud')
        conn.request("GET", "/hoc/cars/"+car_id+"/data?%s" % params, "{body}", headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        data=clean_response2(data)
        data = json.loads(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))
        data = None
    return data

#get simulated battery:
def get_sim_battery(vin):
    headers = {
        # Request headers
        'Ocp-Apim-Subscription-Key': prim_key,
    }

    params = urllib.urlencode({
    })

    try:
        conn = httplib.HTTPSConnection('renaultcafeapi.litmus.cloud')
        conn.request("GET", "/simulatedzoe/zoe/battery/"+vin+"?%s" % params, "{body}", headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        data=clean_response2(data)
        data = json.loads(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))
        data = None
    return data

#get simulated charge
def get_sim_charge(vin):
    headers = {
        # Request headers
        'Ocp-Apim-Subscription-Key': prim_key,
    }

    params = urllib.urlencode({
    })

    try:
        conn = httplib.HTTPSConnection('renaultcafeapi.litmus.cloud')
        conn.request("GET", "/simulatedzoe/zoe/charging/"+vin+"?%s" % params, "{body}", headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        data=clean_response2(data)
        data = json.loads(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))
        data = None
    return data

#get simulated location
def get_sim_location(vin):
    headers = {
        # Request headers
        'Ocp-Apim-Subscription-Key': prim_key,
    }

    params = urllib.urlencode({
    })

    try:
        conn = httplib.HTTPSConnection('renaultcafeapi.litmus.cloud')
        conn.request("GET", "/simulatedzoe/zoe/locationstatus/"+vin+"?%s" % params, "{body}", headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        data=clean_response2(data)
        data = json.loads(data)
        conn.close()
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))
        data = None
    return data