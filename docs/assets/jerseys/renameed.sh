#!/bin/bash

# Declare an associative array with edition names
declare -A codes=( 
    ["home"]="association"
    ["away"]="icon"
)

# Loop through all files in the current directory
for file in *; do
    # For each edition in the associative array, replace it with its code
    for edition in "${!codes[@]}"; do
        # If the filename contains the edition name
        if [[ "$file" == *"$edition"* ]]; then
            # Construct the new filename by replacing the edition name with its code
            newfile="${file//$edition/${codes[$edition]}}"
            echo "Renaming '$file' to '$newfile'"
            mv "$file" "$newfile"
        fi
    done
done
