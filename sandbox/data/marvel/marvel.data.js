// only with pure configuration it's easy to replicate graphs such as
// http://bl.ocks.org/eesur/be2abfb3155a38be4de4 using react-d3-graph
module.exports = {
    links: [
        // Groups
        {
            source: "Marvel",
            target: "Heroes",
        },
        {
            source: "Marvel",
            target: "Villains",
        },
        {
            source: "Marvel",
            target: "Teams",
        },
        // Heroes
        {
            source: "Heroes",
            target: "Spider-Man",
        },
        {
            source: "Heroes",
            target: "CAPTAIN MARVEL",
        },
        {
            source: "Heroes",
            target: "HULK",
        },
        {
            source: "Heroes",
            target: "Black Widow",
        },
        {
            source: "Heroes",
            target: "Daredevil",
        },
        {
            source: "Heroes",
            target: "Wolverine",
        },
        {
            source: "Heroes",
            target: "Captain America",
        },
        {
            source: "Heroes",
            target: "Iron Man",
        },
        {
            source: "Heroes",
            target: "THOR",
        },
        // Villains
        {
            source: "Villains",
            target: "Dr. Doom",
        },
        {
            source: "Villains",
            target: "Mystique",
        },
        {
            source: "Villains",
            target: "Red Skull",
        },
        {
            source: "Villains",
            target: "Ronan",
        },
        {
            source: "Villains",
            target: "Magneto",
        },
        {
            source: "Villains",
            target: "Thanos",
        },
        {
            source: "Villains",
            target: "Black Cat",
        },
        // Teams
        {
            source: "Teams",
            target: "Avengers",
        },
        {
            source: "Teams",
            target: "Guardians of the Galaxy",
        },
        {
            source: "Teams",
            target: "Defenders",
        },
        {
            source: "Teams",
            target: "X-Men",
        },
        {
            source: "Teams",
            target: "Fantastic Four",
        },
        {
            source: "Teams",
            target: "Inhumans",
        },
    ],
    nodes: [
        // Groups
        {
            id: "Marvel",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/marvel.png",
            size: 500,
            fontSize: 18,
        },
        {
            id: "Heroes",
            symbolType: "circle",
            color: "red",
            size: 300,
        },
        {
            id: "Villains",
            symbolType: "circle",
            color: "red",
            size: 300,
        },
        {
            id: "Teams",
            symbolType: "circle",
            color: "red",
            size: 300,
        },
        // Heroes
        {
            id: "Spider-Man",
            name: "Peter Benjamin Parker",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_spiderman.png",
            size: 400,
        },
        {
            id: "CAPTAIN MARVEL",
            name: "Carol Danvers",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_captainmarvel.png",
            size: 400,
        },
        {
            id: "HULK",
            name: "Robert Bruce Banner",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png",
            size: 400,
        },
        {
            id: "Black Widow",
            name: "Natasha Alianovna Romanova",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_blackwidow.png",
            size: 400,
        },
        {
            id: "Daredevil",
            name: "Matthew Michael Murdock",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_daredevil.png",
            size: 400,
        },
        {
            id: "Wolverine",
            name: "James Howlett",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_wolverine.png",
            size: 400,
        },
        {
            id: "Captain America",
            name: "Steven Rogers",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_captainamerica.png",
            size: 400,
        },
        {
            id: "Iron Man",
            name: "Tony Stark",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_ironman.png",
            size: 400,
        },
        {
            id: "THOR",
            name: "Thor Odinson",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_thor.png",
            size: 400,
        },
        // Villains
        {
            id: "Dr. Doom",
            name: "Victor von Doom",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/drdoom.png",
            size: 400,
        },
        {
            id: "Mystique",
            name: "Unrevealed",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/mystique.png",
            size: 400,
        },
        {
            id: "Red Skull",
            name: "Johann Shmidt",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/redskull.png",
            size: 400,
        },
        {
            id: "Ronan",
            name: "Ronan",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/ronan.png",
            size: 400,
        },
        {
            id: "Magneto",
            name: "Max Eisenhardt",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/magneto.png",
            size: 400,
        },
        {
            id: "Thanos",
            name: "Thanos",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/thanos.png",
            size: 400,
        },
        {
            id: "Black Cat",
            name: "Felicia Hardy",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/blackcat.png",
            size: 400,
        },
        // Teams
        {
            id: "Avengers",
            name: "",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/avengers.png",
            size: 400,
        },
        {
            id: "Guardians of the Galaxy",
            name: "",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/gofgalaxy.png",
            size: 400,
        },
        {
            id: "Defenders",
            name: "",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/defenders.png",
            size: 400,
        },
        {
            id: "X-Men",
            name: "",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/xmen.png",
            size: 400,
        },
        {
            id: "Fantastic Four",
            name: "",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/fantasticfour.png",
            size: 400,
        },
        {
            id: "Inhumans",
            name: "",
            svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/inhumans.png",
            size: 400,
        },
    ],
};
