import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { IFAQ } from "../../models/IFAQ";
import help_image from '../../assets/view.png'
export interface FAQState {
        faq: IFAQ[];
        faqtrainers: IFAQ[];
}


const initialState: FAQState = {
    faq: [
        {_id: '1', name: 'Дополнительные шахматные задачи', 
        description:`
        Рекомендуем, просим, требуем с вашей стороны МОТИВИРОВАТЬ РЕБЕНКА НА ВЫПОЛНЕНИЕ ШАХМАТНЫХ ЗАДАЧ.
    Тренера школы также регулярно напоминают ученикам про данные задачи и проверяют их.
        
        Для мотивации можно обещать разные призы, если ребенок дойдет, например, до рейтинга 1400 – прогулка по парку, или до 1500 – цирк.
Но при этом не забывать напоминать, что ребенок делает это для себя. Поэтому иногда этот приз может быть в виде простого объятия и слов” ТЫ МОЛОДЕЦ!”.

    ССЫЛКА на дополнительные задачи от школы на разные темы – https://lichess.org/training 
(Если ученик новичок и переходит в первый раз, уровень нужно выбрать самый лёгкий, смотрите инструкцию тут – https://photo-screen.ru/i/LFBAalTiD 
        `},
        {_id: '2', name: 'Как выполнять домашнее задание', 
        description:`
        Даём ребёнка задачу ИМЕННО в таком формате. Говорим – “Нужно, чтобы ты сделал домашки*например до четверга 21:00 и показал мне, ДЕЛАЙ КОГДА ХОЧЕШЬ” чтобы он сам, когда захочет, подошёл и сказал, вот я хочу сделать домашки, или если уже сам делает без трудностей, чтобы сам сделал и показал вам. ЭТО ВАЖНО – НЕ ЗАСТАВЛЯЙТЕ ПОЖАЛУЙСТА В КАКОЙ-ТО ДЕНЬ СДЕЛАТЬ ДОМАШКИ. А если сам не вспомнит и не сделает и не напомнит, то например в четверг в 21:00, когда вы спрашиваете где домашки, а домашек нет, вы спокойно говорите – ну сиди и делай сейчас допоздна, пока не закончишь.

        Во время решения заданий, если вы уверены, что можете правильно рассказать и научить, можете чуть-чуть помогать, но всё же, *не советуем практиковать свои навыки тренера,* так как неправильное объяснение родителем потом становится двойной работой для учителя. Стремимся к самостоятельности.
        `},
        {_id: '3', name: 'Про ПРАКТИКУ!', 
        description:`
ОЧЕНЬ ВАЖНО! ПРАКТИКА! Рекомендуем, просим, требуем с вашей стороны МОТИВИРОВАТЬ РЕБЕНКА НА ИГРУ (желательно на первой половине дня) с контролем 15+10 и выше – https://photo-screen.ru/i/K1iPzHZd2 
В инструкции также отмечено место для ”играть с другом”, чтобы кроме чужих соперников ребенок в первые полгода побольше играл с мамой, папой, дедушкой, другом.

Без указаний тренера играть нельзя. Играть нужно ПОСЛЕ 2-3 месяца обучения, когда тренер скажет, что ученик готов.

СКОЛЬКО ИГРАТЬ???
I. Первые 2-3 месяца обучения – 0 партий в день, только задачи.
II. После 3 месяца обучения – 1-2 партии в день.
III. После 6-12 месяца обучения – МИНИМУМ 2 и больше партий в день (чем больше тем лучше).

Наша с вами задача сформировать у ребенка привычку “Пойду, сыграю пару партий, отдохну чуть-чуть”.
Если столкнулись со страхом неудачи и нужна мотивация, детальный вебинар для родителей от психолога – https://clck.ru/33YALx 

НУЖНО ЗНАТЬ! Регулярная практика – важный элемент в развитии шахматистов любого уровня игры.

        `},
        {_id: '4', name: 'Страх неудачи', 
        description:`
В шахматах выигрывает каждый. Если ты получаешь удовольствие 
от игры, а это самое главное, то даже поражение не страшно.
Давид Бронштейн

В том-то и состоят шахматы. Сегодня ты даёшь сопернику урок, 
а завтра он тебе.
Роберт Джеймс Фишер

Советы:

Шахматы - это не только игра, но также и спортивный поединок. Начиная шахматную партию, сразу начинай и думать - тратить время на ходы “просто так” нельзя. 

Внимательно следи не только за своими возможными ходами, но и за тем, что делает и хочет сделать соперник. Тогда ты сделаешь меньше ошибок и помешаешь его планам. Слабость соперника - это твоя сила. 

Играя шахматную партию, убедись, что никто не отвлекает тебя. Стоит один раз отвлечься от доски, как концентрация будет потеряна - и вся партия будет испорчена. Чем ты внимательнее за доской, тем лучше твоя игра. 

В шахматах есть три результата - выигрыш, проигрыш и ничья. И в любом случае из партии можно извлечь полезные уроки - работа над ошибками поможет стать хорошим шахматистом. 

Теперь о страхе неудачи:
1. Поддерживайте позитивное отношение: Убедитесь, что ребенок понимает, что важно не только победить, но и наслаждаться игрой и учиться на своих ошибках. Подчеркните, что каждая партия - это возможность для роста и улучшения. 
2. Говорите о неудачах как о возможностях для изучения: Помогите ребенку понять, что неудача - это не конец, а шанс понять свои ошибки и развиваться.
3. Помогите ребенку управлять своими эмоциями: Расскажите ребенку о том, что страх и нервозность перед первой партией - это естественные чувства. Поделитесь своими собственными историями о преодолении страха и важности веры в себя. Помогите им научиться расслабляться, дышать глубоко и сосредоточиться на игре.
Важно поддерживать ребенка и помнить, что процесс обучения и участие в игре важнее, чем итоговый результат.


        `},
        {_id: '5', name: 'Турниры и игры', 
        description:`
Ученикам нужно побольше практики после уроков, чтобы ученики побольше играли:
1. В досуг с родителями или с незнакомым противником из интернета, например, утром или вечером 1-2 партии перед сном.
ВСЕГДА НАПОМИНАЙТЕ ДЕТЯМ: “А не хочешь играть в шахматы?”

2. Турниры (Когда тренер решит, что ученик готов к турнирам, руководство школы дополнительно сообщит вам и начнете получать приглашения на турниры).

3. Мы советуем учиться в формате онлайн по нашей программе, но стараться время от времени участвовать на офлайн турнирах в вашем районе или городе, просто в yandex карте найти школу шахмат, пойти 1 раз познакомиться, далее следить за ТУРНИРНЫМ календарем школы.

Дополнительно отправляем вам порталы по турнирам, которые может быть вам помогут во время поиска.

Международные турниры
1. https://ratings.ruchess.ru/tournaments 
2. https://ruchess.ru/championship/calendar/ 
3. http://chessopen.ru/tournaments/ 
4. https://chessresults.ru/ru/tournaments 
5. https://www.fide.com/calendar 

Беларусь – https://openchess.by/ , https://reshay.by/timetables 
Германия – https://www.schachbund.de 
Москва – 1. https://moscowchess.org 2. Шахматные турниры и соревнования | Шахматные турниры (chessresults.ru)
Санкт-Петербург – http://totalchess.spb.ru 
Краснодар – https://chess-kk.ru 
Екатеринбург – https://ural-chess.com/event 
Владимир – https://vladimirchess.ru 
Нижний Новгород – https://www.nnchess.org 
Самара – http://www.samara-chess.ru 
Казань – http://www.tat-chess.ru 


Прежде, чем поехать на городские или областные турниры обязательно нужно заранее согласовать с нами. В свою очередь мы уточним у тренера, готов ли ребёнок к таким соревнованиям или пока нужно участвовать в районных-клубных соревнованиях.
Очень часто бывает, что родители едут сразу на областные соревнования, ребёнок там проигрывает, очень расстраивается и винит школу, что она дала плохие знания.
        
        `},
        {_id: '6', name: 'Собственная платформа и программа обучения', 
        description:`
Международная школа Арарат работает на новой, дорогой и современной платформе, печатать или фотографировать что-либо не надо. Мы освободили родителей от этой сложной работы и даём детям возможность выполнить домашнее задание в игровой форме на компьютере.

И что самое важное, ученики учатся по собственной программе обучения школы, которую создали и редактировали и время от времени идеализируют разные армянские и русские гроссмейстеры, во главе чемпионки Мира, Европы Элины Даниелян.
        
        `},
        {_id: '7', name: 'В случае пропусков', 
        description:`
В случае пропусков, мы предоставляем видеозапись урока и списывается всего 70% от стоимости урока.

Деньги НЕ списываются, но мы также предоставляем видеозапись урока, если:
Ребенок заболел и родители предоставляют СПРАВКУ! (Администратор делает перерасчет – аннулирует все списания на основе справки, но до справки деньги списываются).
ЗАРАНЕЕ предупредили администратора и заморозили счет! (Уехали на длительный отпуск или перерыв от 15 дней, а из-за длительного перерыва от 30 дней возможна смена группы).

Чтобы не отставать от группы, в обоих случаях обязательно:
Просмотреть видеозапись урока (задача родителя только включить видеозапись).
Выполнить домашнее задание.

        `},
        {_id: '8', name: 'Как подготовить ребенка к турниру', 
        description:`
            https://clck.ru/34fa6M 
        `},
        {_id: '9', name: 'Как настроить ребенка на урок - МОТИВАЦИЯ.', 
        description:`
1) Если ваш ребенок не проявляет интереса к онлайн урокам и не хочет учиться, вот несколько советов, которые могут помочь вам настроить его на обучение:
Установите ясные ожидания: Объясните ребенку, что он должен принимать участие в онлайн уроках и выполнять домашние задания. Установите четкие правила и ожидания, связанные с учебным процессом, и объясните, что это является его ответственностью.
2) Обратитесь к его интересам: Попытайтесь связать учебные темы с интересами и хобби ребенка. Найдите способы, как сделать учебный материал более привлекательным и значимым для него. Используйте реальные примеры и приложения, которые могут быть связаны с его интересами.
3) Создайте стимулы и награды: Разработайте систему стимулов и наград (например когда ученик поднимает свой рейтинг еще на 50 пунктов), чтобы поощрять ребенка за его усилия и достижения в учебе. 
Это может быть что-то простое, например, небольшая похвала или возможность заниматься любимым занятием после завершения задания.
4)Установите регулярное расписание: Создайте структуру в учебном процессе, установив регулярное расписание для выполнения заданий. Помогите ребенку привыкнуть к определенному времени и месту для учебы.
5)Будьте поддержкой и ресурсом: Предложите свою помощь и поддержку ребенку во время учебы. Будьте доступны для ответов на вопросы, объяснений и помощи с заданиями. Помогите ему создать оптимальную обстановку для учебы, обеспечивая тихое и удобное рабочее место.
6)Поощряйте самостоятельность и ответственность: Постепенно передавайте больше ответственности ребенку в учебном процессе. Поощряйте его самостоятельность и развитие навыков планирования, организации и управления временем.
7)Сотрудничайте со школой: Общайтесь со школой, чтобы получить рекомендации и советы по эффективной мотивации вашего ребенка. Разработайте совместный план действий, чтобы поддержать его учебные усилия и развитие. Пишите всегда как школа может помочь вам.
8)Установите лимиты на использование технологий: Обратите внимание на использование технологий во время учебного процесса. Установите ограничения по времени, чтобы ребенок не отвлекался на социальные сети или развлекательные приложения во время учебы.
9)Закажите дополнительные шахматные книги из библиотеки, которую мы вам предлагаем, книги помогут еще больше вовлечь ребенка в процесс обучения.
        
        `},
        {_id: '10', name: 'Ребенок проявляет плохое поведение на уроке', 
        description:`
1. Будьте примером: Показывайте ребенку правильное поведение и отношение к учебе. Будьте внимательными и вежливыми во время онлайн уроков, чтобы ребенок видел ваше хорошее поведение как пример для подражания.

2. Поговорите с ребенком о его поведении на уроке. Объясните, что важно проявлять уважение к тренеру и остальным участникам, а также следовать правилам поведения. 
Разговор о последствиях: Обсудите с ребенком, как его негативное поведение может влиять на его учебный опыт и отношения с тренером и другими участниками урока. Подчеркните важность участия в уроках и учебных возможностях, которые могут упуститься из-за плохого поведения.

Установите ясные ожидания: Разработайте с ребенком набор правил и ожиданий для участия на уроке. Они должны включать уважительное общение, не перебивать других и активное слушание тренера. Постарайтесь убедиться, что ребенок понимает эти правила и принимает их.

3. Установите последствия: Обсудите с ребенком возможные последствия его плохого поведения на уроке. Это может включать временное отстранение от урока, утрата привилегий или дополнительные задания для исправления поведения. Важно быть последовательными и справедливыми при применении этих последствий.

4. Делитесь с администрацией школы, школа поможет вам создать единое фронт в поддержке ребенка.

5. Поощрение хорошего поведения: Поощряйте и похвалите ребенка, когда он проявляет хорошее поведение на уроке. Положительное подкрепление и похвала могут стимулировать ребенка к продолжению положительного поведения.

6. Обратите внимание на возможные причины: Постарайтесь выяснить, есть ли какие-то конкретные причины, по которым ребенок проявляет плохое поведение на уроке. Может быть, у него возникают трудности с материалом, или он испытывает страх или неуверенность. Обратите внимание на эти факторы и постарайтесь поддержать его в решении этих проблем.

7. Последовательность и терпение: Изменение поведения требует времени и терпения. Будьте последовательными в своих ожиданиях и наградах, и помните, что дети могут меняться постепенно. Будьте терпеливы и поддерживайте ребенка, помогая ему развивать положительные привычки и мотивацию к учению. Важно помнить, что каждый ребенок уникален.

8. Если проблема поведения продолжается, обратитесь администрации школы. Обсудите с ними ситуацию и попросите совета или дополнительной поддержки в решении данной проблемы.


*Каждый ребенок уникален, и причины и решения поведенческих проблем могут различаться. Чувствуйте себя свободным обратиться к психологу или другому специалисту для получения более индивидуальной помощи в данной ситуации.


        `},
        {_id: '11', name: 'Где смотреть видео трансляции шахматных турниров?', 
        description:`
Участие в онлайн-трансляциях шахматных турниров может быть захватывающим и познавательным способом следить за играми и анализировать ходы мастеров.

Прямая трансляция на chess24 | chess24.com  переходите по ссылке, выбирайте турнир, который в прямом эфире и наслаждайтесь шахматными трансляциями, или знакомитесь с календарём, чтобы следить за трансляциями в другой раз.

Если турнир достаточно крупный, то на YouTube так же можно найти множество каналов, где предлагаются трансляции на разных языках.
        `},
        {_id: '12', name: 'Что делать, если ребенок занял призовое место', 
        description:`
Мы признаем, что ваша активная поддержка и вовлеченность играют важную роль в успехе вашего ребенка. Ваше поощрение и поздравления помогут им почувствовать гордость за свои достижения и мотивацию продолжать развиваться в шахматной сфере.
Мы рекомендуем вам следующие шаги, чтобы отметить успех вашего ребенка:
1) Личные поздравления: Первое и самое важное - поздравьте вашего ребенка лично. Выразите свою гордость и радость от их победы. Поделитесь впечатлениями о том, как вы видите их усердие, труд и прогресс.
2) Поделитесь новостью с родственниками и друзьями: Расскажите близким людям, как ваш ребенок достиг великолепных результатов в шахматах. Они тоже заинтересованы в успехе вашего ребенка и будут рады услышать эту новость.
3) Отправьте поздравительное сообщение, дипломы, сертификаты в группе и администратору школы: Мы можем разместить анонс в нашей онлайн школе, сделать пост (с вашего дополнительного разрешения), чтобы поздравить вашего ребенка с победой в турнире. Это будет великолепная возможность поделиться этим достижением с друзями, другими учениками и показать, что усилия и работа в шахматах приносят результаты. Avelacnel vor mayka enq uxarkum ete eryak mtni erexen
4) Организуйте маленькую церемонию: Попросите вашего ребенка поделиться своими впечатлениями и опытом с другими учениками. Это может быть небольшая церемония, где ваш ребенок может рассказать о своих достижениях и поделиться своими победными партиями с другими участниками школы.
5) Поставьте новые цели: Вместе с вашим ребенком определите новые цели и вызовы. Помогите им установить более высокие стандарты для себя и поощряйте их продолжать развиваться и улучшаться в шахматах.
        `},
    ],
    faqtrainers: [
        {
            _id: '1', name: '1. Что делать, если после подключения одного из учеников тренер начинает слышать себя и создается эхо?',
            description: {type: "text", content: `открывется при нажатии - Эхо создается из-за того что ученик воспроизводит звук при помощи динамиков, а не наушников и звук о него очень громкий, из-за этого и создается эхо, есть 2 варианта:
Попросить ученика надеть наушники
Попросить ученика прикрутить звук динамиков`}
        },
        {
            _id: '2', name: '2. Как включить полный экран во время урока.',
            description: {type: "image", content: help_image}
        },
    ],
}



export const faqSlice = createSlice({
    name: 'FAQSlice',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
    }
})

export default faqSlice.reducer;