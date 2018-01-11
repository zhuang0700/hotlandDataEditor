#!/bin/sh

# chmod +x run.py
# ./run.py runserver -h0.0.0.0 -p9527 -d 1>log.out 2>log.err &


gunicorn --access-logfile ./access.log -w 1 -b 0.0.0.0:80 -t 600 run:app 1>log.out 2>log.err &
