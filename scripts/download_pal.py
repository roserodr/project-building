import urllib.request
import os

url = "https://raw.githubusercontent.com/collinsdot/d2pal/master/palettes/Units/pal.dat"
output = "gamedata/pal.dat"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        with open(output, 'wb') as f:
            f.write(response.read())
    print("Downloaded pal.dat")
except Exception as e:
    print("Error:", e)
