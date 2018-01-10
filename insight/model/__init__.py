#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

__author__ = "RuanYongliu"
__date__ = "2017/8/29 上午11:16"


app = Flask(__name__)
app.config.from_object('config')

db = SQLAlchemy(app)

autocommit = app.config.get("SQLALCHEMY_IS_AUTOCOMMIT")
session = scoped_session(sessionmaker(autoflush=True,
                                      autocommit=False if autocommit is None else bool(autocommit),
                                      bind=create_engine(app.config.get('SQLALCHEMY_DATABASE_URI'))))
