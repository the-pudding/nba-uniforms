import csv
import json
import webcolors
try:
    with open('teamNames.json') as f:
        teams = json.load(f)
except FileNotFoundError:
    print("The file 'teamNames.json' does not exist.")
    exit(1)

# Add a new property to each team in 'teams' with a key of 'score' and a value of '0'
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
        # If home team's homeTeamEdition is 'City Edition', add 3 to that team's score
        if event["homeTeamEdition"] == "City Edition":
            for team in teams:
                if team["team"] == event["homeTeam"]:
                    team["score"] += 3
        else:
            if event["homeTeamEdition"] != "Association Edition":
                for team in teams:
                    if team["team"] == event["homeTeam"]:
                        team["score"] += 2
        
        # If away team's homeTeamEdition is 'City Edition', add 3 to that team's score
        if event["awayTeamEdition"] == "City Edition":
            for team in teams:
                if team["team"] == event["awayTeam"]:
                    team["score"] += 3
        else:
            if event["awayTeamBGColor"] == "#ffffff":
                for team in teams:
                    if team["team"] == event["awayTeam"]:
                        team["score"] += 2

# Write a new CSV file called "traditionalScore" with our teams JSON file
csvFile = "traditionalScore.csv"
try:
    with open(csvFile, "w") as f:
        writer = csv.writer(f)
        writer.writerow(["team", "score"])
        for team in teams:
            writer.writerow([team["team"], team["score"]])
except FileNotFoundError:
    print("The file 'traditionalScore.csv' does not exist.")
    exit(1)