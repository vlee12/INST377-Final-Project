function injectHTML(list){
    console.log('fired injectHTML');
    const target = document.querySelector('#genedlist')
    target.innerHTML = '';
    list.forEach((item, index) => {
        const str = `<li>${item.course_id} ${item.name} ${item.credits}</li>`
        target.innerHTML += str
    })
  }


  function filterList(list, values) {
    const newList = []
    return list.filter((item) => {
        values.forEach((value)=> {
            if(item.gen_ed.includes(value)){
                newList.push(item)
            }
        });
        return newList
    })}   

async function mainEvent() {

    const mainForm = document.querySelector('.main_form');
    const loadDataButton = document.querySelector('#search');

    let values = [];

    loadDataButton.addEventListener('click', async (submitEvent) => {
        console.log('Loading Data');
        const results = await fetch('https://api.umd.io/v1/courses');
        const storedList = await results.json();
        let checkboxes = document.querySelectorAll('input[name="type"]:checked');
        checkboxes.forEach((checkbox) => {
            values.push(checkbox.value.toUpperCase())
        });
        injectHTML(storedList)
    });
}    

document.addEventListener('DOMContentLoaded', async () => mainEvent());