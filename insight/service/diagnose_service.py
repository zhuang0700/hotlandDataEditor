#!/usr/bin/python
# -*- coding: utf-8 -*-
from diagnose import direction_age, direction_media, direction_interest, direction_city, direction_network, \
    direction_time, direction_sex, direction_app_behave
from operation_record.optype import get_op_by_display_type, OpType, get_op

__author__ = 'weiwenliang'
import sys
import json
from insight.dao import data_editor_dao

import insight.enum_helper as Emum
import datetime
import types
from http_service import request_emi

#
# def get_history_by_creative_id(creative_id, before_day):
#     ads_deliver_info = diagnose_dao.get_history_by_creative_id(creative_id, before_day)
#     return ads_deliver_info


def get_base_info(creative_id):
    base_info = {}
    ad_creative = data_editor_dao.get_creative_by_id(creative_id)
    return [dict(ad_id=ad_creative.id, ad_name=ad_creative.name)]


def main():
    pass


if __name__ == '__main__':
    reload(sys)
    sys.setdefaultencoding('utf-8')

    main()
