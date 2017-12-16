#!/usr/bin/python
# -*- coding: utf-8 -*-

# Import modules for CGI handling 
import cgi, cgitb;
import pymysql;
import json; 


arguments = cgi.FieldStorage();

# MySQL Connection 연결
conn = pymysql.connect(host='localhost', user='root', password='root',
                       db='yelp_db', charset='utf8');
 
# Connection 으로부터 Cursor 생성
curs = conn.cursor();
 
# SQL문 실행
sql = "select latitude,longitude from business limit " + arguments["offset"].value + ", " + arguments["count"].value; 
#sql = arguments["query"];

curs.execute(sql);
 
# 데이타 Fetch
rows = curs.fetchall();
#print(rows)     # 전체 rows
# print(rows[0])  # 첫번째 row: (1, '김정수', 1, '서울')
# print(rows[1])  # 두번째 row: (2, '강수정', 2, '서울') 
# Connection 닫기
conn.close();

#print json.dumps(rows);


print 'Content-Type: application/json\n\n'
print json.dumps(rows)    

'''
print """
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
"""
print "<ul>"
for row in rows:
	print "<li> review %s: %s </li>" % (row[0], row[1]);
print "</ul>"

print """
    </body>
</html>
""";
'''