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

hexes = []
for item in data:
    try:
        for event in item["games"]:
            homeTeamHex = event["homeTeamBGColor"]
            if homeTeamHex not in hexes:
                hexes.append(homeTeamHex)
    except KeyError as e:
        print(f"Key {e} not found in the data.")
        continue

# Write the hexes to a CSV file
csv_file_path = "colorlist.csv"
try:
    with open(csv_file_path, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["hex", "name"])
        writer.writerows([[hex, get_color_name(hex)] for hex in hexes])
        print(f"CSV file '{csv_file_path}' has been created.")
except Exception as e:
    print(f"An error occurred: {e}")