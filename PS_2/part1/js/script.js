const datetimeBtn = document.querySelector('.time-interval__btn');
const fon = document.querySelectorAll('.fon')
const fonBtn = document.querySelectorAll('.fon_btn')
const content = document.querySelectorAll('.content')
datetimeBtn.addEventListener('click', () => {
    const datetimeFirst = new Date(document.querySelector('.time-interval__field-1').value)
    const datetimeSecond = new Date(document.querySelector('.time-interval__field-2').value)
    let re = datetimeSecond - datetimeFirst
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
 content[2].innerHTML =`<p>${year}:${month}:${day}:${hour}:${minute}</p>`
    fon[2].style.transform = 'translate(0,0)'
   
});

const sumNumberBtn = document.querySelector('.sum-number__btn');
sumNumberBtn.addEventListener('click', () => {
    let numberFirst = document.querySelector('.sum-number__field-1').value
    const numberSecond = document.querySelector('.sum-number__field-2').value
    let sum = 0
    const reg = new RegExp("[273]$")
    while(+numberFirst <= +numberSecond) {
        if(reg.test(numberFirst)){
            sum += +numberFirst
        }
        +numberFirst++
    }
     content[0].innerHTML =`<p>${sum}</p>`
    fon[0].style.transform = 'translate(0,0)'
   
});

const translateTimeBtn = document.querySelector('.translate-time__btn');
translateTimeBtn.addEventListener("click", () => {
    let timeValue = document.querySelector('.translate-time__field').value
    const reg1 = /^\d+s$/
    const reg2 = /^\d{2}:{1}\d{2}:{1}\d{2}$/
    let hour = 0
    let minute = 0
    let sec = 0

    if(reg1.test(timeValue)){
        timeValue = parseInt(timeValue.substring(0, timeValue.length))
        while(timeValue > 0) {
           if(timeValue >= 3600){
                hour++
                timeValue = timeValue - 3600            
           } else if(timeValue >= 60){
                minute++
                timeValue = timeValue - 60
           } else {
               sec = timeValue
               timeValue = 0
           }
        }
        content[1].innerHTML =`<p>${hour}:${minute}:${sec}</p>`

    } else if(reg2.test(timeValue)){
        let masTime = timeValue.split(':')
        if(parseInt(masTime[0]) > 0){
            sec += parseInt(masTime[0]) * 3600
        } 
        
        if (parseInt(masTime[1]) > 0) {
            sec += parseInt(masTime[1]) * 60
        }

        if(parseInt(masTime[2]) > 0){
            sec += parseInt(masTime[2])
        }
        content[1].innerHTML =`<p>${sec}s</p>`
    }
    fon[1].style.transform = 'translate(0,0)'
});
const answer = document.querySelector('.answer')
const checkIpLinkBtn = document.querySelector('.check-ip-link__btn');
const c = document.querySelector('.wrp-answer')
checkIpLinkBtn.addEventListener('click', () => {
    const regIp = /(((1[0-9]{2})|(2[0-4]{1}\d{1})|(25[0-5])|\d{1}|\d{2})\.){3}((1[0-9]{2})|(2[0-4]{1}\d{1})|(25[0-5])|\d{1}|\d{2})/g
    const regLink = /((http|https):\/{2}(\w+\.)+[a-z]+((\/{0,1})((\w+\W\w+)+|\w+){0,}(\/{0,1}))*)/g
    const ipLink = document.querySelector('.check-ip-link__field').value
    let regMas;
    let masLink = []
    while((regMas = regLink.exec(ipLink)) !== null){
        masLink.push(regMas[0])
    }
    while((regMas = regIp.exec(ipLink)) !== null){
        masLink.push(regMas[0])
    }

    masLink.sort()
    let str = '<ul>'
    for(let i of masLink){
        str += `<li>${i}</li>`
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
    const regText = new RegExp(document.querySelector('.text-check__field').value, 'g')
    let str = '<p>'
    let index = 0
    let strAlt = document.querySelector('.text-check__textarea').value
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

    document.querySelector('.answer_btn').addEventListener('click', () => {
        c.style.opacity = '0'
        c.style.zIndex = '-1'
    })
})

document.querySelector('.chessboard__btn').addEventListener('click', () => {
    let masSize = document.querySelector('.chessboard__field').value.split('x')
    if(/\d+x\d+/.test(document.querySelector('.chessboard__field').value)){
        let str = '<table>'
        for(let i = 0; i < masSize[0]; i++){
            str +='<tr>'
            for(let j = 0; j < masSize[1]; j++){
                str += '<th></th>'
            }
            str += '</tr>'
        }
        fon[3].style.transform = 'translate(0,0)'
        str += `</table><button type="button" class="answer_btn">Close</button>`
        answer.innerHTML = str
        document.querySelector('.answer_btn').addEventListener('click', () => {
            c.style.opacity = '0'
            c.style.zIndex = '-1'
        })
    }
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