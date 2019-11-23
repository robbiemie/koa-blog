#!/bin/sh
cd /Users/robbie/code/koa/koa-blog/v1/src/log
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log