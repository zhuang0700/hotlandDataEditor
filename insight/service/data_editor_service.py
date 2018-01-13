#!/usr/bin/python
# -*- coding: utf-8 -*-

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
    print(first_sheet)


def main():
    pass


if __name__ == '__main__':
    reload(sys)
    sys.setdefaultencoding('utf-8')

    main()
