import csv
import json
import webcolors

def closest_color(requested_color):
    min_colors = {}
    for key, name in webcolors.CSS3_HEX_TO_NAMES.items():
        r_c, g_c, b_c = webcolors.hex_to_rgb(key)
        rd = (r_c - requested_color[0]) ** 2
        gd = (g_c - requested_color[1]) ** 2
        bd = (b_c - requested_color[2]) ** 2
        min_colors[(rd + gd + bd)] = name
    return min_colors[min(min_colors.keys())]

def get_color_name(requested_color):
    try:
        closest_name = actual_name = webcolors.hex_to_name(requested_color)
    except ValueError:
        closest_name = closest_color(webcolors.hex_to_rgb(requested_color))
    return closest_name

try:
    with open('2013data.csv', newline='') as f:
        reader = csv.DictReader(f)
        data = list(reader)  # Convert the reader object to a list of dictionaries
except FileNotFoundError:
    print("The file '2013data.csv' does not exist.")
    exit(1)

csv_data = []
for event in data:
    try:
        gameDate = event["gameDate"]
        weekDay = event["weekDay"]
        homeTeam = event["homeTeam"]
        homeTeamEdition = event["homeTeamEdition"]
        homeTeamColor = get_color_name(event["homeTeamBGColor"])
        homeTeamHex = event["homeTeamBGColor"]
        awayTeam = event["awayTeam"]
        awayTeamEdition = event["awayTeamEdition"]
        awayTeamColor = get_color_name(event["awayTeamBGColor"])
        awayTeamHex = event["awayTeamBGColor"]
        csv_data.append([gameDate, weekDay, homeTeam, homeTeamEdition, homeTeamColor, homeTeamHex, awayTeam, awayTeamEdition, awayTeamColor, awayTeamHex])
    except KeyError as e:
        print(f"Key {e} not found in the data.")
        continue

headers = ["gameDate", "weekDay", "homeTeam", "homeTeamEdition", "homeTeamColor", "homeTeamHex", "awayTeam", "awayTeamEdition", "awayTeamColor", "awayTeamHex"]

json_data = [dict(zip(headers, row)) for row in csv_data]

json_file_path = "2013data.json"
try:
    with open(json_file_path, mode='w') as file:
        json.dump(json_data, file, indent=4)  # Write the list of dictionaries to a JSON file
except IOError:
    print("Could not write to file '2013data.json'.")
    exit(1)

print(f"JSON file '{json_file_path}' has been created.")