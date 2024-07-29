import csv
import json
import webcolors
try:
    with open('rawData.json') as f:
        data = json.load(f)
except FileNotFoundError:
    print("The file 'rawData.json' does not exist.")
    exit(1)

# Get every possible team name
teamNames = []
for item in data:
    for event in item["games"]:
        # Append the home and away team names only if the name does not already exist in teamNames
        if event["homeTeam"] not in teamNames:
            teamNames.append(event["homeTeam"])
        if event["awayTeam"] not in teamNames:
            teamNames.append(event["awayTeam"])

# Create a json file with the team names, where for each team name is the value and the key is "team"
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
