from pymongo import MongoClient
import psycopg2

try:
    import config
except ImportError:
    print("Config file config.py.tmpl needs to be copied over to config.py")
    sys.exit(1)

conn = psycopg2.connect("host=%s dbname=%s user=%s password=%s"
                        % (config.DB_HOST, config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD))

client = MongoClient()
db = client.mysticpaste
pastes = db.pastes

# paste = pastes.find_one()

print "Pastes to import: %d" % pastes.count()

sql = """INSERT INTO pastes (id, content, abuse, language, client_ip, view_count, created_at, updated_at) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"""
cur = conn.cursor()

for paste in pastes.find():
    viewCount = 0
    clientIp = ''
    if 'viewCount' in paste:
        viewCount = paste['viewCount']
    if 'clientIp' in paste:
        clientIp = paste['clientIp']

    # pprint.pprint(paste)
    cur.execute(sql, (paste['itemId'], paste['content'], paste['abuseCount'] > 0, paste['type'], clientIp, viewCount, paste['timestamp'], paste['timestamp']))

conn.commit()
cur.close()
conn.close()