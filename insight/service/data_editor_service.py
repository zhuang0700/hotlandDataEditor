#!/usr/bin/python
# -*- coding: utf-8 -*-
from admodels.models import RailwayLine
from insight.util.railway_excel_namemap import railway_namemap

__author__ = 'weiwenliang'
import sys
import json
from insight.dao import data_editor_dao
from pyexcel_xls import get_data
from pyexcel_xls import save_data

def parse_excel(excel_path):
    xls_data = get_data(excel_path)
    sheets = xls_data.keys()
    first_sheet = xls_data[sheets[0]]
    head_line = first_sheet[0]
    head_column_list = parse_head_list(head_line)
    railway_line_list = []
    for data_line in first_sheet[1:]:
        railway_line = convert_data_into_railway(data_line, head_column_list)
        railway_line_list.append(railway_line)
        print(railway_line)


def parse_head_list(head_line):
    head_column_list = []
    for head in head_line:
        head_column_name = railway_namemap.get(head, "")
        head_column_list.append(head_column_name)
    return head_column_list


def convert_data_into_railway(data_line, head_column_list):
    railwayLine = RailwayLine()
    print(data_line)
    print(head_column_list)
    for i, data in enumerate(data_line):
        if i < len(head_column_list):
            column = head_column_list[i]
            if column:
                railwayLine.__setattr__(column, data_line)

    return railwayLine


def main():
    pass


if __name__ == '__main__':
    reload(sys)
    sys.setdefaultencoding('utf-8')

    main()
