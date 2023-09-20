class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=146a61f23481294db9ee4159c628cc14'


    getResource = async (url) => {
        let res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json()
    }
    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(this._getCharacterObj)
    }
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._getCharacterObj(res.data.results[0])
    }

    _getCharacterObj = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService