const ws = new WebSocket('ws://localhost:8080');

// Soat uchun
let now=new Date(),hour,minute,second,date,month,year;

const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const mounths=['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentyabr','Oktyabr','Noyabr','Dekabr']
setInterval(() => {
  now = new Date();
  date=now.getDate()<10 ? '0'+ now.getDate(): now.getDate();
  month=(now.getMonth()+1)<10 ? '0'+(now.getMonth()+1) :(now.getMonth()+1);
  year=now.getFullYear();

  hour=now.getHours()<10 ? '0'+now.getHours() : now.getHours()
  minute=now.getMinutes()<10 ? '0'+now.getMinutes() : now.getMinutes();
  second=now.getSeconds()<10 ? '0'+now.getSeconds() : now.getSeconds();
  fullDay.textContent=`${date}-${mounths[month-1]} ${year}`
  hourEl.textContent=`${hour}`
  minuteEl.textContent=`${minute}`
  secondEl.textContent=`${second}`
  return `${hour}:${minute}  ${date}:${month}:${year}`;
}, 1000);

ws.onopen = () => {
  console.log('Serverga ulandik');
  const messages = document.getElementById('messages');
  const element=document.createElement('p')
  element.textContent='Serverga ulandik ';
  messages.appendChild(element)
};
ws.onmessage = (event) => {
    let message;

    if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          message = reader.result;
          const messages = document.getElementById('messages');
          const element=document.createElement('p')
          element.textContent=hour + ':' + minute + ':' + second +' Serverdan keldi: '+message
          messages.appendChild(element)
        };
        reader.readAsText(event.data);
    } else if (typeof event.data === 'string') {
        message = event.data;
        const messages = document.getElementById('messages');
        const element=document.createElement('p')
        element.textContent=date.getHours +'Serverdan keldi: '+message
        messages.appendChild(element)
    }
};

ws.onclose = () => {
  console.log('Server uzildi');
  const messages = document.getElementById('messages');
  const element=document.createElement('p')
  element.textContent=' Server bilan aloqa yo`q...';
  messages.appendChild(element);
};

function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value;
  if(message.trim()!=''){
    ws.send(message);
    input.value = '';
  }
  
}
window.addEventListener('keydown',(e)=>{
    if(e.key==="Enter"){
        sendMessage()
    }
})