'use strict'
console.clear();
{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();


function getCalendarBody() {
    const dates = [];// date:日付 day:曜日
    const lastDate = new Date(year, month + 1, 0).getDate();
    //末日を取得する場合は、翌月1日の１日前、つまりは0日目を取得する

    for(let i = 1; i <= lastDate; i++){
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false //半透明にしたい部分は前月と来月分だからfalse
      });//単純な日付の配列ではなくてオブジェクト配列にする
    }

      if(year === today.getFullYear() && month === today.getMonth()){
        dates[today.getDate() -1].isToday = true;
      }

    return dates;//値を返す
  }


  function getCalendarHead(){
    const dates = [];
    const d = new Date(year, month,0).getDate();//先月の末日を求める
    const n = new Date(year, month,1).getDay();
    //今月の1日が週の何日目かを求める
    //getdayで曜日を表す数値を取得できる日＝0、月＝1

    for(let i = 0; i < n; i++){
    dates.unshift({//配列の最初に要素を追加
      date: d - i,
        isToday: false,
        isDisabled: true
    });
  }
  return dates;//値を返す
}


  function getCalendarLast(){
    const dates = [];
    const lastDay = new Date(year,month + 1,0).getDay();
  //末日が週の何日目かを求める
    for(let i = 1; i < 7 - lastDay; i++){
      //i <7- lastDayは来月の日付の増える限度を表している
      dates.push({
        date: i,
      isToday: false,
          isDisabled: true
      });
    }
    return dates;//値を返す
  }


  function clearCalendar(){
    const tbody = document.querySelector('tbody');

    while(tbody.firstChild){
      tbody.removeChild(tbody.firstChild);
    }
  }

  function rendarTitle(){
    const title = `${year}/${String(month + 1).padStart(2,'0')}`;
    //getmonthは0-11月を取得するから＋１で1−12月表記にする
    //padStart()第一引数は何列表示かを決め、第二引数は決めた列数以外の時に補う値を入れる
    document.getElementById('title').textContent = title;
  }

  function renderWeeks(){
    const dates = [//配列を初期化、まとめている
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarLast(),
      //全ての要素を配列の中で展開させる、スプレッド演算子
    ];
    const weeks = [];//週ごとに分ける
    const weeksCount = dates.length / 7;//7日ごとにする

    for (let i = 0; i < weeksCount; i++){
      weeks.push(dates.splice(0,7));
    }

   weeks.forEach(week =>{//週ごとに処理させる,weekを取り出す
     const tr =document.createElement('tr');
     week.forEach(date => {//取り出した要素をdateとする
       const td = document.createElement('td');

       td.textContent = date.date;
       if(date.isToday){
         td.classList.add('today');
       }
       if(date.isDisabled){
         td.classList.add('disabled');
       }
       tr.appendChild(td);
     });
     document.querySelector('tbody').appendChild(tr);
   })
  }


  function createCalendar(){
    clearCalendar();
    rendarTitle();
    renderWeeks();
  }


  document.getElementById('next').addEventListener('click',() => {
    month++;
    if(month>11){
      year++;//月が11月を上回ると年が１足される様にする
      month = 0;//月も添字は0から始まるので12月は添字＝11
    }
    createCalendar();//前月のカレンダーを表示
  })

  document.getElementById('prev').addEventListener('click',() => {
    month--;
    if(month < 0){
      year--;//月が1月を下回ると年が１引かれる様にする
      month = 11;//月も添字は0から始まるので12月は添字＝11
    }
    createCalendar();//前月のカレンダーを表示
  })

  document.getElementById('tfoot').addEventListener('click',() => {

    year = today.getFullYear();
    month = today.getMonth();

    createCalendar();//前月のカレンダーを表示
  })
  createCalendar();//カレンダーを表示
}