import csv
import json

def read_txt(file_path):
    with open(file_path, 'r', encoding='utf-8-sig', errors='replace') as f:
        reader = csv.DictReader(f, delimiter='\t')
        return list(reader)

isc = read_txt('gamedata/pd2data/excel/ItemStatCost.txt')

for p in isc[:20]:
    print(p.get('Stat'), p.get('descstrpos'))
