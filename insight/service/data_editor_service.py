#!/usr/bin/python
# -*- coding: utf-8 -*-
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
    head_column_list = parse_head_list()
    print(head_column_list)


def parse_head_list(head_line):
    head_column_list = []
    for head in head_line:
        head_column_name = railway_namemap.get(head, "")
        head_column_list.append(head_column_name)
    return head_column_list


def main():
    pass


if __name__ == '__main__':
    reload(sys)
    sys.setdefaultencoding('utf-8')

    main()
