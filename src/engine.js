(() => {
  'use strict';
  const DATA = window.STORY_DATA;
  if (!DATA || !Array.isArray(DATA.scenes)) {
    document.body.innerHTML = '<p style="padding:2rem;color:white">Не удалось загрузить сценарий. Проверьте src/story.js.</p>';
    return;
  }

  const $ = (id) => document.getElementById(id);
  const sceneMap = new Map(DATA.scenes.map(scene => [scene.id, scene]));
  const STORAGE = { auto: 'lastSignalAuto_v1', slots: 'lastSignalSlots_v1', settings: 'lastSignalSettings_v1' };
  const CHAPTERS = [
    {id:1,title:'Непрошеный спаситель',subtitle:'Случайная встреча меняет маршрут'},
    {id:2,title:'Правила выживания',subtitle:'У каждого убежища есть свои правила'},
    {id:3,title:'Город мёртвых',subtitle:'Память опаснее заражённых'},
    {id:4,title:'Не верь голосам',subtitle:'Правда редко звучит удобно'},
    {id:5,title:'Объект Лазарь',subtitle:'Сеть помнит больше, чем должна'},
    {id:6,title:'Последний сигнал',subtitle:'Выбор, который останется с тобой'}
  ];
  const SPEAKERS = {
    'Вита':'vita.png','Константин':'konstantin.png','Марта':'marta.png','Лев':'lev.png','Елена':'elena.png',
    'Елена Воронцова':'elena.png'
  };
  const BG_LABELS = {
    supermarket:'ЗАБРОШЕННЫЙ СУПЕРМАРКЕТ',city:'ГОРОД · ВОСТОЧНЫЙ КВАРТАЛ',safehouse:'УБЕЖИЩЕ · СТАНЦИЯ',
    rooftop:'КРЫША · ВЕТЕР И ТИШИНА',laboratory:'HELIX BIOTECHNOLOGIES',lazarus:'ОБЪЕКТ «ЛАЗАРЬ»',
    bridge:'ВОСТОЧНЫЙ МОСТ',photostudio:'ФОТОСТУДИЯ',archive:'АРХИВ HELIX',medbay:'МЕДИЦИНСКИЙ БЛОК',
    elevator:'ЛИФТ · НИЖНИЙ СЕКТОР',core:'ЦЕНТРАЛЬНОЕ ЯДРО',tunnel:'ПОДЗЕМНЫЙ ПЕРЕХОД',serverroom:'СЕРВЕРНЫЙ ЗАЛ',
    balcony:'ТЕХНИЧЕСКИЙ БАЛКОН',gate:'ВОРОТА HELIX',subway:'СТАНЦИЯ МЕТРО',title:'ГОРОД ПОСЛЕ ТИХОГО ДНЯ'
  };
  const CG_META = [
    {id:'market_dawn',title:'Рассвет в супермаркете',chapter:'Глава 1',file:'market_dawn.jpg',description:'Вита впервые исследует пустой магазин.'},
    {id:'first_meet',title:'Первая встреча',chapter:'Глава 1',file:'first_meet.jpg',description:'Константин вытаскивает Виту из опасности.'},
    {id:'safehouse_arrival',title:'Убежище',chapter:'Глава 1',file:'safehouse_arrival.jpg',description:'Вита и Константин прибывают на станцию.'},
    {id:'radio_91',title:'Частота 91.7',chapter:'Глава 1',file:'radio_91.jpg',description:'Рация ловит сигнал, которого не должно существовать.'},
    {id:'quiet_rooftop',title:'Разговор на крыше',chapter:'Глава 1',file:'quiet_rooftop.jpg',description:'Первый разговор о прошлом и недоверии.'},
    {id:'night_watch',title:'Ночное дежурство',chapter:'Глава 2',file:'night_watch.jpg',description:'Тихая смена на крыше убежища.'},
    {id:'city_approach',title:'За мостом',chapter:'Глава 2',file:'city_approach.jpg',description:'Команда пересекает мост к восточному кварталу.'},
    {id:'photo_studio',title:'Фотостудия',chapter:'Глава 3',file:'photo_studio.jpg',description:'Встреча в месте, где хранились чужие воспоминания.'},
    {id:'ilya_photo',title:'Снимок из прошлого',chapter:'Глава 3',file:'ilya_photo.jpg',description:'Фотография экспедиции и память об Илье.'},
    {id:'rooftop_escape',title:'Побег по крышам',chapter:'Глава 3',file:'rooftop_escape.jpg',description:'Вита и Константин уходят от преследования.'},
    {id:'cassette_reveal',title:'Старая кассета',chapter:'Глава 3',file:'cassette_reveal.jpg',description:'Команда слушает запись из прошлого.'},
    {id:'helix_gate',title:'Ворота Helix',chapter:'Глава 3',file:'helix_gate.jpg',description:'Герои подходят к внешним воротам комплекса.'},
    {id:'vita_protocol',title:'Протокол наблюдения',chapter:'Глава 4',file:'vita_protocol.jpg',description:'Вита обнаруживает собственное дело в системе.'},
    {id:'archive_confession',title:'Признание Елены',chapter:'Глава 4',file:'archive_confession.jpg',description:'Елена раскрывает правду о последней экспедиции.'},
    {id:'lab_hands',title:'Остановить',chapter:'Глава 4',file:'lab_hands.jpg',description:'Вита пытается остановить Константина.'},
    {id:'red_elevator',title:'Красный лифт',chapter:'Глава 4',file:'red_elevator.jpg',description:'Спуск в нижний сектор Helix.'},
    {id:'lazarus_first_view',title:'Первый взгляд на Лазаря',chapter:'Глава 4',file:'lazarus_first_view.jpg',description:'Команда видит центральную установку.'},
    {id:'vita_file',title:'Личное дело Виты',chapter:'Глава 5',file:'vita_file.jpg',description:'Архив показывает происхождение протокола.'},
    {id:'voice_in_lazarus',title:'Голос в Лазаре',chapter:'Глава 5',file:'voice_in_lazarus.jpg',description:'Сигнал обретает знакомый голос.'},
    {id:'lazarus_tenderness',title:'После эха',chapter:'Глава 5',file:'lazarus_tenderness.jpg',description:'Момент близости среди холодного света комплекса.'},
    {id:'balcony_future',title:'Пять минут тишины',chapter:'Глава 5',file:'balcony_future.jpg',description:'Разговор о будущем над разрушенным городом.'},
    {id:'network_wake',title:'Сеть просыпается',chapter:'Глава 5',file:'network_wake.jpg',description:'Нейросеть внезапно активируется.'},
    {id:'core_door',title:'Обратный отсчёт',chapter:'Глава 5',file:'core_door.jpg',description:'Перед героями открывается дверь центрального ядра.'},
    {id:'final_promise',title:'Разговор перед выбором',chapter:'Глава 6',file:'final_promise.jpg',description:'Последний разговор Виты и Константина.'},
    {id:'last_console',title:'Последний выбор',chapter:'Глава 6',file:'last_console.jpeg',description:'Три способа изменить судьбу города.'},
    {id:'new_dawn',title:'Новый рассвет',chapter:'Финал',file:'new_dawn.jpg',description:'Город получает шанс начать заново.'},
    {id:'price_sacrifice',title:'Цена спасения',chapter:'Финал',file:'price_sacrifice.jpg',description:'Спасение требует тяжёлой личной цены.'},
    {id:'echo_core',title:'Эхо человечества',chapter:'Финал',file:'echo_core.jpg',description:'Возможность лечения остаётся, но опасность не исчезла.'}
  ];
  const CG_ALIAS = {};
  const CG_BY_ID = new Map(CG_META.map(item => [item.id, item]));

  const defaultSettings = { music:true, musicVolume:0.34, textSize:100, autoRead:false, reduceMotion:false };
  let settings = loadJSON(STORAGE.settings, defaultSettings);
  settings = {...defaultSettings,...(settings || {})};
  let state = null;
  let audio = null;
  let audioTrack = '';
  let autoTimer = null;
  let toastTimer = null;
  let currentModal = '';
  let currentCgId = '';

  function freshState() {
    return {
      version:1, sceneId:DATA.chapterStarts[1], pageIndex:0,
      stats:{closeness:0,trust:1,resolve:1,resources:2}, flags:{}, history:[], historyKeys:[], visitedScenes:[],
      unlockedChapter:1, unlockedCG:[], chapterSnapshots:{}, completedEndings:[], endingId:null,
      playSeconds:0, lastTick:Date.now(), autoRead:!!settings.autoRead
    };
  }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function loadJSON(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (_) { return fallback; }
  }
  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { toast('Не удалось записать сохранение. Проверьте свободное место браузера.'); return false; }
  }
  function slots() { return loadJSON(STORAGE.slots, [null,null,null]); }
  function saveAuto(silent=true) {
    if (!state) return;
    state.lastTick = Date.now();
    const ok = saveJSON(STORAGE.auto, state);
    if (!silent && ok) toast('Игра сохранена автоматически.');
    updateMenuContinue();
  }
  function updateMenuContinue() {
    const data = loadJSON(STORAGE.auto, null);
    const button = $('continue-button');
    const caption = $('continue-caption');
    if (button) {
      button.disabled = !data || (!data.sceneId && !data.endingId);
      if (caption) caption.textContent = button.disabled ? 'Сохранение не найдено' : data.endingId ? 'Финал · можно вернуться' : `Глава ${data.unlockedChapter || 1} · автосохранение`;
    }
  }
  function toast(message) {
    const el=$('toast'); if(!el) return;
    el.textContent=message; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),2300);
  }
  function clampStats() {
    if (!state) return;
    state.stats.closeness = Math.max(0,Math.min(10,Number(state.stats.closeness)||0));
    state.stats.trust = Math.max(0,Math.min(10,Number(state.stats.trust)||0));
    state.stats.resolve = Math.max(0,Math.min(10,Number(state.stats.resolve)||0));
    state.stats.resources = Math.max(0,Math.min(5,Number(state.stats.resources)||0));
  }
  function conditionMet(cond) {
    if (!cond) return true;
    if (cond.all && !cond.all.every(conditionMet)) return false;
    if (cond.any && !cond.any.some(conditionMet)) return false;
    if (cond.stat) {
      const value = Number(state?.stats?.[cond.stat] || 0);
      if (cond.gte !== undefined && value < cond.gte) return false;
      if (cond.gt !== undefined && value <= cond.gt) return false;
      if (cond.lte !== undefined && value > cond.lte) return false;
      if (cond.lt !== undefined && value >= cond.lt) return false;
      if (cond.eq !== undefined && value !== cond.eq) return false;
    }
    if (cond.flag) {
      const expected = cond.equals === undefined ? true : cond.equals;
      if ((state?.flags?.[cond.flag] || false) !== expected) return false;
    }
    if (cond.notFlag && state?.flags?.[cond.notFlag]) return false;
    if (cond.flags && Object.entries(cond.flags).some(([key,value]) => (state?.flags?.[key] || false) !== value)) return false;
    return true;
  }
  function currentScene() { return state?.sceneId ? sceneMap.get(state.sceneId) : null; }
  function getScenePages(scene) {
    const pages = [...(scene.pages || [])];
    (scene.variants || []).filter(variant => conditionMet(variant.when)).forEach(variant => pages.push(...(variant.pages || [])));
    return pages;
  }
  function mappedCg(id) { return CG_ALIAS[id] || id; }
  function unlockCg(id) {
    const mapped=mappedCg(id);
    if (CG_BY_ID.has(mapped) && !state.unlockedCG.includes(mapped)) state.unlockedCG.push(mapped);
  }
  function renderStoryCg(id) {
    const host=$('cg-stage');
    if (!host) return;
    const item=id ? CG_BY_ID.get(mappedCg(id)) : null;
    if (!item) { host.hidden=true; host.innerHTML=''; return; }
    host.innerHTML=`<img src="assets/cg/${item.file}" alt="${esc(item.title)}" draggable="false">`;
    host.hidden=false;
  }
  function snapshotChapter(chapter) {
    if (state.chapterSnapshots[chapter]) return;
    state.chapterSnapshots[chapter] = {
      stats:clone(state.stats), flags:clone(state.flags), history:clone(state.history), historyKeys:clone(state.historyKeys),
      visitedScenes:clone(state.visitedScenes), unlockedCG:clone(state.unlockedCG), unlockedChapter:state.unlockedChapter,
      completedEndings:clone(state.completedEndings), playSeconds:state.playSeconds
    };
  }
  function goToScene(id) {
    const next=sceneMap.get(id);
    if (!next) { toast(`Сцена ${id} не найдена.`); return; }
    state.endingId=null; state.sceneId=id; state.pageIndex=0;
    state.unlockedChapter=Math.max(state.unlockedChapter,next.chapter);
    if (id===DATA.chapterStarts[next.chapter]) snapshotChapter(next.chapter);
    if (!state.visitedScenes.includes(id)) state.visitedScenes.push(id);
    if (next.cg) unlockCg(next.cg);
    clampStats();
    saveAuto();
    render();
    if (next.music) playMusic(next.music);
  }
  function applyEffects(choice) {
    Object.entries(choice.effects || {}).forEach(([key,delta])=>{
      if (Object.prototype.hasOwnProperty.call(state.stats,key)) state.stats[key]+=Number(delta)||0;
    });
    Object.entries(choice.flags || {}).forEach(([key,value])=>{ state.flags[key]=value; });
    clampStats();
  }
  function choose(choice) {
    if (!choice || !conditionMet(choice.requires)) return;
    const scene=currentScene();
    const text=choice.text || 'Продолжить';
    applyEffects(choice);
    state.history.push({speaker:'Выбор Виты',text,chapter:scene?.chapter||0,scene:scene?.title||''});
    if (choice.ending) {
      state.endingId=choice.ending; state.sceneId=null; state.pageIndex=0;
      const ending=DATA.endings[choice.ending];
      if (ending?.cg) unlockCg(ending.cg);
      if (!state.completedEndings.includes(choice.ending)) state.completedEndings.push(choice.ending);
      saveAuto(); renderEnding();
      if (ending?.music) playMusic(ending.music);
      return;
    }
    if (choice.next) goToScene(choice.next);
  }
  function visibleChoices(scene) { return (scene.choices || []).filter(choice => conditionMet(choice.requires)); }
  function renderStats() {
    if (!state) return;
    ['closeness','trust','resolve','resources'].forEach(key=>{
      const value=state.stats[key]||0, max=key==='resources'?5:10;
      const bar=$(`stat-${key}`), label=$(`stat-${key}-value`);
      if (bar) bar.style.width=`${Math.round(value/max*100)}%`;
      if (label) label.textContent=String(value);
    });
  }
  function setPortrait(speaker) {
    const host=$('stage-character');
    const portrait=SPEAKERS[speaker];
    if (!portrait) { host.classList.add('hidden'); host.innerHTML=''; return; }
    host.classList.remove('hidden');
    const src=`assets/characters/${portrait}`;
    if (host.querySelector('img')?.getAttribute('src')!==src) host.innerHTML=`<img src="${src}" alt="${speaker}" draggable="false">`;
  }
  function recordPage(scene,page,index) {
    const key=`${scene.id}:${index}`;
    if (state.historyKeys.includes(key)) return;
    state.historyKeys.push(key);
    state.history.push({speaker:page.speaker||'Рассказчик',text:page.text||'',chapter:scene.chapter,scene:scene.title});
  }
  function render() {
    if (!state) return;
    if (state.endingId) { renderEnding(); return; }
    const scene=currentScene();
    if (!scene) { toast('Сохранение указывает на неизвестную сцену.'); return; }
    clearAutoTimer();
    $('menu-screen').hidden=true; $('game-screen').hidden=false;
    $('scene-backdrop').style.backgroundImage=`url("assets/backgrounds/${scene.bg}.jpg")`;
    renderStoryCg(scene.cg);
    $('chapter-label').textContent=`ГЛАВА ${scene.chapter} · ${CHAPTERS[scene.chapter-1]?.title.toUpperCase()||''}`;
    $('scene-label').textContent=scene.title;
    $('dialog-location').textContent=BG_LABELS[scene.bg]||'ПОСЛЕДНИЙ СИГНАЛ';
    $('scene-caption').textContent=scene.caption||'';
    const pages=getScenePages(scene);
    if (state.pageIndex>=pages.length) state.pageIndex=pages.length-1;
    const page=pages[state.pageIndex]||pages[0];
    $('speaker-name').textContent=page.speaker||'Рассказчик';
    $('dialog-text').textContent=page.text||'';
    setPortrait(page.speaker);
    recordPage(scene,page,state.pageIndex);
    renderStats();
    const inChapter=DATA.scenes.filter(item=>item.chapter===scene.chapter);
    const sceneOrdinal=inChapter.findIndex(item=>item.id===scene.id)+1;
    $('scene-number').textContent=`${String(sceneOrdinal).padStart(2,'0')} / ${String(inChapter.length).padStart(2,'0')}`;
    $('progress-fill').style.width=`${Math.max(4,sceneOrdinal/inChapter.length*100)}%`;
    const atLast=state.pageIndex>=pages.length-1;
    $('advance-button').hidden=atLast;
    $('choice-list').hidden=!atLast;
    if (atLast) {
      $('choice-list').innerHTML='';
      const choices=visibleChoices(scene);
      const hint=document.createElement('p'); hint.className='choice-hint'; hint.textContent='ВЫБЕРИ, КАК ПОСТУПИТЬ'; $('choice-list').appendChild(hint);
      choices.forEach(choice=>{
        const button=document.createElement('button');button.className='choice-button';button.type='button';button.textContent=choice.text;
        button.addEventListener('click',()=>choose(choice));$('choice-list').appendChild(button);
      });
    } else {
      $('choice-list').innerHTML='';
    }
    $('skip-button').textContent=atLast?'Текст прочитан':'Пропустить текст';
    $('skip-button').disabled=atLast;
    $('auto-button').setAttribute('aria-pressed',String(!!state.autoRead));
    $('playtime-label').textContent=formatTime(state.playSeconds||0);
    $('autosave-label').textContent='Автосохранение включено';
    saveAuto();
    if (!atLast && state.autoRead) scheduleAutoAdvance();
  }
  function renderEnding() {
    if (!state?.endingId) return;
    clearAutoTimer();
    const ending=DATA.endings[state.endingId];
    if (!ending) { toast('Финал не найден.'); return; }
    $('menu-screen').hidden=true; $('game-screen').hidden=false;
    $('scene-backdrop').style.backgroundImage=`url("assets/backgrounds/${ending.bg}.jpg")`;
    renderStoryCg(ending.cg);
    $('chapter-label').textContent='ЭПИЛОГ'; $('scene-label').textContent=ending.title;
    $('dialog-location').textContent='ПОСЛЕДНИЙ СИГНАЛ · ФИНАЛ';
    $('scene-caption').textContent=ending.subtitle;
    setPortrait('');
    const pages=[...(ending.pages||[])];
    (ending.variants||[]).filter(variant=>conditionMet(variant.when)).forEach(variant=>pages.push(...(variant.pages||[])));
    if (state.pageIndex>=pages.length) state.pageIndex=pages.length-1;
    const page=pages[state.pageIndex];
    $('speaker-name').textContent=page?.speaker||'Эпилог';
    $('dialog-text').textContent=page?.text||'';
    $('scene-number').textContent=`${String(state.pageIndex+1).padStart(2,'0')} / ${String(pages.length).padStart(2,'0')}`;
    $('progress-fill').style.width=`${(state.pageIndex+1)/pages.length*100}%`;
    $('choice-list').hidden=true; $('choice-list').innerHTML='';
    const atLast=state.pageIndex>=pages.length-1;
    $('advance-button').hidden=atLast;
    $('skip-button').disabled=atLast;
    $('skip-button').textContent=atLast?'Эпилог прочитан':'Пропустить текст';
    $('auto-button').setAttribute('aria-pressed',String(!!state.autoRead));
    const key=`ending:${state.endingId}:${state.pageIndex}`;
    if (!state.historyKeys.includes(key)) { state.historyKeys.push(key); state.history.push({speaker:page?.speaker||'Эпилог',text:page?.text||'',chapter:6,scene:ending.title}); }
    if (atLast) {
      const list=$('choice-list');list.hidden=false;
      const summary=document.createElement('p');summary.className='choice-hint';summary.textContent=`ФИНАЛ · ${ending.title.toUpperCase()}`;list.appendChild(summary);
      const stats=document.createElement('p');stats.className='choice-hint';stats.textContent=`Близость ${state.stats.closeness}/10 · Доверие ${state.stats.trust}/10 · Решимость ${state.stats.resolve}/10 · Ресурсы ${state.stats.resources}/5`;list.appendChild(stats);
      const menu=document.createElement('button');menu.className='choice-button';menu.textContent='Вернуться в главное меню';menu.onclick=()=>showMenu();list.appendChild(menu);
      const restart=document.createElement('button');restart.className='choice-button';restart.textContent='Начать новую игру';restart.onclick=()=>confirmNewGame();list.appendChild(restart);
      const gallery=document.createElement('button');gallery.className='choice-button';gallery.textContent='Открыть галерею';gallery.onclick=()=>openModal('gallery');list.appendChild(gallery);
    }
    renderStats();$('playtime-label').textContent=formatTime(state.playSeconds||0);saveAuto();
    if (!atLast && state.autoRead) scheduleAutoAdvance();
  }
  function advance() {
    if (!state) return;
    if (state.endingId) {
      const ending=DATA.endings[state.endingId];
      const pages=[...(ending.pages||[])];(ending.variants||[]).filter(v=>conditionMet(v.when)).forEach(v=>pages.push(...(v.pages||[])));
      if (state.pageIndex<pages.length-1) { state.pageIndex++; saveAuto(); renderEnding(); }
      return;
    }
    const scene=currentScene(); if(!scene) return;
    const pages=getScenePages(scene);
    if (state.pageIndex<pages.length-1) { state.pageIndex++; saveAuto(); render(); }
  }
  function skipText() {
    if (!state) return;
    const ending=state.endingId?DATA.endings[state.endingId]:null;
    const pages=ending ? [...ending.pages,...(ending.variants||[]).filter(v=>conditionMet(v.when)).flatMap(v=>v.pages||[])] : getScenePages(currentScene()||{});
    if (state.pageIndex<pages.length-1) { state.pageIndex=pages.length-1; saveAuto(); ending?renderEnding():render(); }
  }
  function scheduleAutoAdvance() {
    clearAutoTimer();
    autoTimer=setTimeout(()=>{
      if (!state) return;
      const ending=state.endingId?DATA.endings[state.endingId]:null;
      const pages=ending ? [...ending.pages,...(ending.variants||[]).filter(v=>conditionMet(v.when)).flatMap(v=>v.pages||[])] : getScenePages(currentScene()||{});
      if (state.pageIndex<pages.length-1) { advance(); }
      else { state.autoRead=false; settings.autoRead=false; saveSettings(); render(); }
    }, Math.max(6500, Math.min(16000, 4500 + ($('dialog-text').textContent.length*22))));
  }
  function clearAutoTimer(){ if(autoTimer){clearTimeout(autoTimer);autoTimer=null;} }
  function toggleAuto() {
    if (!state) return;
    state.autoRead=!state.autoRead; settings.autoRead=state.autoRead; saveSettings();
    if (state.autoRead) scheduleAutoAdvance(); else clearAutoTimer();
    $('auto-button').setAttribute('aria-pressed',String(state.autoRead));
  }
  function formatTime(seconds) { const m=Math.floor(seconds/60),s=seconds%60;return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }
  function playMusic(track) {
    if (!settings.music || !track) return;
    const src=`assets/audio/${track}.mp3`;
    if (audioTrack===src && audio && !audio.paused) return;
    const old=audio;
    const next=new Audio(src); next.loop=true; next.volume=0; audio=next; audioTrack=src;
    next.play().then(()=>{
      const start=Date.now(), duration=700, target=Math.max(0,Math.min(1,Number(settings.musicVolume)||0));
      const fade=()=>{
        const t=Math.min(1,(Date.now()-start)/duration); next.volume=target*t;
        if(old){old.volume=Math.max(0,(old.volume||0)*(1-t));}
        if(t<1) requestAnimationFrame(fade); else if(old){old.pause();old.src='';}
      }; fade();
    }).catch(()=>{ /* Browser waits for the first user gesture before audio playback. */ });
  }
  function stopMusic() { if(audio){audio.pause();audio=null;audioTrack='';} }
  function saveSettings(){ saveJSON(STORAGE.settings,settings); }
  function startNewGame() {
    state=freshState();
    $('game-screen').hidden=false; $('menu-screen').hidden=true;
    playMusic('tension');
    goToScene(DATA.chapterStarts[1]);
    toast('История началась. Выборы будут влиять на то, что произойдёт дальше.');
  }
  function confirmNewGame() {
    openModal('newgame');
  }
  function continueGame() {
    const data=loadJSON(STORAGE.auto,null);
    if (!data || (!data.sceneId && !data.endingId)) { toast('Сохранение не найдено.'); return; }
    state=data;
    state.stats=state.stats||{closeness:0,trust:1,resolve:1,resources:2};
    state.flags=state.flags||{};state.history=state.history||[];state.historyKeys=state.historyKeys||[];
    state.chapterSnapshots=state.chapterSnapshots||{};state.unlockedCG=state.unlockedCG||[];state.visitedScenes=state.visitedScenes||[];
    state.autoRead=!!settings.autoRead;
    $('menu-screen').hidden=true;$('game-screen').hidden=false;
    const scene=currentScene(); if(scene?.music)playMusic(scene.music);else if(state.endingId)playMusic(DATA.endings[state.endingId]?.music);
    render();toast('Продолжение загружено.');
  }
  function showMenu() {
    if (state) saveAuto();
    clearAutoTimer();
    $('game-screen').hidden=true;$('menu-screen').hidden=false;
    updateMenuContinue();
    playMusic('menu_theme');
  }
  function closeModal() {
    $('modal-layer').hidden=true;currentModal='';currentCgId='';
    if (state?.autoRead && !$('game-screen').hidden) scheduleAutoAdvance();
  }
  function openModal(type) {
    clearAutoTimer();
    currentModal=type;
    const layer=$('modal-layer'); const content=$('modal-content');
    const title=$('modal-title'); const eyebrow=$('modal-eyebrow');
    const names={chapters:'Выбор главы',gallery:'Галерея',characters:'Персонажи',settings:'Настройки',save:'Сохранение',history:'История',newgame:'Новая игра',cg:'Иллюстрация'};
    title.textContent=names[type]||'Последний сигнал'; eyebrow.textContent=type==='settings'?'ПАРАМЕТРЫ ИГРЫ':'ПОСЛЕДНИЙ СИГНАЛ';
    $('modal-footnote').textContent=type==='save'?'Слоты сохраняются в памяти этого браузера.':'Все данные хранятся локально в этом браузере.';
    if(type==='chapters') content.innerHTML=renderChapters();
    else if(type==='gallery') content.innerHTML=renderGallery();
    else if(type==='characters') content.innerHTML=renderCharacters();
    else if(type==='settings') content.innerHTML=renderSettings();
    else if(type==='save') content.innerHTML=renderSlots();
    else if(type==='history') content.innerHTML=renderHistory();
    else if(type==='newgame') content.innerHTML=renderNewGameConfirm();
    else if(type==='cg') content.innerHTML=renderCgViewer(currentCgId);
    layer.hidden=false;
    if(type==='settings') bindSettings();
  }
  function esc(str) { return String(str??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
  function renderChapters() {
    const unlocked=state?.unlockedChapter||loadJSON(STORAGE.auto,null)?.unlockedChapter||1;
    return `<div class="panel-grid">${CHAPTERS.map(ch=>`<button class="chapter-card" data-action="play-chapter" data-chapter="${ch.id}" ${ch.id>unlocked?'disabled':''}><span class="chapter-index">${String(ch.id).padStart(2,'0')}</span><span class="chapter-copy"><strong>${esc(ch.title)}</strong><small>${esc(ch.subtitle)}</small></span><span class="chapter-state">${ch.id<=unlocked?'↗':'⌑'}</span></button>`).join('')}</div><p class="choice-hint" style="margin-top:15px">Открытые главы можно переигрывать. Прогресс текущего прохождения сохраняется отдельно.</p>`;
  }
  function renderGallery() {
    return `<div class="gallery-grid">${CG_META.map(item=>{const unlocked=state?.unlockedCG?.includes(item.id);return `<button class="gallery-card ${unlocked?'':'locked'}" data-action="open-cg" data-cg="${item.id}"><div class="gallery-thumb"><img src="assets/cg/${item.file}" alt="${esc(item.title)}" loading="lazy"></div><strong>${esc(item.title)}</strong><small>${unlocked?esc(item.chapter):'Иллюстрация ещё не открыта'}</small></button>`;}).join('')}</div>`;
  }
  function renderCharacters() {
    return `<div class="profile-grid">${DATA.characters.map(ch=>`<article class="profile-card"><img src="assets/characters/${ch.portrait}" alt="${esc(ch.name)}"><div class="profile-copy"><h3>${esc(ch.name)}</h3><div class="role">${esc(ch.role)}</div><p>${esc(ch.description)}</p><blockquote>${esc(ch.quote)}</blockquote></div></article>`).join('')}</div>`;
  }
  function renderSettings() {
    return `<div class="settings-list">
      <label class="setting-row"><span><strong>Фоновая музыка</strong><small>Музыка плавно меняется между сценами.</small></span><input id="setting-music" type="checkbox" ${settings.music?'checked':''}></label>
      <label class="setting-row"><span><strong>Громкость музыки</strong><small>Настройка применяется сразу.</small></span><span><input id="setting-volume" type="range" min="0" max="100" value="${Math.round(settings.musicVolume*100)}"><span id="setting-volume-value" class="setting-value">${Math.round(settings.musicVolume*100)}%</span></span></label>
      <label class="setting-row"><span><strong>Размер текста</strong><small>Подстрой под экран и расстояние.</small></span><span><input id="setting-text" type="range" min="85" max="125" value="${settings.textSize}"><span id="setting-text-value" class="setting-value">${settings.textSize}%</span></span></label>
      <label class="setting-row"><span><strong>Авточтение</strong><small>Автоматически перелистывать страницы, останавливаясь перед выбором.</small></span><input id="setting-auto" type="checkbox" ${settings.autoRead?'checked':''}></label>
      <label class="setting-row"><span><strong>Уменьшить анимацию</strong><small>Сделать переходы и эффекты спокойнее.</small></span><input id="setting-motion" type="checkbox" ${settings.reduceMotion?'checked':''}></label>
      <div class="modal-actions"><button class="subtle-button" data-action="export-save">Экспортировать сохранение</button><button class="subtle-button" data-action="import-save">Импортировать сохранение</button><button class="danger-button" data-action="reset-progress">Сбросить весь прогресс</button></div>
      <input id="import-file" type="file" accept="application/json,.json" hidden>
    </div>`;
  }
  function bindSettings() {
    $('setting-music')?.addEventListener('change',e=>{
      settings.music=e.target.checked;saveSettings();
      if(!settings.music)stopMusic();else if(state?.endingId)playMusic(DATA.endings[state.endingId]?.music);else if(state)playMusic(currentScene()?.music);else playMusic('menu_theme');
    });
    $('setting-volume')?.addEventListener('input',e=>{
      settings.musicVolume=Number(e.target.value)/100;$('setting-volume-value').textContent=`${e.target.value}%`;saveSettings();if(audio)audio.volume=settings.musicVolume;
    });
    $('setting-text')?.addEventListener('input',e=>{
      settings.textSize=Number(e.target.value);$('setting-text-value').textContent=`${e.target.value}%`; $('dialog-text').style.fontSize=`calc(clamp(15px, 1.35vw, 19px) * ${settings.textSize/100})`;saveSettings();
    });
    $('setting-auto')?.addEventListener('change',e=>{
      settings.autoRead=e.target.checked;saveSettings();if(state){state.autoRead=settings.autoRead;if(state.autoRead)scheduleAutoAdvance();else clearAutoTimer();}
      $('auto-button').setAttribute('aria-pressed',String(settings.autoRead));
    });
    $('setting-motion')?.addEventListener('change',e=>{settings.reduceMotion=e.target.checked;saveSettings();document.body.classList.toggle('reduce-motion',settings.reduceMotion);});
  }
  function renderSlots() {
    const saved=slots();
    return `<div class="slot-list">${[0,1,2].map(i=>{const item=saved[i];return `<article class="slot-card"><div><strong>Слот ${i+1}${item?' · '+(item.endingId?'Финал':'Глава '+(item.unlockedChapter||1)):''}</strong><small>${item?`${item.endingId?'Завершённое прохождение':item.sceneId||'Сохранение'} · ${formatTime(item.playSeconds||0)}`:'Пустой слот'}</small></div><div class="slot-actions"><button class="subtle-button" data-action="save-slot" data-slot="${i}" ${!state?'disabled':''}>Сохранить</button><button class="subtle-button" data-action="load-slot" data-slot="${i}" ${!item?'disabled':''}>Загрузить</button></div></article>`;}).join('')}</div>`;
  }
  function renderHistory() {
    if(!state?.history?.length) return '<div class="empty-state">История пока пуста. Прочитанные реплики и сделанные выборы будут появляться здесь.</div>';
    return `<div class="history-list">${state.history.slice().reverse().map(entry=>`<article class="history-entry"><strong>${esc(entry.speaker)} · ${esc(entry.scene||'')}</strong><p>${esc(entry.text)}</p></article>`).join('')}</div>`;
  }
  function renderNewGameConfirm() {
    return `<div class="empty-state"><strong style="color:#edf2ee">Начать историю заново?</strong><br>Текущее автосохранение будет заменено новым прохождением. Слоты ручных сохранений останутся нетронутыми.<div class="modal-actions" style="justify-content:center"><button class="advance-button" data-action="confirm-new">Начать новую игру →</button><button class="subtle-button" data-action="close-modal">Вернуться</button></div></div>`;
  }
  function renderCgViewer(id) {
    const item=CG_BY_ID.get(id); if(!item)return '<div class="empty-state">Иллюстрация не найдена.</div>';
    if(!state?.unlockedCG?.includes(id))return '<div class="empty-state">Эта иллюстрация откроется по мере прохождения истории.</div>';
    return `<div class="cg-viewer"><img src="assets/cg/${item.file}" alt="${esc(item.title)}"><p>${esc(item.chapter)} · ${esc(item.description)}</p></div>`;
  }
  function openCg(id) { currentCgId=id;openModal('cg'); }
  function playChapter(chapter) {
    if(!state) { state=loadJSON(STORAGE.auto,null)||freshState(); }
    const ch=Number(chapter); if(ch>(state.unlockedChapter||1)){toast('Эта глава ещё не открыта.');return;}
    const snap=state.chapterSnapshots?.[ch];
    if(snap) {
      state.stats=clone(snap.stats);state.flags=clone(snap.flags);state.history=clone(snap.history);state.historyKeys=clone(snap.historyKeys);
      state.visitedScenes=clone(snap.visitedScenes);state.unlockedCG=clone(snap.unlockedCG);state.unlockedChapter=Math.max(ch,snap.unlockedChapter);
    }
    state.sceneId=DATA.chapterStarts[ch];state.pageIndex=0;state.endingId=null;
    closeModal();$('menu-screen').hidden=true;$('game-screen').hidden=false;
    goToScene(state.sceneId);
  }
  function saveSlot(index) {
    if(!state){toast('Сначала начните игру.');return;}
    const saved=slots();saved[index]=clone(state);saveJSON(STORAGE.slots,saved);toast(`Сохранено в слот ${index+1}.`);openModal('save');
  }
  function loadSlot(index) {
    const saved=slots(),data=saved[index];if(!data){toast('Этот слот пуст.');return;}
    state=data;state.lastTick=Date.now();closeModal();$('menu-screen').hidden=true;$('game-screen').hidden=false;
    if(state.endingId)playMusic(DATA.endings[state.endingId]?.music);else playMusic(currentScene()?.music);
    render();toast(`Слот ${index+1} загружен.`);
  }
  function exportSave() {
    if(!state){toast('Нет активного прохождения для экспорта.');return;}
    const blob=new Blob([JSON.stringify({format:'posledniy-signal-save',version:1,state},null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='posledniy-signal-save.json';a.click();URL.revokeObjectURL(url);toast('Файл сохранения подготовлен.');
  }
  function importSave() { $('import-file')?.click(); }
  function handleImport(file) {
    if(!file)return;const reader=new FileReader();reader.onload=()=>{
      try {const data=JSON.parse(reader.result);const candidate=data.state||data;if(!candidate||(!candidate.sceneId&&!candidate.endingId)||!candidate.stats)throw new Error('invalid');state=candidate;saveAuto();closeModal();$('menu-screen').hidden=true;$('game-screen').hidden=false;render();toast('Сохранение импортировано.');}
      catch(_){toast('Не удалось прочитать этот файл сохранения.');}
    };reader.readAsText(file);
  }
  function resetProgress() {
    if(!confirm('Удалить автосохранение, все три слота и открытые иллюстрации? Это действие нельзя отменить.'))return;
    localStorage.removeItem(STORAGE.auto);localStorage.removeItem(STORAGE.slots);state=null;closeModal();updateMenuContinue();toast('Прогресс удалён.');
  }
  function handleAction(action,target) {
    switch(action) {
      case 'new-game': confirmNewGame(); break;
      case 'confirm-new': closeModal();startNewGame();break;
      case 'continue': continueGame(); break;
      case 'chapters': openModal('chapters');break;
      case 'gallery': openModal('gallery');break;
      case 'characters': openModal('characters');break;
      case 'settings': openModal('settings');break;
      case 'home': showMenu();break;
      case 'close-modal': closeModal();break;
      case 'advance': advance();break;
      case 'skip': skipText();break;
      case 'auto': toggleAuto();break;
      case 'history': openModal('history');break;
      case 'save': openModal('save');break;
      case 'play-chapter': playChapter(target.dataset.chapter);break;
      case 'save-slot': saveSlot(Number(target.dataset.slot));break;
      case 'load-slot': loadSlot(Number(target.dataset.slot));break;
      case 'open-cg': openCg(target.dataset.cg);break;
      case 'export-save': exportSave();break;
      case 'import-save': importSave();break;
      case 'reset-progress': resetProgress();break;
    }
  }
  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-action]');if(!target)return;
    handleAction(target.dataset.action,target);
  });
  document.addEventListener('change',event=>{if(event.target.id==='import-file')handleImport(event.target.files?.[0]);});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&!$('modal-layer').hidden){closeModal();return;}
    if ($('game-screen').hidden || $('modal-layer').hidden === false) return;
    if(event.key==='Shift'){skipText();return;}
    if(event.key===' '||event.key==='Enter') {
      if(event.target.closest('button,input,textarea'))return;
      if(!$('advance-button').hidden)advance();
    }
  });
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden&&audio)audio.pause();else if(!document.hidden&&settings.music&&audio)audio.play().catch(()=>{});
  });
  setInterval(()=>{
    if(state&&!$('game-screen').hidden){state.playSeconds=(state.playSeconds||0)+1;$('playtime-label').textContent=formatTime(state.playSeconds);if(state.playSeconds%15===0)saveAuto();}
  },1000);
  const savedAtLaunch=loadJSON(STORAGE.auto,null);
  if (savedAtLaunch && savedAtLaunch.version===1) state=savedAtLaunch;
  document.body.classList.toggle('reduce-motion',!!settings.reduceMotion);
  $('dialog-text').style.fontSize=`calc(clamp(15px, 1.35vw, 19px) * ${settings.textSize/100})`;
  if(settings.music)playMusic('menu_theme');
  updateMenuContinue();
})();
