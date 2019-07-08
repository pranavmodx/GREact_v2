import json

with open('backend/main/fixtures/gredata.json', 'r') as f:
    data = json.load(f)

with open('backend/main/fixtures/data.json', 'w') as f:
    rlist = []
    for i in range(1, len(data)+1):
        for k,v in data[i-1].items():
            k.lower()
        new_dict = {
            "pk": f'{i}',
            "model": 'main.WordData',
            "fields": {k.lower(): v for k, v in data[i-1].items()}
        }
        rlist.append(new_dict)
    json.dump(rlist, f)
