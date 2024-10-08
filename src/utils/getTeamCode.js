import teamNames from "$data/nba2324/teamNames.json";

export default function getTeamCode(teamName) {
    const teamCode = teamNames.find((team) => team.team === teamName)?.code;
    if (!teamCode) {
        throw new Error(`Team name "${teamName}" is not found`);
    }
    return teamCode;
}