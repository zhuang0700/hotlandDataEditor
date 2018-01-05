#!/bin/sh


for pid in  `ps aux | grep "gunicorn" | grep "run:app" | grep -v "grep" | awk '{print $2}'`
do
    echo $pid
    kill -9 $pid
done
