#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys

railway_namemap = {
    u"线路": "line_name",
    u"里程（km）": "mileage",
    u"车型及编组": "marshalling_ext",
    u"最高运行速度": "max_speed",
    u"开通时间": "open_time",
    u"备注": "remark"
}

def main():
    pass


if __name__ == '__main__':
    reload(sys)
    sys.setdefaultencoding('utf-8')

    main()
