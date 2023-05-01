
function injectHTML(list){
    console.log('fired injectHTML');
    const target = document.querySelector('#building_list')
    target.innerHTML = '';
    list.forEach((item, index) => {
        const str = `<li>${item.name}</li>`
        target.innerHTML += str
    })
  }
  
  function filterList(list, query) {
    return list.filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery);
    })
  }

  function initMap(){
    const carto = L.map('map').setView([38.99, -76.945], 14.4);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(carto);
    return carto;
  }

  function markerPlace(array, map){
    console.log('array for markers', array);
    
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          layer.remove();
        }
      });
    
    array.forEach((item) => {
        console.log('markerPlace', item);

        const mark = L.marker([parseFloat(item.lat), parseFloat(item.long)])
        mark.bindPopup(JSON.stringify(item.name)).openPopup();
        mark.addTo(map);

      });
    }
  
  async function mainEvent() { 
    const mainForm = document.querySelector('.main_form');
    
    const textField = document.querySelector('#build');
    const filterDataButton = document.querySelector('#filter')
    const radio = document.querySelector('input[type=radio]')
  
    const carto = initMap();

    const storedData = localStorage.getItem('storedData');
    let parsedData = JSON.parse(storedData);

    let currentList = []; 
    let values = [];

    const results = await fetch('https://api.umd.io/v1/map/buildings');

    const storedList = await results.json();
    localStorage.setItem('storedData', JSON.stringify(storedList));
    parsedData = storedList;
  
    filterDataButton.addEventListener('click', (event) => {
      console.log('clicked FilterButton');
      
      const checkboxes = document.querySelectorAll('input[name="type"]:checked');
      checkboxes.forEach((radio) => {
        values.push(radio.value)});

      const formData = new FormData(mainForm);
      const formProps = Object.fromEntries(formData);
  
      console.log(formProps)
      const newList = filterList(storedList, formProps.build);
  
      console.log(newList);
      injectHTML(newList);
      markerPlace(newList, carto);

      if (values.length > 0){
        console.log(values)
        const newList = filterList(storedList, formProps.type);
        console.log(newList);
        injectHTML(newList);
        markerPlace(newList, carto);
        values.length = 0;
        console.log(values);
      }
      else{
        const newList = filterList(storedList, formProps.build);
        console.log(newList);
        injectHTML(newList);
        markerPlace(newList, carto);
      }
    })
  }
  

  document.addEventListener('DOMContentLoaded', async () => mainEvent()); 