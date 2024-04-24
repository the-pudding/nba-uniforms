import csv
import json
import webcolors

try:
    with open('rawData.json') as f:
        data = json.load(f)
except FileNotFoundError:
    print("The file 'rawData.json' does not exist.")
    exit(1)

csv_data = []
for item in data:
    try:
        gameDate = item["gameDate"]
        weekDay = item["weekDay"]
        for event in item["games"]:
            homeTeam = event["homeTeam"]
            homeTeamEdition = event["homeTeamEdition"]
            homeTeamColor = 'tk'
            homeTeamHex = event["homeTeamBGColor"]
            awayTeam = event["awayTeam"]
            awayTeamEdition = event["awayTeamEdition"]
            awayTeamColor = 'tk'
            awayTeamHex = event["awayTeamBGColor"]
            csv_data.append([gameDate, weekDay, homeTeam, homeTeamEdition, homeTeamColor, homeTeamHex, awayTeam, awayTeamEdition, awayTeamColor, awayTeamHex])
    except KeyError as e:
        print(f"Key {e} not found in the data.")
        continue

csv_file_path = "output.csv"
try:
    with open(csv_file_path, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["gameDate", "weekDay", "homeTeam", "homeTeamEdition", "homeTeamColor", "homeTeamHex", "awayTeam", "awayTeamEdition", "awayTeamColor", "awayTeamHex"])
        writer.writerows(csv_data)
except IOError:
    print("Could not write to file 'output.csv'.")
    exit(1)

print(f"CSV file '{csv_file_path}' has been created.")