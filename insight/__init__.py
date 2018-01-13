#!/usr/bin/python
# -*- coding: utf-8 -*-
import socket

import datetime

from insight.config import BEFORE_DAYS
from insight.util import Timer

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

<<<<<<< HEAD
=======
# app.jinja_env.add_extension("chartkick.ext.charts")

>>>>>>> 7f56121d1d1eacedccef210c0d0cfe6213cd8a62
from insight import views

print >> sys.stderr, "start app success"
