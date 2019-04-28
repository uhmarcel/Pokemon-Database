import Pokedex from 'pokedex-promise-v2';

export function getID(url) {    
    const urlTokens = url.split("/");
    const id = urlTokens[urlTokens.length - 2];
    return id;
}

export function getImageByID(id) {
    const rawUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    return rawUrl + id + '.png';
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1)
}

export function getEntryText(flavor) {
    for (let i=0; i<flavor.length; i++) {
        if (flavor[i].language.name === "en")
            return flavor[i].flavor_text
    }
}

export function processEvolutions(evolutionAPI) {
    let base = {
        name: evolutionAPI.species.name,
        imgurl: getImageByID(getID(evolutionAPI.species.url))
    }
    let evolutions = [];
    let currentNode = evolutionAPI.evolves_to;
    while (currentNode[0]) {
        evolutions.push({
            name: currentNode[0].species.name,
            imgurl: getImageByID(getID(currentNode[0].species.url)),
            atLvl: currentNode[0].evolution_details[0].min_level
        });
        currentNode = currentNode[0].evolves_to;
    }
    return { base, evolutions };
}

export function getTypeColor(type) {
    switch (type) {
        case 'normal':   return '#BDBDAE';
        case 'poison':   return '#AC5DA3';
        case 'psychic':  return '#FA65B5';
        case 'grass':    return '#8DD850';
        case 'ground':   return '#EDCB56';
        case 'ice':      return '#97F1FF';
        case 'fire':     return '#FA5441';
        case 'rock':     return '#CEBD73';
        case 'dragon':   return '#8474FE';
        case 'water':    return '#55AFFF';
        case 'bug':      return '#C2D21A';
        case 'dark':     return '#8F6955';
        case 'fighting': return '#7F4440';
        case 'ghost':    return '#7B76D8';
        case 'steel':    return '#C4C2DB';
        case 'flying':   return '#7AA5FF';
        case 'electric': return '#FDE63C';
        case 'fairy':    return '#F9AEFF';
        default:         return '#E9ECEF';
    }
}

export function filterNonLvlup(moves) {
    let filtered = [];
    
    for (let i=0; i<moves.length; i++) {
        let lvl = -1;
        for (let j=0; j<moves[i].version_group_details.length; j++) {
            if (moves[i].version_group_details[j].move_learn_method.name === 'level-up') {
                lvl = moves[i].version_group_details[j].level_learned_at;
                break;
            }
        }
        if (lvl === -1)
            continue;
        const name = moves[i].move.name;
        const url = moves[i].move.url;
        filtered.push({name, lvl, url});
    }
    return filtered;
}


export async function processMoves(moves) {
    let p = new Pokedex({protocol: 'https'});
    
    let filtered = filterNonLvlup(moves);
    let promises = filtered.map( m => p.resource(m.url) );
    let response = await Promise.all(promises);
    let processed = [];

    for (let i=0; i<filtered.length; i++) {
        processed.push({
            name: filtered[i].name,
            lvl: filtered[i].lvl,
            accuracy: response[i].accuracy,
            class: response[i].damage_class.name,
            power: response[i].power,
            type: response[i].type.name
        })
    }    
    processed.sort((a,b) => (a.lvl > b.lvl) ? 1 : -1);
    return processed;
}


export function processTypes(types) {
    let processed = types.sort( (a,b) =>
        a.slot > b.slot ? 1 : -1
    )
    return processed
}
export function formatName(name) {
    let out = name.charAt(0).toUpperCase();
    for (let i=1; i<name.length; i++) {
        if (name.charAt(i) === '-') {
            out += " " + name.charAt(i+1).toUpperCase();
            i++; 
        }
        else {
            out += name.charAt(i);
        }
    }
    return out;
}