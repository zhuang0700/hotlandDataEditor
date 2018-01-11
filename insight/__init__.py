#!/usr/bin/python
# -*- coding: utf-8 -*-
import socket

import datetime

from insight.config import BEFORE_DAYS
from insight.utils import Timer

__author__ = 'weiwenliang'
import os
import sys

basedir = os.path.abspath(os.path.dirname(__file__))
sys.path.append(basedir + '/../')


from flask import Flask
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from flask_moment import Moment
from flask import Blueprint
import threading


app = Flask(__name__)
app.config.from_object('config')
app.config['RAILWAY_EXCEL_UPLOAD_FOLDER'] = os.path.join(basedir, '../file/excel/')

bootstrap = Bootstrap(app)
moment = Moment(app)
db = SQLAlchemy(app)

# engine = create_engine(app.config.get('SQLALCHEMY_DATABASE_URI'))
# Session = sessionmaker(bind=engine)
# session = Session(autoflush=False)

from insight import views

print >> sys.stderr, "start app success"
