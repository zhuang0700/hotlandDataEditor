#!/usr/bin/python
# -*- coding: utf-8 -*-
from functools import wraps

__author__ = 'weiwenliang'
import os
import sys

basedir = os.path.abspath(os.path.dirname(__file__))
sys.path.append(basedir + '/../')

from flask import session, redirect, render_template



# user_info = zkproxy.ZKProxy("/services/com.xiaomi.ad.emi.demandInsight/users", zkproxy.ZKProxy.ENV_DEFAULT,
#                             user_value_parser)


def validate(username, input_password):
    return True
    # try:
    #     password, privileges = user_info.get(username)
    #     return password is not None and password == input_password
    # except:
    #     return False

#
def visitable(username, view_id):
    return True
    # try:
    #     password, privileges = user_info.get(username)
    #     return privileges is not None and (view_id in privileges or "*" in privileges)
    # except:
    #     return False
#
#
# def check_privilege(view_id):
#     """权限"""
#
#     def __check_privilege(function):
#         @wraps(function)
#         def decorated(*args, **kwargs):
#             if 'username' not in session:
#                 return redirect("/login")
#             u = session["username"]
#             if visitable(u, view_id):
#                 return function(*args, **kwargs)
#             return render_template('login.html', message="抱歉, 您没有访问该页面的权限")
#
#         return decorated
#
#     return __check_privilege
#

def main():
    print validate('admin', 'admin')
    print validate('admin', 'aaaa')
    pass


if __name__ == '__main__':
    reload(sys)
    sys.setdefaultencoding('utf-8')

    main()
