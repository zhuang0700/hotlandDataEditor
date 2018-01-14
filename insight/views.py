#!/usr/bin/python
# -*- coding: utf-8 -*-
import datetime
import json
import os

from flask import request, redirect, render_template, make_response, session, jsonify

import user
from config import BEFORE_DAYS
from insight import app, utils
import sys

import pyexcel_xls

from insight.dao import data_editor_dao
from insight.service import data_editor_service

__author__ = 'weiwenliang'


@app.context_processor
def utility_processor():
    return dict(visitable=lambda view_id: user.visitable(session["username"], view_id),
                format_date=utils.format_date)


@app.before_request
def check_login():
    if 'login' in request.path:
        return
    if 'username' not in session:
        return redirect("/login")


@app.route('/')
def index():
    return render_template('index.html', welcome='Welcome ', username=session.get('usernick', "未知用户"))


@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        userinfo = user.validate(username, password)
        if userinfo:
            response = make_response(redirect('/'))
            session['username'] = username
            session['usernick'] = userinfo.nick
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


@app.route("/test/dbtest")
def dbtest():
    user = data_editor_dao.get_by_username_and_password("user","pass")
    print(user)
    return render_template('login.html')


@app.route("/railway/list")
def railway_list():
    railway_list = data_editor_dao.query_railway()
    return render_template('railway_list.html', data_list=railway_list)


@app.route("/api/railway/show_import_data")
def show_import_data():
    filePath = app.config['RAILWAY_EXCEL_UPLOAD_FOLDER']
    railway_list = data_editor_service.parse_excel(os.path.join(filePath, "tempExcel.xlsx"))
    railway_dict = railway_list.__dict__;
    return json.JSONEncoder.encode(railway_dict)


@app.route('/railway/admin/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['excelFile']
        filePath = app.config['RAILWAY_EXCEL_UPLOAD_FOLDER']
        f.save(os.path.join(filePath, "tempExcel.xlsx"))
    return render_template('index.html')


@app.route('/railway/admin/import')
def railway_import():
    data_editor_service.parse_excel("../file/excel/tempExcel.xlsx")
    return render_template('admin/import.html')


# @app.route('/')
# def index():
#    return render_template('index.html', welcome='Welcome')
