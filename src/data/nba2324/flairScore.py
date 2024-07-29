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
    with open('rawData.json') as f:
        data = json.load(f)
except FileNotFoundError:
    print("The file 'rawData.json' does not exist.")
    exit(1)

for item in data:
    for event in item["games"]:
        if event["homeTeamEdition"] == "City Edition":
            for team in teams:
                if team["team"] == event["homeTeam"]:
                    team["score"] += 3
        else:
            if event["homeTeamEdition"] != "Association Edition":
                for team in teams:
                    if team["team"] == event["homeTeam"]:
                        team["score"] += 2
                        
        if event["awayTeamEdition"] == "City Edition":
            for team in teams:
                if team["team"] == event["awayTeam"]:
                    team["score"] += 3
        else:
            if event["awayTeamBGColor"] == "#ffffff":
                for team in teams:
                    if team["team"] == event["awayTeam"]:
                        team["score"] += 2

csvFile = "flairScore.csv"
try:
    with open(csvFile, "w") as f:
        writer = csv.writer(f)
        writer.writerow(["team", "score"])
        for team in teams:
            writer.writerow([team["team"], team["score"]])
except FileNotFoundError:
    print("The file 'flairScore.csv' does not exist.")
    exit(1)