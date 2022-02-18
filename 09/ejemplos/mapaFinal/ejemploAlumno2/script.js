let locations, map, polygonArray = []

function start(){
    fetch('eurovision_venues.json')
        .then(function(response){
            return response.json()
        })
        .then(function(json){
            locations = json

            setMap()

            document.getElementById('make-polygon').addEventListener('click', createPolygon)

            for (let country of locations)
                createCard(country)
        })
        .catch(function(){
            document.getElementById('file-input').classList.remove('d-none')
            document.getElementById('main-menu').classList.add('d-none')
            document.getElementById('map').classList.add('d-none')
            document.getElementById('file-input').addEventListener('change', fileProcessing)
        })
}

function setPage() {
    document.getElementById('file-input').classList.add('d-none')

    setMap()

    for (let country of locations)
        createCard(country)

    document.getElementById('make-polygon').addEventListener('click', createPolygon)

    document.getElementById('main-menu').classList.remove('d-none')
    document.getElementById('map').classList.remove('d-none')
}

function fileProcessing(e){
    let file = e.target.files[0];

    if (!file)
        return

    let reader = new FileReader()
    reader.onload = function(e) {
        locations = JSON.parse(e.target.result)
        setPage()
    }
    reader.readAsText(file)
}

function createCard(country) {
    let card = document.createElement('div'),
        header = document.createElement('div'),
        h2 = document.createElement('h2'),
        button = document.createElement('button'),
        collapse = document.createElement('div'),
        cBody = createCardContent(country)

    button.classList.add('btn', 'btn-link', 'text-secondary', 'collapsed')
    button.type = 'button'
    button.dataset.toggle = 'collapse'
    button.dataset.target = '#collapse-' + country.country.replace(' ','-').toLowerCase()
    button.innerHTML = `${country.country} <img src="img/${country.img}" />`

    h2.classList.add('mb-0')
    h2.appendChild(button)

    header.classList.add('card-header')
    header.id = 'heading-' + country.country.replace(' ','-').toLowerCase()
    header.appendChild(h2)

    collapse.classList.add('collapse')
    collapse.dataset.parent = '#main-menu'
    collapse.id = 'collapse-' + country.country.replace(' ','-').toLowerCase()
    collapse.appendChild(cBody)

    card.classList.add('card')
    card.append(header, collapse)

    document.getElementById('main-menu').appendChild(card)
}

function createCardContent(country) {
    let content = document.createElement('div')

    content.classList.add('card-body')

    for (let city of country.cities){
        let title = document.createElement('h5'),
            hr = document.createElement('hr')
        title.innerHTML = city.name
        content.appendChild(title)

        for (let venue of city.venues){
            let venueCont = document.createElement('div'),
                name = document.createElement('h6'),
                coor = document.createElement('p'),
                years = document.createElement('p'),
                marker = setMarker(country, city, venue),
                checkbox = document.createElement('input')

            venueCont.classList.add('venue-cont')

            name.innerText = venue.name
            coor.innerText = venue.coor.toString()
            years.innerText = venue.years.toString()

            venueCont.append(name, coor, years)
            content.appendChild(venueCont)

            checkbox.type = 'checkbox'
            checkbox.name = 'marker'
            checkbox.classList.add('corner')
            checkbox.value = venue.coor.toString()

            checkbox.addEventListener('click', checkBox, true)

            venueCont.appendChild(checkbox)

            venueCont.addEventListener('click', function () {
                marker.togglePopup()

                if (marker.isPopupOpen()){
                    marker.bounce(3)
                    map.flyTo(venue.coor, 12)
                }
                else
                    map.flyTo([53.5775, 23.106111], 4)
            })

        }

        if (country.cities.indexOf(city) != country.cities.length-1)
            content.appendChild(hr)
    }

    return content
}

function setMap(){
    map = L.map('map').setView([53.5775, 23.106111], 4)

    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=PbU5ax1HVDlVZ45dMbEm', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map)

}

function setMarker(country, city, venue) {
    let popup, marker

    popup = L.popup({minWidth: 200}).setContent(`<p>${city.name}</p><p>${venue.name}</p>
                                        <img class="popup-img" src="img/${venue.img?venue.img:'image-not-available.png'}">
                                        <p>${venue.years.toString()}</p>`)

    marker = L.marker(venue.coor, {
        icon: L.icon({
            iconUrl: `img/${country.img}`,
            iconSize: [30,31],
            iconAnchor: [15,30],
            popupAnchor: [0,-20]
        }),
        riseOnHover: true,
        title: venue.name
    }).addTo(map)
        .bindPopup(popup)

    return marker
}

function checkBox(e){

    e.stopPropagation()

    let checkBoxes = document.querySelectorAll('input[type="checkbox"]'),
        selected = false

    for (let i = 0; i < checkBoxes.length; i++){
        let coor = checkBoxes[i].value.split(',')

        coor[0] = parseFloat(coor[0])
        coor[1] = parseFloat(coor[1])

        if (checkBoxes[i].checked){
            selected = true

            if (!polygonArray.find( (e) => e[0] == coor[0] && e[1] == coor[1] ))
                polygonArray.push(coor)
        } else {
            let index = polygonArray.findIndex( (e) => e[0] == coor[0] && e[1] == coor[1] )
            if (index != -1)
                polygonArray.splice(coor, 1)
        }
    }

    if (selected)
        document.getElementById('make-polygon').style.top = '50px'
    else
        document.getElementById('make-polygon').style.top = '-50px'

    if (polygonArray.length > 3)
        sortCoordinates()

}

function sortCoordinates(){
    polygonArray.sort( (a, b) => a[1] - b[1] )
    let upperArr = [], lowerArr = [], reference = polygonArray[0]

    for (let point of polygonArray){
        if ( isOverLine(polygonArray[0], polygonArray[polygonArray.length-1], point) )
            upperArr.push(point)
        else
            lowerArr.unshift(point)
    }

    polygonArray = upperArr.concat(lowerArr)

    console.log(polygonArray)
}

function isOverLine(origin, destiny, point) {
    let slope = (destiny[0] - origin[0]) / (destiny[1] - origin[1]),
        intercept = origin[0] - slope * origin[1],
        supossedY = slope * point[1] + intercept

    return point[0] >= supossedY

}

function createPolygon(){

    let polygonName = window.prompt('Nombre del polígono', 'Nuevo polígono')

    let polygon = L.polygon(polygonArray, {
        color: randomColor(),
        noClip: true
    }).addTo(map)
        .bindTooltip(polygonName)

    console.log(polygon)

    map.flyToBounds(polygon.getBounds())

    addToMenu(polygonName, polygon)

    let checkBoxes = document.querySelectorAll('input[type="checkbox"]')

    for (let checkbox of checkBoxes)
        checkbox.checked = false

    polygonArray = []

    document.getElementById('make-polygon').style.top = '-50px'
}

function addToMenu(name, polygon) {
    let cont = document.createElement('div'),
        h6 = document.createElement('h6'),
        button = document.createElement('button'),
        hr = document.createElement('hr'),
        p = document.createElement('p')

    h6.innerText = name
    h6.classList.add('polygon-title')

    button.classList.add('btn', 'btn-danger', 'btn-sm', 'corner')
    button.innerText = 'X'

    p.innerText = 'Marcadores: ' + polygonArray.length

    cont.append(h6, p, button)
    cont.classList.add('position-relative')

    if (!document.getElementById('polygon-card'))
        createPolygonCard()
    else
        document.getElementById('polygon-menu-body').appendChild(hr)

    h6.addEventListener('click', function () {
        if (polygon._map){
            polygon.remove()
            map.flyTo([53.5775, 23.106111], 4)
        }
        else{
            polygon.addTo(map)
            map.fitBounds(polygon.getBounds())
        }
    })

    document.getElementById('polygon-menu-body').appendChild(cont)

    button.addEventListener('click', function () {
        if (window.confirm('¿Borrar polígono?')){
            cont.remove()
            polygon.remove()
            map.flyTo([53.5775, 23.106111], 4)
        }
    })

}

function randomColor(){
    let color, colorHexa = '#';
    for (let i=1; i<=6; i++){
        color = Math.floor(Math.random()*16);
        colorHexa += color.toString(16);
    }
    return colorHexa.toUpperCase();
}

function createPolygonCard(){
    let card = document.createElement('div'),
        header = document.createElement('div'),
        h2 = document.createElement('h2'),
        button = document.createElement('button'),
        collapse = document.createElement('div'),
        cBody = document.createElement('div')

    button.classList.add('btn', 'btn-link', 'text-info', 'collapsed')
    button.type = 'button'
    button.dataset.toggle = 'collapse'
    button.dataset.target = '#collapse-polygon'
    button.innerHTML = 'Polígonos'

    h2.classList.add('mb-0')
    h2.appendChild(button)

    header.classList.add('card-header')
    header.id = 'heading-polygon'
    header.appendChild(h2)

    cBody.classList.add('card-body')
    cBody.id = 'polygon-menu-body'

    collapse.classList.add('collapse')
    collapse.dataset.parent = '#main-menu'
    collapse.id = 'collapse-polygon'
    collapse.appendChild(cBody)

    card.classList.add('card')
    card.id = 'polygon-card'
    card.append(header, collapse)

    document.getElementById('main-menu').appendChild(card)
}

window.onload = start