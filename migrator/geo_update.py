import requests
import psycopg2
import time
import json

try:
    import config
except ImportError:
    print("Config file config.py.tmpl needs to be copied over to config.py")
    sys.exit(1)

conn = psycopg2.connect("host=%s dbname=%s user=%s password=%s"
                        % (config.DB_HOST, config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD))

sql = """SELECT id, client_ip, geo FROM abuses WHERE geo is NULL"""
cur = conn.cursor()

cur.execute(sql)
rows = cur.fetchall()

for row in rows:
    r = requests.get("http://ip-api.com/json/{}".format(row[1]))
    geo_dict = r.json()

    geo_json = json.dumps(geo_dict)
    print(geo_json)
    update_sql = """UPDATE abuses SET geo = %s WHERE id = %s"""

    cur.execute(update_sql, (geo_json, row[0],))
    print("executed")
    time.sleep(0.5)

conn.commit()
cur.close()
conn.close()