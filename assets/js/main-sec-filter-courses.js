import {coursesArray} from './main-sec-two-courses.js';
import {containerSelectionMouseOff} from './container-header-two-container-selection.js';
import {containerHeaderIcon, contentIcon, svgHeader, elements, containerHidden} from './container-header-container-hidden.js';

(function() {
    const inputSearch = window.document.getElementsByClassName('container-header__input-search')[0];
    const buttonSearch = window.document.querySelector('.container-header__container-input iframe');
    const sectionFilter = window.document.getElementsByClassName('main-sec-filter-courses')[0];
    const main = window.document.getElementsByTagName('main')[0];
    const courses = coursesArray;
    let countResult = 0, textInputSearchValuePrevious = '';

    setInterval(() => {
        fillButtonSearch();
    }, 0);
    
    function fillButtonSearch() {
        const elementPath = buttonSearch.contentDocument.querySelector('.bi path');
        const elementSvg = buttonSearch.contentDocument.querySelector('.bi-search--cursor');
    
        if(inputSearch.value === '') {
            elementPath.setAttribute('fill', '#7c7c7c');
            elementSvg.setAttribute('style', 'cursor: no-drop;');
            elementSvg.removeEventListener('click', injectSection);
        } else {
            elementPath.setAttribute('fill', '#1C1D1F');
            elementSvg.setAttribute('style', 'cursor: pointer;');
            elementSvg.addEventListener('click', injectSection);
        }
    }

    inputSearch.addEventListener('keypress', (e) => {
        if(e.keyCode === 13) {
            injectSection();
        }
    });

    let textInputSearch = '';
    
    function injectSection(selectOption = String(JSON.parse(localStorage.getItem('valueOption'))) | 1, controlSelectOption = false, valueSelectOption = '1') {
        if(controlSelectOption === false) {
            let valueOption = '1';
            JSON.stringify(valueOption);
            localStorage.setItem('valueOption', valueOption);
            textInputSearch = inputSearch.value;
        }

        if(textInputSearch !== '' && textInputSearch !== textInputSearchValuePrevious || controlSelectOption) {
            countResult = 0;

            for(let i in courses) {
                if(courses[i].title.toLowerCase().includes(String(textInputSearch.toLowerCase()))) {
                    countResult++;
                }
            }

            main.innerHTML = '';
            main.innerHTML = '<img src="assets/img/icon/arrow-clockwise.svg" class="load-arrow" alt="Load">';

            setTimeout(() => {
                main.innerHTML = '';
                main.innerHTML = `<section class="main-sec-filter-courses">
                    <h1>${countResult} resultados para “${textInputSearch}”</h1>
                
                    <div class="main-sec-filter-courses__buttons">
                        <div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                            </svg>Filtro
                            </button>
                        
                            <div>
                                <select name="lista" id="main-sec-filter-courses-button-select">
                                    <option value="1">Mais relevantes</option>
                                    <option value="2">Mais vendidos</option>
                                    <option value="3">Classificação mais alta</option>
                                </select>
                            </div>
                        </div>
                
                        <p>${countResult} resultados</p>
                    </div>
                
                    <div class="main-sec-filter-courses__courses-and-filter">
                        <div>
                            <div>
                                <h4>Classificações</h4>
                
                                <div>
                                    <div>
                                        <input type="radio" name="classification" id="four-five">
                                        <label for="four-five">4,5 e Acima</label>
                                    </div>
                
                                    <div>
                                        <input type="radio" name="classification" id="four-zero">
                                        <label for="four-zero">4,0 e Acima</label>
                                    </div>
                
                                    <div>
                                        <input type="radio" name="classification" id="three-five">
                                        <label for="three-five">3,5 e Acima</label>
                                    </div>
                
                                    <div>
                                        <input type="radio" name="classification" id="three-zero">
                                        <label for="three-zero">3,0 e Acima</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                
                        <div class="container-courses-filter"></div>
                    </div>
                </section>`;

                const containerCoursesFilter = window.document.getElementsByClassName('container-courses-filter')[0];
                window.document.getElementsByClassName('main-sec-filter-courses')[0].addEventListener('mouseenter', () => {
                    containerSelectionMouseOff();

                    for(let i in containerHeaderIcon) {
                        setTimeout(() => {
                            const svgContent = svgHeader[i].contentDocument;
                            const element = svgContent.querySelector('.bi');
                            element.setAttribute('fill', 'black');
                            containerHeaderIcon[i].removeChild(contentIcon);
                        }, 1);
                    }

                    for(let i = 2; i < elements.length; i++) {
                        setTimeout(() => {
                            elements[i].removeChild(containerHidden);
                        }, 1);
                    }
                });

                const arrayCourse = [];

                for(let i in courses) {
                    if(courses[i].title.toLowerCase().includes(String(textInputSearch.toLowerCase()))) {
                        let textClassificationClass;

                        if(courses[i].classification === 'Mais vendidos') {
                            textClassificationClass = 'classification--best-sellers';
                        } else if (courses[i].classification === 'Classificação mais alta') {
                            textClassificationClass = 'classification--highest-rating';
                        } else {
                            textClassificationClass = 'classification--none';
                        }

                        arrayCourse.push({container: generateCourse(), classification: courses[i].classification});
                        function generateCourse() {
                            return `<div>
                                        <div>
                                            <img src="${courses[i].image}" alt="">

                                            <div>
                                                <h3>${courses[i].title}</h3>
                                                <p>${courses[i].createdBy}</p>

                                                <div>
                                                    <p>${courses[i].starNote}</p>
                                                    <p>(${courses[i].popularity})</p>
                                                </div>

                                                <p class="${textClassificationClass}">${courses[i].classification}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p>R$${courses[i].valueMoney}</p>
                                        </div>
                                    </div>`;
                        }
                    }
                }

                const amountArrayCourse = arrayCourse.length;

                for(let i in courses) {
                    if(selectOption === '2') {
                        filterClassificationCourse('Mais vendidos');
                    } else if(selectOption === '3') {
                        filterClassificationCourse('Classificação mais alta');
                    }

                    function filterClassificationCourse(classification) {
                        while(arrayCourse[0].classification !== classification) {
                            arrayCourse.push(arrayCourse[0]);
                            arrayCourse.shift();

                            let countClassification = 0;

                            for(let i in arrayCourse) {
                                if(arrayCourse[i].classification === classification) {
                                    countClassification++;
                                }
                            }

                            if(countClassification === 0) {
                                break;
                            }
                        }

                        setTimeout(() => {
                            for(let j = 0; j < amountArrayCourse; j++) {
                                if(arrayCourse[j].classification === classification && arrayCourse[j].classification !== arrayCourse[j +1].classification) {
                                    arrayCourse.push(arrayCourse[j +1]);
                                    arrayCourse.splice(j +1, 1);
                                }
                            }
                        }, 10);
                    }

                    setTimeout(() => {
                        innerCourse();
                    }, 50);

                    function innerCourse() {
                        containerCoursesFilter.innerHTML += String(arrayCourse[i].container);
                    }
                }

                const buttonFilter = window.document.querySelector('.main-sec-filter-courses__buttons button');
                const containerFilter = window.document.querySelector('.main-sec-filter-courses__courses-and-filter > div:nth-child(1)');
                let controlFilter = JSON.parse(localStorage.getItem('controlFilter'));

                moveContainerFilter(false);

                buttonFilter.addEventListener('click', moveContainerFilter);

                function moveContainerFilter(value = true) {
                    if(value) {
                        controlFilter = !controlFilter;
                        JSON.stringify(controlFilter);
                        localStorage.setItem('controlFilter', controlFilter);
                    }

                    if(controlFilter) {
                        containerFilter.setAttribute('class', value === false?'courses-and-filter--hidden-transition-none':'courses-and-filter--hidden');
                    } else {
                        containerFilter.removeAttribute('class', value === false?'courses-and-filter--hidden-transition-none':'courses-and-filter--hidden');
                    }
                }
            }, 2000);
            
            textInputSearchValuePrevious = textInputSearch;
        }
    }

    
    let valueOption = '1', controlFilterSelect = true;

    setInterval(() => {
        if(window.document.querySelector('main > section').classList.contains('main-sec-filter-courses') && String(window.document.getElementById('main-sec-filter-courses-button-select').value) !== valueOption) {
            let mainFilterButtonSelect = window.document.getElementById('main-sec-filter-courses-button-select');
            
            if(controlFilterSelect) {
                controlFilterSelect = false;

                if(mainFilterButtonSelect.value === '1') {
                    mainFilterButtonSelect.value = String(JSON.parse(localStorage.getItem('valueOption')));
                }
            }
    
            setTimeout(() => {
                if(String(mainFilterButtonSelect.value) !== valueOption) {
                    valueOption = String(mainFilterButtonSelect.value);
    
                    setTimeout(() => {
                        injectSection(String(mainFilterButtonSelect.value), true, String(valueOption));
                    }, 10);
    
                    JSON.stringify(valueOption);
                    localStorage.setItem('valueOption', valueOption);
                    controlFilterSelect = true;
                }
            }, 100);
        }
    }, 0);
})();