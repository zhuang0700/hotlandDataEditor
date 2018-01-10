#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import sys

basedir = os.path.abspath(os.path.dirname(__file__))
sys.path.append(basedir + '/../')

from admodels import db

__author__ = "weiwenliang"
__date__ = "17/2/22 下午4:48"


class User(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    nick = db.Column(db.String)
    status = db.Column(db.Integer)


class RailwayLine(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.BigInteger, primary_key=True)
    line_name = db.Column(db.String)
    city = db.Column(db.String)
    city_code = db.Column(db.String)
    train_type = db.Column(db.Integer)
    mileage = db.Column(db.Float)
    max_speed = db.Column(db.Integer)
    marshalling = db.Column(db.Integer)
    marshalling_ext = db.Column(db.String)
    opening_time = db.Column(db.DateTime)
    gmt_modified = db.Column(db.DateTime)
    gmt_created = db.Column(db.DateTime)

    def __repr__(self):
        return 'RailwayLine: (%d %s %s %s %s %d %f %s %s)' % (
            self.id, self.line_name, self.city, self.city_code, self.train_type, self.mileage, self.gmt_created, self.gmt_modified)