import csv
import json
import webcolors
try:
    with open('teamNames.json') as f:
        teams = json.load(f)
except FileNotFoundError:
    print("The file 'teamNames.json' does not exist.")
    exit(1)

for team in teams:
    team["score"] = 0

try:
    with open('2013data.csv', 'r') as f:
        reader = csv.DictReader(f)
        data = list(reader)
except FileNotFoundError:
    print("The file '2013data.csv' does not exist.")
    exit(1)

for item in data:
    if item["homeTeamEdition"] != "Home":
        for team in teams:
            if team["team"] == item["homeTeam"]:
                team["score"] += 2
            
    if item["awayTeamBGColor"] == "#ffffff":
        for team in teams:
            if team["team"] == item["awayTeam"]:
                team["score"] += 2

csvFile = "flairScore13.csv"
try:
    with open(csvFile, "w") as f:
        writer = csv.writer(f)
        writer.writerow(["team", "score"])
        for team in teams:
            writer.writerow([team["team"], team["score"]])
except FileNotFoundError:
    print("The file 'flairScore13.csv' does not exist.")
    exit(1)