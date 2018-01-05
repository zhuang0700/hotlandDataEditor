#!/usr/bin/python
# -*- coding: utf-8 -*-
import datetime
import json

from flask import request, redirect, render_template, make_response, session, jsonify

import user
from config import BEFORE_DAYS
from insight import app, utils
import sys

import flask_excel as excel
import pyexcel_xls


__author__ = 'weiwenliang'


@app.context_processor
def utility_processor():
    return dict(format_percent=utils.format_percent,
                format_ecpm=utils.format_ecpm,
                format_big_num=utils.format_big_num,
                format_float=utils.format_float,
                format_float_num=utils.format_float_num,
                format_rate=utils.format_rate,
                format_si_to_yuan=utils.format_si_to_yuan,
                visitable=lambda view_id: user.visitable(session["username"], view_id))


@app.before_request
def check_login():
    if 'login' in request.path:
        return
    if 'username' not in session:
        return redirect("/login")


@app.route('/')
def index():
    return render_template('index.html', welcome='Welcome ', username=session['username'])


@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if user.validate(username, password):
            response = make_response(redirect('/'))
            session['username'] = username
            return response
        else:
            message = u'账号或密码错误'
            return render_template('login.html', message=message)
    else:
        return render_template('login.html')


@app.route("/logout")
def logout():
    session.pop("username")
    return redirect("/login")


# @app.route('/')
# def index():
#    return render_template('index.html', welcome='Welcome')
