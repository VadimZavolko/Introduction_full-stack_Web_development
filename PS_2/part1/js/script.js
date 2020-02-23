const datetimeBtn = document.querySelector('.time-interval__btn');
const fon = document.querySelectorAll('.fon');
const fonBtn = document.querySelectorAll('.fon_btn');
const content = document.querySelectorAll('.content');
const monthInYear = 12;
const dayInMonth = 31;
const hourInDay = 24;
const minuteInHour = 60;
const secondsInMinute = 60;
//Time lapse calculation
datetimeBtn.addEventListener('click', () => {
    let datetimeFirst = new Date(document.querySelector('.time-interval__field-1').value)
    let datetimeSecond = new Date(document.querySelector('.time-interval__field-2').value)
    if (datetimeFirst > datetimeSecond) {
        [datetimeFirst, datetimeSecond] = [datetimeSecond, datetimeFirst]
    }
    //date calculation
    let year = datetimeSecond.getFullYear() - datetimeFirst.getFullYear();
    let month = Math.abs(datetimeSecond.getMonth() - datetimeFirst.getMonth());
    let day = Math.abs(datetimeSecond.getDate() - datetimeFirst.getDate());
    let hour = Math.abs(datetimeSecond.getHours() - datetimeFirst.getHours());
    let minute = Math.abs(datetimeSecond.getMinutes() - datetimeFirst.getMinutes());
    let sec = Math.abs(datetimeSecond.getSeconds() - datetimeFirst.getSeconds());
    let masDate = [{date: year, cof: 0}, {date: month, cof: monthInYear}, {date: day, cof: dayInMonth}, {date: hour, cof: hourInDay}, 
        {date: minute, cof: minuteInHour}, {date: sec, cof: secondsInMinute}];
    //date difference calculation
    if(datetimeSecond.getMonth() < datetimeFirst.getMonth()){
        corectDate(0, masDate);
        masDate[1].date = masDate[1].cof - masDate[1].date;
    }
    if(datetimeSecond.getDate() < datetimeFirst.getDate()){
        corectDate(1, masDate);
        masDate[2].date = masDate[2].cof - masDate[2].date;
    }
    if(datetimeSecond.getHours() < datetimeFirst.getHours()){
        corectDate(2, masDate);
        masDate[3].date = masDate[3].cof - masDate[3].date;
    }
    if(datetimeSecond.getMinutes() < datetimeFirst.getMinutes()){
        corectDate(3, masDate);
        masDate[4].date = masDate[4].cof - masDate[4].date;
    }
    if(datetimeSecond.getSeconds() < datetimeFirst.getSeconds()){
        corectDate(4, masDate);
        masDate[5].date = masDate[5].cof - masDate[5].date;
    }
    //output result
    content[2].innerHTML =`<p>${masDate[0].date} year(s), ${masDate[1].date} month(s), ${masDate[2].date} day(s), ${masDate[3].date} hour(s), ${masDate[4].date} minute(s), ${masDate[5].date} second(s)</p>`;
    //move the block with the answer
    fon[2].style.transform = 'translate(0,0)'
});

const corectDate = (index, mas) => {
    if(mas[index].date === 0){
        mas[index].date = index !== 0 ? mas[index].cof : mas[index].date;
        if(index !== 0){
            if(mas[index - 1].date === 0){
                corectDate(index - 1, mas);
            } else {
                mas[index - 1].date--;
            }
        }
    }
    mas[index].date--; 
}

//sum of number spacing
const sumNumberBtn = document.querySelector('.sum-number__btn');
sumNumberBtn.addEventListener('click', () => {
    const numberFirst = document.querySelector('.sum-number__field-1').value;
    const numberSecond = document.querySelector('.sum-number__field-2').value;
    let sum = 0;
    //regular for finding numbers ending in 7 2 3
    const reg = new RegExp("[273]$");
    const regNumber = new RegExp("^(-?)[0-9]|(\d+\.\d+)$");
    if(regNumber.test(numberFirst) && regNumber.test(numberSecond)){
        let x1 = parseInt(numberFirst);
        let x2 = parseInt(numberSecond);
        if(x1 > x2){
            [x1, x2] = [x2, x1]
        }

        //calc sum
        while(x1 <= x2) {
            if(reg.test(''+x1)){
                sum += x1;
            }
            x1++;
        }
        //output result
        content[0].innerHTML =`<p>${sum}</p>`;
    } else {
        content[0].innerHTML = '<p>Number entered incorrectly</p>';
    }
    //move the block with the answer
    fon[0].style.transform = 'translate(0,0)';
   
});

const translateTimeBtn = document.querySelector('.translate-time__btn');
const hourInSeconds = 3600;
const minuteInSeconds = 60;
//translate of time
translateTimeBtn.addEventListener("click", () => {
    let timeValue = document.querySelector('.translate-time__field').value;
    //time in seconds
    const reg1 = /^\d+s$/;
    //hh:mm:ss
    const reg2 = /^\d+:([0-5][0-9]):([0-5][0-9])$/;
    let hour = 0;
    let minute = 0;
    let sec = 0;

    if(reg1.test(timeValue)){
        timeValue = parseInt(timeValue.substring(0, timeValue.length))
        //translate of hh:mm:ss
        while(timeValue > 0) {
           if(timeValue >= hourInSeconds){
                hour++;
                timeValue = timeValue - hourInSeconds;            
           } else if(timeValue >= minuteInSeconds){
                minute++;
                timeValue = timeValue - minuteInSeconds;
           } else {
               sec = timeValue;
               timeValue = 0;
           }
        }
        //output result
        content[1].innerHTML =`<p>${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(sec).padStart(2, '0')}</p>`;
    } else if(reg2.test(timeValue)){
        //translate of seconds
        let masTime = timeValue.split(':')
        if(parseInt(masTime[0]) > 0){
            sec += parseInt(masTime[0]) * hourInSeconds;
        } 
        
        if (parseInt(masTime[1]) > 0) {
            sec += parseInt(masTime[1]) * minuteInSeconds;
        }

        if(parseInt(masTime[2]) > 0){
            sec += parseInt(masTime[2]);
        }
        content[1].innerHTML =`<p>${sec}s</p>`;

    } else {
        //output result
        content[1].innerHTML =`<p>Incorrect input</p>`;
    }
    //move the block with the answer
    fon[1].style.transform = 'translate(0,0)';
});

const answer = document.querySelector('.answer');
const checkIpLinkBtn = document.querySelector('.check-ip-link__btn');
//content in answer
const c = document.querySelector('.wrp-answer');
//check ip and link
checkIpLinkBtn.addEventListener('click', () => {
    //ip
    const regIp = /((((1[0-9]{2})|(2[0-4]{1}\d{1})|(25[0-5])|\d{1}|\d{2})\.){3}((1[0-9]{2})|(2[0-4]{1}\d{1})|(25[0-5])|\d{1}|\d{2}))(,?)/g;
    //ipv6
    const regIpv6 = /([0-9ABCDEFabcdef]{4}:[0-9ABCDEFabcdef]{4}:[0-9ABCDEFabcdef]{4}:[0-9ABCDEFabcdef]{4}:[0-9ABCDEFabcdef]{4}:[0-9ABCDEFabcdef]{4}:[0-9ABCDEFabcdef]{4}:[0-9ABCDEFabcdef]{4})(,?)/g;
    //link
    const regLink = /(((http|https):\/{2}(\w+\.)+[a-z]+((\/{0,1})((\w+\W\w+)+|\w+){0,}(\/{0,1}))*))(,?)/g;
    //Regular check that this is a link
    let reg = /(((http|https):\/{2}(\w+\.)+[a-z]+((\/{0,1})((\w+\W\w+)+|\w+){0,}(\/{0,1}))*))/;
    const ipLink = document.querySelector('.check-ip-link__field').value;
    let regMas;
    let masLink = [];
    while((regMas = regLink.exec(ipLink)) !== null){
        masLink.push(regMas[0]);
    }
    while((regMas = regIp.exec(ipLink)) !== null){
        masLink.push(regMas[0]);
    }
    while((regMas = regIpv6.exec(ipLink)) !== null){
        masLink.push(regMas[0]);
    }
    //sorts alphabetically
    masLink.sort()
    let str = '<ul>';
    for(let i of masLink){
        if(reg.test(i)){
            //remove http | https
            let masHTTP = i.split(/((http|https):\/{2})/); 
            str += `<li><a href="${i.replace(',', "")}" target="_blank">${masHTTP[3].replace(',', "")}</a></li>`;
        } else {
            str += `<li>${i.replace(',', "")}</li>`;
        }
    }
    str += '</ul><button type="button" class="answer_btn">Close</button>';
    fon[4].style.transform = 'translate(0,0)';
    answer.innerHTML = str;
    //answer box
    document.querySelector('.answer_btn').addEventListener('click', () => {
        c.style.opacity = '0';
        c.style.zIndex = '-1';
    })
})

//search for words in a string
document.querySelector('.text-check__btn').addEventListener('click', () => {
    //regular with regular field
    const regText = new RegExp(document.querySelector('.text-check__field').value, 'g');
    let str = '<p>';
    let index = 0;
    //text 
    let strAlt = document.querySelector('.text-check__textarea').value;
    if(strAlt.length > 0){
        //highlight the words
        while((regMas = regText.exec(strAlt)) !== null){
            str += strAlt.substring(index, regText.lastIndex - regMas[0].length);
            index = regText.lastIndex;
            str += `<mark>${regMas[0]}</mark>`;
        }

        if(index < strAlt.length)
            str += strAlt.substring(index, strAlt.length);

        str += `<\p><button type="button" class="answer_btn">Close</button>`;
        fon[5].style.transform = 'translate(0,0)';
        answer.innerHTML = str;
    }
    //answer box
    document.querySelector('.answer_btn').addEventListener('click', () => {
        c.style.opacity = '0';
        c.style.zIndex = '-1';
    })
})

//build chessboard
document.querySelector('.chessboard__btn').addEventListener('click', () => {
    let masSize = document.querySelector('.chessboard__field').value.split(/x|X|х|Х/);
    let kw = Number(masSize[1]) > Number(masSize[0])?masSize[1]:masSize[0];
    const reg = /\d+(x|X|х|Х)\d+/;
    //build
    if(reg.test(document.querySelector('.chessboard__field').value)){
        //width and heigth
        let str = `<table style="width:calc((65%/${kw})*${masSize[0]});
         height:calc((80%/${kw})*${masSize[1]})">`;
        //rows 
        for(let i = 0; i < masSize[1]; i++){
            str +=`<tr>`;
            //column
            for(let j = 0; j < masSize[0]; j++){
                str += `<th ></th>`;
            }
            str += '</tr>';
        }
       
        str += `</table><button type="button" class="answer_btn">Close</button>`;
        answer.innerHTML = str; 
    } else {
        answer.innerHTML = `<p>Incorrect input</p>`;
    }

    fon[3].style.transform = 'translate(0,0)';
    //answer box
    document.querySelector('.answer_btn').addEventListener('click', () => {
        c.style.opacity = '0';
        c.style.zIndex = '-1';
    })
})

/*revive buttons*/
fonBtn[0].addEventListener('click', () => {
    fon[0].style.transform = 'translate(-100%,0)';
})

fonBtn[1].addEventListener('click', () => {
    fon[1].style.transform = 'translate(-100%,0)';
})

fonBtn[2].addEventListener('click', () => {
    fon[2].style.transform = 'translate(-100%,0)';
})

fonBtn[3].addEventListener('click', () => {
    c.style.opacity = '1';
    c.style.zIndex = '10';
})

fonBtn[4].addEventListener('click', () => {
    fon[3].style.transform = 'translate(-100%,0)';
})

fonBtn[6].addEventListener('click', () => {
    fon[4].style.transform = 'translate(-100%,0)';
})

fonBtn[7].addEventListener('click', () => {
    c.style.opacity = '1';
    c.style.zIndex = '10';
})

fonBtn[8].addEventListener('click', () => {
    fon[5].style.transform = 'translate(-100%,0)';
})

fonBtn[5].addEventListener('click', () => {
    c.style.opacity = '1';
    c.style.zIndex = '10';
})