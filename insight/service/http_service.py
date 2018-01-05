#!/usr/bin/python
# -*- coding: utf-8 -*-
import json
import urllib2
import hashlib
import socket

__author__ = "weiwenliang"
__date__ = "2017/11/12 下午5:28"

EMI_URL_STAGING="http://staging.e.mi.com/"
EMI_URL_PRODUCTION="http://e.mi.com/"
EMI_URL = EMI_URL_STAGING
if 'lg-miui' in socket.gethostname():
    EMI_URL = EMI_URL_PRODUCTION
    
default_param_key="empty_params_#$@%!ab_)ad$"
emi_salt="xiaomi_ad_*#%$_cube"

def request_emi(url, params):
    md5str = md5_encode(params, emi_salt)
    request_url=EMI_URL+url+"?"
    if params:
        for key,value in params.items():
            request_url = request_url + str(key) + "=" + str(value) + "&"
    request_url = request_url + "sign=" + md5str
    print("request url:", request_url)
    try:
        response = urllib2.urlopen(request_url)
        return json.loads(response.read())
    except Exception,e:
        print("request failed. url={}, error={}",request_url, e)
        return None

def md5_encode(params, salt):
    param_str=""
    if params:
        sorted(params.keys())
        for key,value in params.items():
            param_str = param_str + str(key) + str(value)
        print param_str
    else :
        param_str = default_param_key

    param_str = param_str + salt
    md5=hashlib.md5(param_str.encode('utf-8')).hexdigest()
    print(md5)
    return md5
