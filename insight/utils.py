#!/usr/bin/python
# -*- coding: utf-8 -*-
import time

__author__ = 'weiwenliang'
import os

basedir = os.path.abspath(os.path.dirname(__file__))
import sys

sys.path.append(basedir + '/../')

from datetime import datetime


def format_percent(numerator, denominator):
    numerator = float(numerator)
    denominator = float(denominator)
    if denominator == 0:
        return 'NaN'
    else:
        return u'{0:.2f}%'.format(numerator * 100.0 / denominator)


def format_rate(numerator, denominator):
    numerator = float(numerator)
    denominator = float(denominator)
    if denominator == 0:
        return 'NaN'
    else:
        return u'{0:.2f}%'.format((numerator - denominator) * 100.0 / denominator)


def format_float(numerator, denominator):
    numerator = float(numerator)
    denominator = float(denominator)
    if denominator == 0:
        return 'NaN'
    else:
        return u'{0:.2f}'.format(numerator / denominator)


def format_ecpm(rev, imp):
    rev = float(rev)
    imp = float(imp)
    if imp == 0:
        return '0.0'
    else:
        return u'{0:.2f}'.format(rev * 1000.0 / imp)


def format_big_num(number):
    if not number:
        return 0
    number = float(number)
    if number == 0:
        return '0'
    else:
        return u'{0:.1f}'.format(number * 1.0 / 10000)


def format_float_num(number):
    if not number:
        return 0
    number = float(number)
    if number == 0:
        return '0'
    else:
        return u'{0:.2f}'.format(number)


def format_si_to_yuan(number):
    if not number:
        return 0
    number = long(number)
    if number == 0:
        return '0'
    else:
        return u'{0:.1f}'.format(number / 100000)


def get_chart_media_type(ssp_media_name):
    if ssp_media_name in [u'应用商店', u'一点资讯', u'小米视频', u"浏览器"]:
        return unicode(ssp_media_name)
    return u'其他媒体'


def calc_index(data_a, data_b, calc_func):
    result = dict()
    keys = data_a.keys() + data_b.keys()
    for key in keys:
        result[key] = calc_func(data_a.get(key, 0), data_b.get(key, 0))
    return result


def dicten(plist, keys):
    rdict = {}
    for item in plist:
        rdict[keys(item)] = item
    return rdict


def is_v2_ad(id):
    return id >= 100000000


def today():
    """
    datetime.datetime(y, m, d, 0, 0, 0, 0) != datetime.date(y, m, d)
    :return: return today in datetime type instead of date type
    """
    dt = datetime.now()
    dt = dt.replace(dt.year, dt.month, dt.day, 0, 0, 0, 0)
    return dt


class Timer:
    def __init__(self, title):
        self.title = title
        self.counter = {}
        self.timer = time.time()

    def step(self, name, is_print):
        current = time.time()
        if name not in self.counter:
            self.counter[name] = [current - self.timer, 1]
        else:
            self.counter[name][0] += current - self.timer
            self.counter[name][1] += 1
        if is_print:
            self.print_one(name)
        self.timer = current

    def print_one(self, name):
        print >> sys.stderr, "step [%s].[%s]: use %.2f sec in %d times, %.2f sec average." % (
            self.title, name, self.counter[name][0], self.counter[name][1],
            self.counter[name][0] / self.counter[name][1])

    def print_all(self):
        for name in self.counter.keys():
            self.print_one(name)
