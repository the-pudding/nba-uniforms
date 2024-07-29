import csv
import json
import webcolors
try:
    with open('rawData.json') as f:
        data = json.load(f)
except FileNotFoundError:
    print("The file 'rawData.json' does not exist.")
    exit(1)

teamNames = []
for item in data:
    for event in item["games"]:
        if event["homeTeam"] not in teamNames:
            teamNames.append(event["homeTeam"])
        if event["awayTeam"] not in teamNames:
            teamNames.append(event["awayTeam"])

teamNamesJson = []
for team in teamNames:
    teamNamesJson.append({"team": team})
teamNamesJsonFile = "teamNames.json"

try:
    with open(teamNamesJsonFile, "w") as f:
        json.dump(teamNamesJson, f)
except FileNotFoundError:
    print("The file 'teamNames.json' does not exist.")
    exit(1)
