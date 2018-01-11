#!/usr/bin/python
# -*- coding: utf-8 -*-
__author__ = 'weiwenliang'
import os
basedir = os.path.abspath(os.path.dirname(__file__))
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
sys.path.append(basedir + '/../')
from insight import app


def main():
    app.run(host='0.0.0.0', port=9527, debug=True, use_reloader=False)


if __name__ == '__main__':
    main()

