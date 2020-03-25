function Cat(name, src) {
    this.name = name
    this.src = src
    this.count = 0
    this.hasEventListener = false
}
Cat.prototype.createCatToShow = function() {
    let newLi = document.createElement('li')
    let container = document.createElement('div')
    container.className = 'cat-container'
    let name = document.createElement('span')
    name.textContent = this.name
    container.appendChild(name)
    let image = document.createElement('img')
    image.src = this.src
    image.style.width = '100%'
    container.appendChild(image)
    newLi.appendChild(container)
    this.catToShow = newLi
}
Cat.prototype.createImage = function() {
    let image = document.createElement('img')
    image.src = this.src
    image.id = 'cat-to-show'
    this.image = image
}

function Shower() {
    this.nameToShow = document.querySelector('#name-to-show')
    this.imageToShow = document.querySelector('.cat-image')
    this.counterToShow = document.querySelector('.counter')
    this.showerAside = document.querySelector('.list-of-cats')
}
Shower.prototype.showCat = function(catObj) {
    this.nameToShow.textContent = catObj.name
    if (this.imageToShow.childElementCount > 0) {
        this.imageToShow.firstElementChild.remove()
    }
    this.counterToShow.textContent = catObj.count
    let obj = this
    function count() {
        catObj.count++
        obj.counterToShow.textContent = catObj.count
    }
    if (!catObj.hasEventListener) {
        catObj.image.addEventListener('click', count)
        catObj.hasEventListener = true
    }
    catObj.image.style.width = 'inherit'
    catObj.image.style.height = 'inherit'
    this.imageToShow.appendChild(catObj.image)
}

function Viewer() {
    this.listOfCats = []
    this.shower = new Shower()
    this.dates  = {cat1: {name: 'Floppy', 
                        source: 'img/cat.jpg'},
                cat2: {name: 'Mr. happy', 
                        source: 'img/cat2.jpg'},
                cat3: {name: 'Sweetness', 
                        source: 'img/cat3.jpg'},
                cat4: {name: 'Browny', 
                        source: 'img/cat4.jpg'},
                cat5: {name: 'Dunny', 
                        source: 'img/cat5.jpg'}}
}
Viewer.prototype.createCats = function() {
    for (let n = 1; n <= 5; n++) {
        this.listOfCats.push(new Cat(this.dates['cat' + n]['name'], this.dates['cat' + n]['source']))
    }
    for (let index = 0; index < this.listOfCats.length; index++) {
        this.listOfCats[index].createCatToShow()
        this.listOfCats[index].createImage()
    }
}
Viewer.prototype.showCatsAside = function() {
    for (let index = 0; index < this.listOfCats.length; index++) {
        let catToShow = this.listOfCats[index].catToShow
        let obj = this
        catToShow.addEventListener('click', function(event) {
            if (event.target.nodeName === 'SPAN' || event.target.nodeName === 'IMG') {
                obj.shower.showCat(obj.listOfCats[index])
            }
        })
        this.shower.showerAside.appendChild(catToShow)
    }
}

let viewer = new Viewer()
viewer.createCats()
viewer.showCatsAside()