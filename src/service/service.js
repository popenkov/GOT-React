class GotService {

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
  
    getAllCharacters() {
      return this.getResource('/characters?page=5&pageSize=10')
    }
    //напишем функцию, которая будет находить определенного персонажа по какому-то ид. Путь к ид надо узнать из документации.
    getCharacter(id) {
        return this.getResource(`/characters/${id}`)
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
  }
  
  const got = new GotService();
  got.getAllCharacters()
    .then((res) => (res.forEach(item => {
      console.log(item.name);
    })
    )); // но это не особо правильно, ткак как каждый раз будет вызываться функция? повторяться участок кода с текстом ссылки. (поэтому создаю конструктор выше.)
    
  got.getCharacter(130)
    .then((res) => console.log(res));