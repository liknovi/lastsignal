from pathlib import Path
import math, random
ROOT=Path(__file__).resolve().parent.parent
BG=ROOT/'assets'/'backgrounds'; CH=ROOT/'assets'/'characters'; CG=ROOT/'assets'/'cg'
for d in (BG,CH,CG): d.mkdir(parents=True,exist_ok=True)

# Cinematic, original vector environments; all paths remain local for GitHub Pages.
def base(name, sky1, sky2, floor, elements, accent='#f0b477'):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="{name}">
<defs>
 <linearGradient id="sky" x2="0" y2="1"><stop stop-color="{sky1}"/><stop offset="1" stop-color="{sky2}"/></linearGradient>
 <linearGradient id="floor" x2="0" y2="1"><stop stop-color="{floor}"/><stop offset="1" stop-color="#070d14"/></linearGradient>
 <radialGradient id="glow"><stop stop-color="{accent}" stop-opacity=".5"/><stop offset="1" stop-color="{accent}" stop-opacity="0"/></radialGradient>
 <linearGradient id="shade" x2="0" y2="1"><stop stop-color="#07101a" stop-opacity=".04"/><stop offset="1" stop-color="#05090f" stop-opacity=".72"/></linearGradient>
 <pattern id="grain" width="120" height="120" patternUnits="userSpaceOnUse"><circle cx="10" cy="12" r="1" fill="#fff" opacity=".15"/><circle cx="80" cy="67" r="1" fill="#fff" opacity=".1"/><circle cx="45" cy="98" r=".8" fill="#fff" opacity=".12"/></pattern>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<ellipse cx="1190" cy="230" rx="360" ry="260" fill="url(#glow)"/>
{elements}
<rect y="650" width="1600" height="250" fill="url(#floor)"/>
<path d="M0 690 Q350 620 700 700 T1600 665" fill="none" stroke="#9cb3a7" stroke-opacity=".18" stroke-width="3"/>
<rect width="1600" height="900" fill="url(#shade)"/><rect width="1600" height="900" fill="url(#grain)"/>
<rect x="14" y="14" width="1572" height="872" rx="18" fill="none" stroke="#dce8e4" stroke-opacity=".08" stroke-width="2"/>
</svg>'''

# Shared skyline layers.
def skyline(seed=1, color='#1a2d38'):
    random.seed(seed); out=[]
    x=-20
    while x<1620:
        w=random.randint(75,170); h=random.randint(170,430); y=650-h
        out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{color}"/>')
        for wx in range(x+15,x+w-8,28):
            for wy in range(y+26,620,42):
                if random.random()>.52: out.append(f'<rect x="{wx}" y="{wy}" width="8" height="13" fill="#e8b77d" opacity=".28"/>')
        x+=w+random.randint(5,22)
    return ''.join(out)

scenes={}
scenes['title']=base('Последний сигнал — город после Тихого дня','#162739','#cf9b72','#25343b',
    skyline(7,'#172a37') + '''<circle cx="1210" cy="245" r="88" fill="#f0c58e" opacity=".8"/><path d="M0 620 Q320 510 620 650 T1200 600 L1600 560 V900 H0Z" fill="#111d26"/>
    <path d="M760 670 Q755 540 800 500 Q850 460 895 510 Q940 555 940 700Z" fill="#070d14"/><path d="M785 520 Q765 440 820 405 Q875 375 915 435 L934 560 Q900 610 780 590Z" fill="#080e15"/><path d="M794 470 Q790 400 850 385 Q917 390 922 470 Q885 435 830 455Z" fill="#05080d"/><path d="M830 900 L810 600 L925 600 L960 900Z" fill="#0b1520"/>''','#e9ad7e')
scenes['supermarket']=base('Заброшенный супермаркет','#182633','#78816f','#36433e',
    '''<path d="M110 655V170H1490V655" fill="#18262b" stroke="#b1a78c" stroke-width="10"/><path d="M110 250H1490M110 430H1490" stroke="#75806f" stroke-width="14" opacity=".6"/>
    <g fill="#34433b" stroke="#85917d" stroke-width="5"><path d="M160 280H650V380H160Z"/><path d="M930 280H1430V380H930Z"/><path d="M160 465H650V580H160Z"/><path d="M930 465H1430V580H930Z"/></g>
    <g fill="#c18c5c" opacity=".65"><rect x="205" y="295" width="60" height="70"/><rect x="292" y="300" width="56" height="65"/><rect x="1010" y="295" width="60" height="70"/><rect x="1100" y="295" width="50" height="70"/><rect x="1240" y="475" width="68" height="90"/></g>
    <path d="M820 130 L780 660 M850 130 L890 660" stroke="#b2a58a" stroke-opacity=".2" stroke-width="6"/><circle cx="820" cy="180" r="90" fill="#e6c48a" opacity=".08"/>''','#d8b37f')
scenes['city']=base('Город мёртвых','#1b2b3b','#9a9279','#293940',skyline(13,'#24363f')+'''<path d="M0 700 Q240 620 490 690 T980 665 T1600 700 V900 H0Z" fill="#18262c"/><path d="M130 760 L250 670 L390 760 M1180 730 L1320 640 L1450 730" stroke="#60715c" stroke-width="15" fill="none" opacity=".6"/><g stroke="#89917c" stroke-width="5" opacity=".35"><path d="M250 250 Q210 360 270 520M260 420 Q180 390 150 330M1360 190 Q1290 300 1340 460M1340 330 Q1450 300 1490 245" fill="none"/></g>''','#d5aa75')
scenes['safehouse']=base('Убежище в старой станции','#192b2b','#967a5b','#473d31',
    '''<path d="M0 170 L800 20 L1600 170 V900 H0Z" fill="#1b2d2a" stroke="#7d765e" stroke-width="12"/><path d="M105 215H700V630H105Z" fill="#35463e" stroke="#887d64" stroke-width="7"/><path d="M920 230H1490V635H920Z" fill="#4a4337" stroke="#988467" stroke-width="7"/>
    <rect x="220" y="280" width="250" height="235" fill="#111b20" stroke="#78816f" stroke-width="6"/><path d="M235 300H455M235 385H455M235 470H455" stroke="#d5a46c" stroke-width="7" opacity=".35"/>
    <circle cx="820" cy="620" r="230" fill="url(#glow)"/><path d="M690 650 Q720 560 810 565 Q900 565 945 650Z" fill="#131b1d"/><path d="M720 650 Q735 595 815 595 Q895 595 925 650" fill="none" stroke="#c38b55" stroke-width="9"/>''','#eab37a')
scenes['rooftop']=base('Крыша на закате','#293c50','#d6a076','#28353c',skyline(17,'#24313a')+'''<circle cx="1170" cy="200" r="92" fill="#f0c08b" opacity=".85"/><path d="M0 665H1600V900H0Z" fill="#1b292e"/><path d="M110 665V515H280V665M1320 665V475H1510V665" fill="#17232b" stroke="#75816e" stroke-width="8"/><path d="M420 665V615H1110V665" fill="#111b21"/><path d="M520 610 L620 510 L710 610" fill="none" stroke="#b19a7b" stroke-width="7" opacity=".45"/>''','#f0bd89')
scenes['laboratory']=base('Лаборатория Helix','#0e2532','#4e8587','#142833',
    '''<rect x="90" y="110" width="1420" height="570" rx="20" fill="#152c38" stroke="#8fc9c1" stroke-width="9"/><g fill="#1e4c55" stroke="#7ec1ba" stroke-width="6"><rect x="160" y="230" width="300" height="330"/><rect x="520" y="195" width="520" height="370"/><rect x="1100" y="230" width="330" height="330"/></g>
    <g stroke="#b5e0d5" stroke-width="7" opacity=".65"><path d="M190 310H430M190 385H430M190 460H430M560 280H1000M560 365H1000M560 450H1000"/></g>
    <g fill="#9de2d8" opacity=".4"><circle cx="310" cy="290" r="40"/><circle cx="1260" cy="315" r="50"/><circle cx="1260" cy="460" r="35"/></g>
    <path d="M800 0V110M800 680V900" stroke="#9fe0d5" stroke-opacity=".25" stroke-width="12"/>''','#82d7cc')
scenes['lazarus']=base('Объект Лазарь','#1c111f','#8b3947','#211b27',
    '''<path d="M0 90 L290 0 H1310 L1600 90 V900 H0Z" fill="#221d2a" stroke="#a64e56" stroke-width="16"/><path d="M360 900V200H1240V900" fill="#101c27" stroke="#b45459" stroke-width="12"/><circle cx="800" cy="465" r="255" fill="none" stroke="#bf5960" stroke-width="34" opacity=".85"/><circle cx="800" cy="465" r="170" fill="none" stroke="#e18b75" stroke-width="7" opacity=".55"/><circle cx="800" cy="465" r="90" fill="url(#glow)"/><path d="M120 0V900M1480 0V900" stroke="#e06a65" stroke-width="8" opacity=".35"/>''','#db6c6c')
scenes['bridge']=base('Мост на восток','#1c2934','#788c86','#263a3e',
    skyline(3,'#26373b')+'''<path d="M0 620 Q400 520 820 620 T1600 610V900H0Z" fill="#17272d"/><path d="M120 620 L260 300 L360 620 M1240 620 L1370 280 L1500 620" stroke="#83968a" stroke-width="18" fill="none"/><path d="M260 300 L1370 280" stroke="#87978d" stroke-width="12"/><path d="M260 320L480 610M420 315L620 610M600 305L790 610M820 300L970 610M1040 295L1170 610" stroke="#88998e" stroke-width="5" opacity=".55"/>''','#e2ad79')
scenes['photostudio']=base('Фотостудия с архивом экспедиции','#252b34','#7a7770','#222e36',
    '''<rect x="100" y="90" width="1400" height="590" fill="#252d34" stroke="#b8a48d" stroke-width="10"/><rect x="180" y="160" width="420" height="420" fill="#111b22" stroke="#887a68" stroke-width="8"/><rect x="220" y="200" width="340" height="340" fill="#51626a"/><path d="M240 500L350 360L420 430L500 290L545 500Z" fill="#283b43"/><g fill="#d7b28a" opacity=".55"><rect x="760" y="170" width="220" height="290"/><rect x="1010" y="220" width="220" height="250"/></g><path d="M720 610V300M720 300L650 210M720 300L790 210" stroke="#9ea9a5" stroke-width="12" fill="none"/><circle cx="720" cy="300" r="32" fill="#1a252b" stroke="#c9b18d" stroke-width="8"/>''','#d7b28a')
scenes['archive']=base('Архив Helix','#122432','#42616b','#15242d',
    '''<rect x="90" y="90" width="1420" height="600" fill="#152732" stroke="#6c989b" stroke-width="8"/><g fill="#1e3b48" stroke="#77a9a9" stroke-width="5"><rect x="160" y="165" width="340" height="450"/><rect x="600" y="165" width="340" height="450"/><rect x="1040" y="165" width="340" height="450"/></g><g stroke="#9bd1c5" stroke-width="5" opacity=".5"><path d="M190 230H465M190 310H465M190 390H465M190 470H465M630 230H905M630 310H905M630 390H905M630 470H905M1070 230H1345M1070 310H1345M1070 390H1345M1070 470H1345"/></g><g fill="#98dfd3" opacity=".35"><circle cx="330" cy="560" r="28"/><circle cx="770" cy="560" r="28"/><circle cx="1210" cy="560" r="28"/></g>''','#80cfc5')
scenes['medbay']=base('Медицинский блок','#1b2b34','#66827e','#22353a',
    '''<rect x="100" y="140" width="1400" height="540" fill="#20343a" stroke="#91b9ae" stroke-width="8"/><g fill="#c9d7cf" opacity=".18"><rect x="180" y="300" width="380" height="230"/><rect x="650" y="300" width="380" height="230"/><rect x="1120" y="300" width="260" height="230"/></g><g stroke="#c6ddd1" stroke-width="7" opacity=".55"><path d="M210 300V550M590 300V550M680 300V550M1060 300V550"/><path d="M290 430H470M380 340V520"/></g><circle cx="1280" cy="215" r="65" fill="#a6d5c9" opacity=".4"/>''','#9ecfc1')
scenes['elevator']=base('Лифт в нижний сектор','#1b1e2b','#69424b','#202834',
    '''<rect x="400" y="40" width="800" height="810" rx="28" fill="#1c2934" stroke="#bd6664" stroke-width="14"/><rect x="500" y="100" width="600" height="690" fill="#0d1822" stroke="#7f565d" stroke-width="8"/><path d="M800 120V780" stroke="#ad5b61" stroke-width="7"/><g fill="#d56f69"><circle cx="800" cy="210" r="22"/><circle cx="800" cy="330" r="12"/><circle cx="800" cy="450" r="12"/><circle cx="800" cy="570" r="12"/></g><path d="M0 670H1600" stroke="#ac6d67" stroke-width="10" opacity=".3"/>''','#e16f6a')
scenes['core']=base('Центральное ядро Лазаря','#190f1b','#a13f4b','#171823',
    '''<circle cx="800" cy="450" r="360" fill="none" stroke="#c94d57" stroke-width="42" opacity=".7"/><circle cx="800" cy="450" r="275" fill="none" stroke="#f08d78" stroke-width="12" opacity=".7"/><circle cx="800" cy="450" r="180" fill="url(#glow)"/><path d="M800 50V850M400 450H1200M515 165L1085 735M1085 165L515 735" stroke="#e16c68" stroke-width="8" opacity=".35"/><g fill="#26313c" stroke="#bf6562" stroke-width="7"><rect x="100" y="310" width="160" height="280"/><rect x="1340" y="310" width="160" height="280"/></g>''','#ee726a')
scenes['tunnel']=base('Подземный переход','#131e28','#384b52','#111a20',
    '''<path d="M80 900V230Q800 -140 1520 230V900Z" fill="#1b2a31" stroke="#73827b" stroke-width="14"/><path d="M260 900V340Q800 40 1340 340V900" fill="#0d1821" stroke="#647a78" stroke-width="8"/><path d="M450 900V440Q800 210 1150 440V900" fill="#172a32" stroke="#536d6d" stroke-width="6"/><g fill="#f0b779" opacity=".36"><circle cx="300" cy="330" r="36"/><circle cx="800" cy="240" r="40"/><circle cx="1300" cy="330" r="36"/></g>''','#d7a873')
scenes['serverroom']=base('Серверный зал','#101e2d','#244958','#111d29',
    '''<g fill="#172e3d" stroke="#68a9b2" stroke-width="7"><rect x="140" y="120" width="220" height="540"/><rect x="430" y="120" width="220" height="540"/><rect x="950" y="120" width="220" height="540"/><rect x="1240" y="120" width="220" height="540"/></g><g stroke="#8ce0d2" stroke-width="8" opacity=".5"><path d="M170 210H330M170 290H330M170 370H330M170 450H330M460 210H620M460 290H620M460 370H620M460 450H620M980 210H1140M980 290H1140M980 370H1140M980 450H1140M1270 210H1430M1270 290H1430M1270 370H1430M1270 450H1430"/></g><path d="M0 660H1600" stroke="#80c9c2" stroke-width="7" opacity=".2"/>''','#80d5ce')
scenes['balcony']=base('Технический балкон над Лазарем','#1d2937','#a56c69','#17242e',
    skyline(23,'#1b303a')+'''<circle cx="1200" cy="240" r="110" fill="#e5b18b" opacity=".6"/><path d="M0 620H1600V900H0Z" fill="#111d27"/><path d="M160 620V470H1440V620" fill="none" stroke="#84948b" stroke-width="14"/><path d="M260 620V530M500 620V530M740 620V530M980 620V530M1220 620V530" stroke="#84948b" stroke-width="9"/>''','#e8b88b')
scenes['gate']=base('Ворота лаборатории Helix','#162b39','#71837c','#1b2c31',
    '''<path d="M0 290H1600V900H0Z" fill="#263a3d"/><path d="M160 900V230H1440V900" fill="#142630" stroke="#91a59a" stroke-width="18"/><path d="M290 900V320H1310V900" fill="#0b1720" stroke="#82988d" stroke-width="10"/><path d="M440 900V420H1160V900" fill="#152d37" stroke="#7d9f9b" stroke-width="7"/><g stroke="#90b5ab" stroke-width="7" opacity=".5"><path d="M160 400H1440M160 600H1440"/><path d="M480 230V900M1120 230V900"/></g><circle cx="800" cy="220" r="90" fill="#9ad4c1" opacity=".15"/>''','#95cbbd')
scenes['subway']=base('Станция метро после катастрофы','#111d2b','#53686a','#192a31',
    '''<path d="M0 200Q800 -80 1600 200V700H0Z" fill="#1a2933" stroke="#607a7b" stroke-width="12"/><path d="M120 330H1480V630H120Z" fill="#0d1922"/><path d="M200 330V620M450 330V620M700 330V620M950 330V620M1200 330V620M1450 330V620" stroke="#7b9088" stroke-width="14"/><path d="M0 640H1600" stroke="#a1a797" stroke-width="8"/><g fill="#d8ad78" opacity=".3"><circle cx="300" cy="235" r="32"/><circle cx="800" cy="180" r="38"/><circle cx="1300" cy="235" r="32"/></g>''','#d5a976')

# Keep 6 starter names, replace their simple art with refined environments.
for name,svg in scenes.items():
    (BG/f'{name}.svg').write_text(svg,encoding='utf-8')
# Additional named aliases used by narrative.
aliases={'city_approach':'bridge','red_elevator':'elevator','lazarus_first_view':'lazarus','helix_gate':'gate','photo_studio':'photostudio','vita_protocol':'archive','core_door':'core'}
for alias,src in aliases.items(): (BG/f'{alias}.svg').write_text(scenes[src],encoding='utf-8')

# Original stylized character portraits, transparent for compositing over the stage.
def portrait(name, hair, skin, jacket, shirt, eye, extra=''):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 920" role="img" aria-label="{name}">
<defs><linearGradient id="coat" x2="0" y2="1"><stop stop-color="{jacket}"/><stop offset="1" stop-color="#0b141c"/></linearGradient><linearGradient id="face" x2=".8" y2="1"><stop stop-color="#f1d4c1"/><stop offset="1" stop-color="{skin}"/></linearGradient><linearGradient id="hair" x2=".8" y2="1"><stop stop-color="{hair}"/><stop offset=".55" stop-color="#090d13"/><stop offset="1" stop-color="{hair}"/></linearGradient><linearGradient id="shine" x2="1" y2="0"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
<ellipse cx="280" cy="895" rx="210" ry="22" fill="#000" opacity=".3"/>
<path d="M55 920 Q65 690 145 610 Q200 560 280 555 Q365 560 420 615 Q500 700 510 920Z" fill="url(#coat)" stroke="#70828a" stroke-opacity=".25" stroke-width="5"/>
<path d="M195 600L280 735L365 600L340 920H220Z" fill="{shirt}" opacity=".92"/>
<path d="M155 660L255 755L210 920H100Z M405 660L305 755L350 920H460Z" fill="#101a25" opacity=".55"/>
<path d="M175 315 Q125 165 205 90 Q285 5 390 100 Q455 165 405 340 L440 600 Q390 685 280 690 Q170 680 120 585Z" fill="url(#hair)"/>
<path d="M182 205 Q190 95 280 85 Q380 80 408 208 L398 460 Q365 535 280 542 Q190 530 160 450Z" fill="url(#face)"/>
<path d="M160 240 Q130 95 250 55 Q365 20 420 145 Q438 220 395 290 Q378 215 332 190 Q270 230 186 202Z" fill="url(#hair)"/>
<path d="M162 245 Q120 340 150 500 Q108 430 105 335 Q90 170 180 98Z M398 240 Q445 330 415 530 Q465 430 455 305 Q450 155 385 95Z" fill="{hair}"/>
<path d="M205 330 Q235 310 255 330 M307 330 Q335 310 355 330" fill="none" stroke="#382a2a" stroke-width="8" stroke-linecap="round"/>
<ellipse cx="233" cy="355" rx="13" ry="9" fill="{eye}"/><ellipse cx="328" cy="355" rx="13" ry="9" fill="{eye}"/><circle cx="236" cy="355" r="4" fill="#10151a"/><circle cx="331" cy="355" r="4" fill="#10151a"/>
<path d="M280 365L268 415L286 420" fill="none" stroke="#a8756b" stroke-width="5" stroke-linecap="round"/>
<path d="M248 462 Q280 477 312 460" fill="none" stroke="#8d5556" stroke-width="6" stroke-linecap="round"/>
<path d="M175 315 Q165 520 205 615 M390 300 Q400 490 365 610" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="12"/>
<path d="M130 690L230 770L280 735L335 770L430 690" fill="none" stroke="#8ba0a4" stroke-opacity=".28" stroke-width="7"/>
{extra}
<rect x="0" y="0" width="560" height="920" fill="url(#shine)" opacity=".32"/>
</svg>'''

(CH/'vita.svg').write_text(portrait('Вита','#090c13','#c99783','#253744','#d9d6ce','#71b78a', '''<path d="M146 600Q120 470 150 300Q170 80 250 62Q150 155 185 340Q175 490 210 620" fill="#05080d"/><path d="M405 300Q460 490 402 675Q445 520 385 290" fill="#05080d"/><path d="M215 800L350 800" stroke="#c5a28c" stroke-width="5" opacity=".5"/>'''),encoding='utf-8')
(CH/'konstantin.svg').write_text(portrait('Константин','#171b21','#b58a76','#26343d','#c3c8c4','#718f89', '''<path d="M155 250Q125 115 235 63Q355 35 420 150Q395 135 370 160Q310 115 230 170Q195 190 155 250Z" fill="#11161d"/><path d="M185 295Q215 220 270 210" fill="none" stroke="#79868a" stroke-width="5" opacity=".3"/><path d="M350 645L420 900" stroke="#75838a" stroke-width="8" opacity=".2"/>'''),encoding='utf-8')
(CH/'marta.svg').write_text(portrait('Марта','#4b2927','#c48f7d','#344d4e','#d4d0c8','#789c8e', '''<path d="M150 245Q135 120 250 65Q390 60 420 205L395 285Q360 210 335 170Q250 225 175 200Z" fill="#4a2826"/><path d="M160 520Q100 430 150 300Q125 505 205 570" fill="#4a2826"/><path d="M345 650L430 700" stroke="#d9e0dc" stroke-width="15" opacity=".25"/>'''),encoding='utf-8')
(CH/'lev.svg').write_text(portrait('Лев','#765139','#c99a76','#40504a','#c6bba7','#8a9f85', '''<path d="M150 240Q125 120 210 70Q250 38 310 70Q405 75 425 195L390 245Q360 180 320 160Q240 195 170 215Z" fill="#6d4b34"/><path d="M180 580L130 650L175 685M380 580L430 650L385 685" stroke="#b18259" stroke-width="12" fill="none" opacity=".55"/>'''),encoding='utf-8')
(CH/'elena.svg').write_text(portrait('Елена Воронцова','#4c3037','#c4a093','#d8ded7','#233642','#718f8e', '''<path d="M150 245Q130 105 250 55Q385 40 420 190L390 255Q365 150 315 145Q230 200 170 210Z" fill="#47303a"/><path d="M160 630L220 690L280 655L340 690L400 630" stroke="#b1c7c0" stroke-width="9" fill="none" opacity=".55"/><path d="M380 90Q430 160 410 285" stroke="#d1c4b3" stroke-width="10" fill="none" opacity=".7"/>'''),encoding='utf-8')
# Twelve cinematic CGs: illustrated moments, used as unlockable gallery art.
def cg_art(title, variant, colors):
    a,b,c=colors
    motifs={
      'meet':f'''<path d="M0 650L250 540L470 650L700 500L980 650L1280 520L1600 650V900H0Z" fill="#172734"/><circle cx="1280" cy="180" r="130" fill="{c}" opacity=".7"/><path d="M520 900Q500 640 620 530Q700 450 790 520Q900 620 900 900Z" fill="{a}"/><path d="M555 560Q530 380 670 320Q800 260 870 410L850 600Q730 660 555 560Z" fill="#080d13"/><path d="M900 900Q910 650 1040 555Q1140 500 1230 590Q1300 690 1320 900Z" fill="{b}"/><path d="M1020 570Q1000 430 1100 360Q1220 310 1280 440L1270 610Q1150 665 1020 570Z" fill="#0c1118"/>''',
      'radio':f'''<rect x="0" y="620" width="1600" height="280" fill="#101c25"/><path d="M160 640V220H1440V640" fill="#182b36" stroke="{c}" stroke-width="8"/><circle cx="800" cy="420" r="210" fill="none" stroke="{a}" stroke-width="10" opacity=".6"/><rect x="680" y="350" width="240" height="140" rx="16" fill="#0a141d" stroke="{b}" stroke-width="8"/><text x="800" y="440" text-anchor="middle" fill="{c}" font-size="64" font-family="sans-serif">91.7</text>''',
      'rooftop':f'''<circle cx="1270" cy="200" r="140" fill="{c}" opacity=".65"/><path d="M0 670L220 510L440 670L700 460L930 670L1180 500L1600 675V900H0Z" fill="#162630"/><path d="M520 900Q510 670 630 570Q740 470 840 570Q930 650 950 900Z" fill="{a}"/><path d="M580 620Q560 430 690 370Q800 330 875 455L850 650Q720 710 580 620Z" fill="#070d14"/><path d="M920 900Q900 680 1030 575Q1140 480 1240 590Q1320 680 1340 900Z" fill="{b}"/><path d="M1010 600Q1000 430 1120 385Q1240 350 1300 475L1285 660Q1150 700 1010 600Z" fill="#090f16"/>''',
      'core':f'''<circle cx="800" cy="430" r="340" fill="none" stroke="{c}" stroke-width="35" opacity=".7"/><circle cx="800" cy="430" r="220" fill="none" stroke="{a}" stroke-width="10"/><circle cx="800" cy="430" r="100" fill="{b}" opacity=".55"/><path d="M0 700H1600V900H0Z" fill="#101a25"/><path d="M640 900L680 610H920L960 900Z" fill="#172734"/>'''
    }
    art=motifs[variant]
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="{title}"><defs><linearGradient id="g" x2="0" y2="1"><stop stop-color="{a}"/><stop offset="1" stop-color="#090e15"/></linearGradient><radialGradient id="v"><stop stop-color="{c}" stop-opacity=".3"/><stop offset="1" stop-color="#05090f" stop-opacity=".8"/></radialGradient></defs><rect width="1600" height="900" fill="url(#g)"/>{art}<rect width="1600" height="900" fill="url(#v)"/><rect x="18" y="18" width="1564" height="864" rx="18" fill="none" stroke="#fff" stroke-opacity=".1" stroke-width="2"/></svg>'''

cg_list=[
('first_meet','meet',('#29404c','#3a4b48','#e3ab78'),'Первая встреча'),
('safehouse_arrival','radio',('#203743','#4c554c','#d9a16f'),'Убежище'),
('night_watch','rooftop',('#253a50','#4b5660','#edb58a'),'Ночное дежурство'),
('photo_studio','meet',('#384653','#53605d','#c79c77'),'Фотостудия'),
('archive_confession','radio',('#183342','#344c5c','#9bc9be'),'Признание'),
('vita_protocol','core',('#19313b','#507a7b','#9dd9cc'),'Протокол наблюдения'),
('lazarus_tenderness','meet',('#261c2c','#46545b','#e18d83'),'После эха'),
('balcony_future','rooftop',('#2c3c50','#53606b','#e8b58a'),'Пять минут тишины'),
('final_promise','meet',('#241f2c','#3d5360','#dc9b85'),'Обещание'),
('last_console','core',('#271922','#394554','#e26a69'),'Последний выбор'),
('new_dawn','rooftop',('#304d60','#4e6964','#f1bf8b'),'Новый рассвет'),
('price_sacrifice','core',('#231923','#4b303a','#db6d68'),'Цена спасения'),
('echo_core','core',('#18303b','#395665','#8dd5cc'),'Эхо человечества'),
]
for id,variant,colors,title in cg_list:
    (CG/f'{id}.svg').write_text(cg_art(title,variant,colors),encoding='utf-8')

print('Generated',len(scenes),'backgrounds,',len(list(CH.glob('*.svg'))),'portrait files,',len(cg_list),'CGs')
