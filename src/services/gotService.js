export default class GotService {

    constructor () {
      this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
  
  
    getResource = async (url) => {   //и использовать апибэйс можно в методе фетч
      const res = await fetch(`${this._apiBase}${url}`); //для выполнения этой операции за знаком равно необходимо какое-то время
  
      if (!res.ok) { //у нашего ответа сервера (res) есть метод ок. Означает, что мы хоть что-то получили,  а не ошибку.
        throw new Error(`Could not fetch ${url},status - ${res.status}`);
      }
  
      return await res.json();
    }
  
    getAllCharacters = async() => {
      const res = await this.getResource('/characters?page=5&pageSize=10');
      return res.map(this._transformCharacter);
    }
    //напишем функцию, которая будет находить определенного персонажа по какому-то ид. Путь к ид надо узнать из документации.
    getCharacter = async(id) => {
      const character = await this.getResource(`/characters/${id}`);
      return this._transformCharacter(character);
      }
    
      getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
        }
    
      getBook = async (id) =>{
        const book = await this.getResource(`/books/${id}`);
          return this._transformBook(book);
      }

      getAllHouses = async() => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
      }
    
      getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformBook(house);
      }

      _extractId = (item) => {
        const igRegExp = /\/([0-9]*)$/;
        return item.url.match(igRegExp)[1];
      }

      _transformCharacter (char) {
      
        for (let key in char) {
          if (char[key] == '') {
            char[key]= 'n/a'
          }
         
        }
        return {
          name: char.name,
          gender: char.gender,
          born: char.born,
          died: char.died,
          culture: char.culture
        }
      }

      _transformHouse(house) {
        return {
          name: house.name,
          region: house.region,
          words: house.words,
          titles: house.titles,
          overlord: house.overlord,
          ancestralWeapons: house.ancestralWeapons,
        }
      }

      _transformBook(book) {
        return {
          name: book.name,
          numberOfPages: book.numberOfPages,
          publiser: book.publiser,
          released: book.released,
        }
      }
  }
  
