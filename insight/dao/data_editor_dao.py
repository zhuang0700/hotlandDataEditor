#!/usr/bin/python
# -*- coding: utf-8 -*-

from admodels.models import User, RailwayLine

__author__ = 'weiwenliang'
import sys
from admodels import session
from sqlalchemy import func
from sqlalchemy import or_


# def get_history_by_creative_id(creative_id, before_day):
#     ad_data = diagnose_session.query(EffectiveAdRealtime.date,
#                             (func.sum(EffectiveAdRealtime.num)).label('num')) \
#         .filter(EffectiveAdRealtime.date >= before_day) \
#         .filter(EffectiveAdRealtime.ad_creative_id == creative_id).all()
#
#     return ad_data


def get_by_username_and_password(username, password):
    user = session.query(User.id.label('id'),
                         User.nick.label('nick'),
                         User.username.label('username'),
                         User.status.label('status')
                         ).filter(User.username == username).filter(User.password == password).filter(User.status > 0).first()
    return user


def query_railway(id="", city_code="", train_type=0, marshalling=0, line_name=""):
    railway_query = session.query(RailwayLine)
    if id:
        railway_query = railway_query.filter(RailwayLine.id==id)
    if city_code:
        railway_query = railway_query.filter(RailwayLine.city_code==city_code)
    if train_type:
        railway_query = railway_query.filter(RailwayLine.train_type==train_type)
    if marshalling:
        railway_query = railway_query.filter(RailwayLine.marshalling==marshalling)
    if line_name:
        railway_query = railway_query.filter(RailwayLine.line_name==line_name)

    return railway_query.all()


def main():
    user = get_by_username_and_password("a","a")
    print("user test:", user)


if __name__ == '__main__':
    reload(sys)
    sys.setdefaultencoding('utf-8')
    main()
