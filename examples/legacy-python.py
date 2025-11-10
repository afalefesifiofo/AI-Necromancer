# Legacy Python 2.7 code

import urllib2
import json

def fetch_data(url):
    response = urllib2.urlopen(url)
    data = response.read()
    return json.loads(data)

def process_users():
    users = fetch_data('http://api.example.com/users')
    
    for user in users:
        print "User: %s" % user['name']
        print "Email: %s" % user['email']
        
        if user.has_key('age'):
            print "Age: %d" % user['age']
        
        print "---"

if __name__ == '__main__':
    process_users()
