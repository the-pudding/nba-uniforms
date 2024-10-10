#!/bin/bash

# Declare an associative array with city names and their respective codes
declare -A codes=( 
    ["Atlanta"]="ATL"
    ["Boston"]="BOS"
    ["Brooklyn"]="BKN"
    ["Charlotte"]="CHA"
    ["Chicago"]="CHI"
    ["Cleveland"]="CLE"
    ["Dallas"]="DAL"
    ["Denver"]="DEN"
    ["Detroit"]="DET"
    ["Golden-State"]="GSW"
    ["Houston"]="HOU"
    ["Indiana"]="IND"
    ["LA-Clippers"]="LAC"
    ["LA-Lakers"]="LAL"
    ["Memphis"]="MEM"
    ["Miami"]="MIA"
    ["Milwaukee"]="MIL"
    ["Minnesota"]="MIN"
    ["New-Orleans"]="NOP"
    ["New-York"]="NYK"
    ["Oklahoma-City"]="OKC"
    ["Orlando"]="ORL"
    ["Philadelphia"]="PHI"
    ["Phoenix"]="PHX"
    ["Portland"]="POR"
    ["Sacramento"]="SAC"
    ["San-Antonio"]="SAS"
    ["Toronto"]="TOR"
    ["Utah"]="UTA"
    ["Washington"]="WAS"
)

# Loop through all files in the current directory
for file in *; do
    # For each city in the associative array, replace it with its code
    for city in "${!codes[@]}"; do
        # If the filename contains the city name
        if [[ "$file" == *"$city"* ]]; then
            # Construct the new filename by replacing the city name with its code
            newfile="${file//$city/${codes[$city]}}"
            echo "Renaming '$file' to '$newfile'"
            mv "$file" "$newfile"
        fi
    done
done
