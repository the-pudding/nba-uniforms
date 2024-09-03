import { geoDistance } from "d3";

export default function findClosestPoint(targetCoord, coordList) {
    let closestCoord = null;
    let shortestDistance = Infinity;

    coordList.forEach(coord => {
        const distance = geoDistance([targetCoord.lon, targetCoord.lat], [coord.lon, coord.lat]);
        if (distance < shortestDistance) {
            shortestDistance = distance;
            closestCoord = coord;
        }
    });

    return closestCoord;
}