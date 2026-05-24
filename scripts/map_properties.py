import zipfile
import csv
import io
import json

def read_txt(zip_path, file_path):
    with zipfile.ZipFile(zip_path, 'r') as z:
        with z.open(file_path, 'r') as f:
            content = f.read().decode('utf-8-sig', errors='replace')
            reader = csv.DictReader(io.StringIO(content), delimiter='\t')
            return list(reader)

isc = read_txt('gamedata.zip', 'gamedata/pd2data/excel/ItemStatCost.txt')

for p in isc[:20]:
    print(p.get('Stat'), p.get('descstrpos'))
