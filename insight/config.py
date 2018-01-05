#!/usr/bin/python
# -*- coding: utf-8 -*-
import socket

__author__ = 'weiwenliang'
import os
basedir = os.path.abspath(os.path.dirname(__file__))

CSRF_ENABLED = True
SECRET_KEY = 'you-will-never-guess'


STAGING = {
    'host': '115.28.153.88',
    'port': 3306,
    'user': 'root',
    'pwd': 'zhuang0700',
    'db': 'data_editor'
}

DB_CFG = STAGING

SQLALCHEMY_DATABASE_URI = 'mysql://%s:%s@%s:%d/%s?charset=utf8' % (DB_CFG['user'], DB_CFG['pwd'],
                                                      DB_CFG['host'], DB_CFG['port'],
                                                      DB_CFG['db'])
SQLALCHEMY_RECORD_QUERIES = True
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_IS_AUTOCOMMIT = True
# slow database query threshold (in seconds)
DATABASE_QUERY_TIMEOUT = 0.5


# pagination
POSTS_PER_PAGE = 50
MAX_SEARCH_RESULTS = 50

# const
BEFORE_DAYS = 90
TOP_APP_NUMS = 150