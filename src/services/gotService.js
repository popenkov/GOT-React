export default class GotService {

    constructor () {
      this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
  
  
    async getResource(url){   //и использовать апибэйс можно в методе фетч
      const res = await fetch(`${this._apiBase}${url}`); //для выполнения этой операции за знаком равно необходимо какое-то время
  
      if (!res.ok) { //у нашего ответа сервера (res) есть метод ок. Означает, что мы хоть что-то получили,  а не ошибку.
        throw new Error(`Could not fetch ${url},status - ${res.status}`);
      }
  
      return await res.json();
    }
  
    async getAllCharacters() {
      const result = await this.getResource('/characters?page=5&pageSize=10');
      return result.map(this._transformCharacter);
    }
    //напишем функцию, которая будет находить определенного персонажа по какому-то ид. Путь к ид надо узнать из документации.
    async getCharacter(id) {
      const character = await this.getResource(`/characters/${id}`);
      return this._transformCharacter(character);
      }
    
      getAllBooks() {
        return this.getResource('/books');
      }
    
      getBook(id){
          return this.getResource(`/books/${id}`);
      }

      getAllHouses() {
        return this.getResource('/houses');
      }
    
      getHouse(id){
          return this.getResource(`/houses/${id}`);
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
  
