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