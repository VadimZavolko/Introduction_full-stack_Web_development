const datetimeBtn = document.querySelector('.time-interval__btn');
const fon = document.querySelectorAll('.fon')
const fonBtn = document.querySelectorAll('.fon_btn')
const content = document.querySelectorAll('.content')
const zeroYear = 1970;
const zeroTime = 3;
const zeroDay = 1;
datetimeBtn.addEventListener('click', () => {
    let datetimeFirst = new Date(document.querySelector('.time-interval__field-1').value)
    let datetimeSecond = new Date(document.querySelector('.time-interval__field-2').value)
    if (datetimeFirst > datetimeSecond) {
        let dateCopy = datetimeSecond;
        datetimeSecond = datetimeFirst;
        datetimeFirst = dateCopy;
    }
    
    let re = datetimeSecond.getTime() - datetimeFirst.getTime();
    let year = 0
    let month = 0
    let day = 0
    let hour = 0
    let minute = 0
    while(re > 0){
        if(re >= 31536000000) {
            re -= 31536000000 
            year++;
        } else if(re >= 2592000000) {
            re -= 2592000000
            month++
        } else if (re >= 86400000){
            re -= 86400000
            day++
        } else if(re >= 3600000) {
            re -= 3600000
            hour++
        } else if (re >= 60000 ) {
            re -= 60000
            minute++
        }
        };
        content[2].innerHTML =`<p>${year} year(s), ${month} month(s), ${day} day(s), ${hour} hour(s), ${minute} minute(s)</p>`
    fon[2].style.transform = 'translate(0,0)'
});

const sumNumberBtn = document.querySelector('.sum-number__btn');
sumNumberBtn.addEventListener('click', () => {
    const numberFirst = document.querySelector('.sum-number__field-1').value
    const numberSecond = document.querySelector('.sum-number__field-2').value
    let sum = 0
    const reg = new RegExp("[273]$")
    const regNumber = new RegExp("^[0-9]|(\d+\.\d+)$")  
    if(regNumber.test(numberFirst) && regNumber.test(numberSecond)){
        let x1 = parseInt(numberFirst);
        let x2 = parseInt(numberSecond);
        if(x1 > x2){
            let copy = x2;
            x2 = x1;
            x1 = copy;
        }

        while(x1 <= x2) {
            if(reg.test(''+x1)){
                sum += x1;
            }
            x1++;
        }
        content[0].innerHTML =`<p>${sum}</p>`
    }else {
        content[0].innerHTML = '<p>Number entered incorrectly</p>'
    } 
    fon[0].style.transform = 'translate(0,0)'
   
});

const translateTimeBtn = document.querySelector('.translate-time__btn');
const hourInSeconds = 3600;
const minuteInSeconds = 60
translateTimeBtn.addEventListener("click", () => {
    let timeValue = document.querySelector('.translate-time__field').value
    const reg1 = /^\d+s$/
    const reg2 = /^\d+:([0-5][0-9]):([0-5][0-9])$/
    let hour = 0
    let minute = 0
    let sec = 0

    if(reg1.test(timeValue)){
        timeValue = parseInt(timeValue.substring(0, timeValue.length))
        while(timeValue > 0) {
           if(timeValue >= hourInSeconds){
                hour++
                timeValue = timeValue - hourInSeconds            
           } else if(timeValue >= minuteInSeconds){
                minute++
                timeValue = timeValue - minuteInSeconds
           } else {
               sec = timeValue
               timeValue = 0
           }
        }
        content[1].innerHTML =`<p>${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(sec).padStart(2, '0')}</p>`

    } else if(reg2.test(timeValue)){
        let masTime = timeValue.split(':')
        if(parseInt(masTime[0]) > 0){
            sec += parseInt(masTime[0]) * hourInSeconds
        } 
        
        if (parseInt(masTime[1]) > 0) {
            sec += parseInt(masTime[1]) * minuteInSeconds
        }

        if(parseInt(masTime[2]) > 0){
            sec += parseInt(masTime[2])
        }
        content[1].innerHTML =`<p>${sec}s</p>`

    } else {
        content[1].innerHTML =`<p>Incorrect input</p>`
    }
     
    fon[1].style.transform = 'translate(0,0)'
});
const answer = document.querySelector('.answer')
const checkIpLinkBtn = document.querySelector('.check-ip-link__btn');
const c = document.querySelector('.wrp-answer')
checkIpLinkBtn.addEventListener('click', () => {
    const regIp = /((((1[0-9]{2})|(2[0-4]{1}\d{1})|(25[0-5])|\d{1}|\d{2})\.){3}((1[0-9]{2})|(2[0-4]{1}\d{1})|(25[0-5])|\d{1}|\d{2}))(,?)/g
    const regIpv6 = /([0-9ABCDEFabcdef]{4}:[0-9ABCDEFabcdef]{4}:[0-9ABCDEFabcdef]{4}:[0-9ABCDEFabcdef]{4}:[0-9ABCDEFabcdef]{4}:[0-9ABCDEFabcdef]{4}:[0-9ABCDEFabcdef]{4}:[0-9ABCDEFabcdef]{4})(,?)/g
    const regLink = /(((http|https):\/{2}(\w+\.)+[a-z]+((\/{0,1})((\w+\W\w+)+|\w+){0,}(\/{0,1}))*))(,?)/g
    let reg = /(((http|https):\/{2}(\w+\.)+[a-z]+((\/{0,1})((\w+\W\w+)+|\w+){0,}(\/{0,1}))*))/
    const ipLink = document.querySelector('.check-ip-link__field').value
    let regMas;
    let masLink = []
    while((regMas = regLink.exec(ipLink)) !== null){
        masLink.push(regMas[0])
    }
    while((regMas = regIp.exec(ipLink)) !== null){
        masLink.push(regMas[0])
    }
    while((regMas = regIpv6.exec(ipLink)) !== null){
        masLink.push(regMas[0])
    }

    masLink.sort()
    let str = '<ul>'
    for(let i of masLink){
        if(reg.test(i)){
            let masHTTP = i.split(/((http|https):\/{2})/) 
            str += `<li><a href="${i.replace(',', "")}" target="_blank">${masHTTP[3].replace(',', "")}</a></li>`
        } else {
            str += `<li>${i.replace(',', "")}</li>`
        }
    }
    str += '</ul><button type="button" class="answer_btn">Close</button>'
    fon[4].style.transform = 'translate(0,0)'
    answer.innerHTML = str
    
    document.querySelector('.answer_btn').addEventListener('click', () => {
        c.style.opacity = '0'
        c.style.zIndex = '-1'
    })
})

document.querySelector('.text-check__btn').addEventListener('click', () => {
    const regText = new RegExp(document.querySelector('.text-check__field').value, 'g');
    let str = '<p>';
    let index = 0; 
    let strAlt = document.querySelector('.text-check__textarea').value;
    if(strAlt.length > 0){
    while((regMas = regText.exec(strAlt)) !== null){
        str += strAlt.substring(index, regText.lastIndex - regMas[0].length)
        index = regText.lastIndex
        str += `<mark>${regMas[0]}</mark>`
    }

    if(index < strAlt.length)
        str += strAlt.substring(index, strAlt.length)

    str += `<\p><button type="button" class="answer_btn">Close</button>`
    fon[5].style.transform = 'translate(0,0)'
    answer.innerHTML = str
    }
    document.querySelector('.answer_btn').addEventListener('click', () => {
        c.style.opacity = '0'
        c.style.zIndex = '-1'
    })
})

document.querySelector('.chessboard__btn').addEventListener('click', () => {
    let masSize = document.querySelector('.chessboard__field').value.split(/x|X|х|Х/);
    let kw = Number(masSize[1]) > Number(masSize[0])?masSize[1]:masSize[0];
    const reg = /\d+(x|X|х|Х)\d+/;
    if(reg.test(document.querySelector('.chessboard__field').value)){
        let str = `<table style="width:calc((65%/${kw})*${masSize[0]});
         height:calc((80%/${kw})*${masSize[1]})">`
        for(let i = 0; i < masSize[1]; i++){
            str +=`<tr>`
            for(let j = 0; j < masSize[0]; j++){
                str += `<th ></th>`
            }
            str += '</tr>'
        }
       
        str += `</table><button type="button" class="answer_btn">Close</button>`
        answer.innerHTML = str   
    } else {
        answer.innerHTML = `<p>Incorrect input</p>`
    }

    fon[3].style.transform = 'translate(0,0)';
    document.querySelector('.answer_btn').addEventListener('click', () => {
        c.style.opacity = '0'
        c.style.zIndex = '-1'
    })
})

fonBtn[0].addEventListener('click', () => {
    fon[0].style.transform = 'translate(-100%,0)'
})

fonBtn[1].addEventListener('click', () => {
    fon[1].style.transform = 'translate(-100%,0)'
})

fonBtn[2].addEventListener('click', () => {
    fon[2].style.transform = 'translate(-100%,0)'
})

fonBtn[3].addEventListener('click', () => {
    c.style.opacity = '1'
    c.style.zIndex = '10'
})

fonBtn[4].addEventListener('click', () => {
    fon[3].style.transform = 'translate(-100%,0)'
})

fonBtn[6].addEventListener('click', () => {
    fon[4].style.transform = 'translate(-100%,0)'
})

fonBtn[7].addEventListener('click', () => {
    c.style.opacity = '1'
    c.style.zIndex = '10'
})

fonBtn[8].addEventListener('click', () => {
    fon[5].style.transform = 'translate(-100%,0)'
})

fonBtn[5].addEventListener('click', () => {
    c.style.opacity = '1'
    c.style.zIndex = '10'
})