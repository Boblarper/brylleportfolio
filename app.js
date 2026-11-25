const glyphs={B:['11110','10001','10001','11110','10001','10001','11110'],R:['11110','10001','10001','11110','10100','10010','10001'],Y:['10001','10001','01010','00100','00100','00100','00100'],L:['10000','10000','10000','10000','10000','10000','11111'],E:['11111','10000','10000','11110','10000','10000','11111'],O:['01110','10001','10001','10001','10001','10001','01110'],N:['10001','11001','11001','10101','10011','10011','10001'],W:['10001','10001','10001','10101','10101','10101','01010'],A:['01110','10001','10001','11111','10001','10001','10001'],D:['11110','10001','10001','10001','10001','10001','11110']};
document.querySelectorAll('.pixel').forEach(el=>{const word=el.dataset.word;let shapes='';[...word].forEach((c,i)=>glyphs[c].forEach((r,y)=>[...r].forEach((v,x)=>{if(v==='1')shapes+=`<rect x="${i*6+x}" y="${y}" width="1" height="1"/>`;})));el.innerHTML=`<svg viewBox="0 0 ${word.length*6-1} 7" role="img" aria-label="${word}" shape-rendering="crispEdges">${shapes}</svg>`;});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches;const motion=document.getElementById('motion');function motionLabel(){motion.textContent=paused?'Resume motion':'Pause motion';motion.setAttribute('aria-pressed',String(paused));}motionLabel();motion.addEventListener('click',()=>{paused=!paused;motionLabel();});
const canvas=document.getElementById('pond'),ctx=canvas.getContext('2d');let width,height;function resize(){width=canvas.clientWidth;height=canvas.clientHeight;canvas.width=width*devicePixelRatio;canvas.height=height*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);}resize();addEventListener('resize',resize);
let time=0,last=0;function koi(x,y,size,angle,phase){ctx.save();ctx.translate(x,y);ctx.rotate(angle);const s=size;for(let row=-17;row<=17;row++){let half;if(row<-9)half=(17+row)*.55;else if(row<7)half=4.8*Math.sqrt(Math.max(0,1-((row+2)/12)**2));else half=(row-6)*.53;for(let col=-6;col<=6;col++){let fin=(row>-5&&row<1&&Math.abs(col)<7-row*.15);if(Math.abs(col)>half&&!fin)continue;if(row>8&&Math.abs(col)<(row-8)*.15)continue;const wave=Math.sin(row*.26+phase)*Math.max(0,row+5)*.12;let pattern=Math.sin(col*1.7+row*.8)+Math.cos(row*.9);ctx.globalAlpha=fin&&Math.abs(col)>half?.35:.9;ctx.fillStyle=pattern>.45?'#68775b':pattern<-.65?'#dce0d1':'#a9b699';ctx.fillRect((col+wave)*s,row*s,s*.87,s*.87);if((row+col)%3===0){ctx.fillStyle='#14180f';ctx.fillRect((col+wave)*s+s*.3,row*s+s*.3,s*.15,s*.15);}}}ctx.globalAlpha=1;ctx.fillStyle='#14180f';ctx.fillRect(-2*s,-9*s,s,s);ctx.fillRect(2*s,-9*s,s,s);ctx.restore();}
function draw(now){if(!paused)time+=Math.min(now-last,40)*.0003;last=now;ctx.clearRect(0,0,width,height);const scroll=reduced.matches?0:Math.min(scrollY,800)*.08;const scale=width<750?3.7:5.8;koi(width*.57+Math.sin(time)*45,height*.50-scroll,scale,-.85+Math.sin(time*.7)*.15,time*2);koi(width*.79+Math.cos(time*.8)*25,height*.62-scroll*.65,scale*.68,2.1+Math.sin(time)*.18,time*2+3);koi(width*.32+Math.cos(time*.6)*25,height*.32-scroll*.8,scale*.46,.65+Math.cos(time)*.15,time*2+1);requestAnimationFrame(draw);}requestAnimationFrame(draw);
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.about-grid,.statement,.work-heading,.project,.skills-intro,.skill-columns,.goals,.contact h2').forEach(el=>{el.classList.add('reveal');revealObserver.observe(el);});
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn));});document.querySelectorAll('.project').forEach(p=>{p.hidden=btn.dataset.filter!=='all'&&p.dataset.category!==btn.dataset.filter;if(!p.hidden)p.classList.add('visible');});}));
document.getElementById('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('elmdeligero@gmail.com');document.getElementById('copy-status').textContent='Email copied.';}catch{document.getElementById('copy-status').textContent='elmdeligero@gmail.com';}});
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id));});},{rootMargin:'-25% 0px -60% 0px'});document.querySelectorAll('main>section').forEach(s=>sectionObserver.observe(s));
// Book spines open a focused, keyboard-accessible project reader.
const projectSources=[...document.querySelectorAll('.source-projects .project')];
const shelf=document.querySelector('.book-shelf');
const reader=document.getElementById('project-reader');
let selectedBook=0,bookOpener=null;
projectSources.forEach((project,index)=>{
 const button=document.createElement('button');button.className='book-spine';button.dataset.category=project.dataset.category;button.setAttribute('aria-haspopup','dialog');
 const name=document.createElement('span');name.className='book-name';name.textContent=project.querySelector('h3').textContent;
 const author=document.createElement('span');author.className='book-author';author.textContent='Brylle Elmo Deligero';
 const mark=document.createElement('span');mark.className='book-mark';mark.textContent='◒';mark.setAttribute('aria-hidden','true');
 button.append(name,author,mark);button.addEventListener('click',()=>{bookOpener=button;showBook(index);reader.showModal();document.body.classList.add('reading');document.getElementById('close-reader').focus();});shelf.append(button);
});
function visibleBooks(){return [...shelf.children].map((b,i)=>b.hidden?-1:i).filter(i=>i!==-1);}
function showBook(index){selectedBook=index;const source=projectSources[index];const title=source.querySelector('h3').textContent;
 document.getElementById('reader-title').textContent=title;document.querySelector('.reader-spine').textContent=title+' / Brylle Elmo Deligero';document.getElementById('reader-meta').textContent=source.querySelector('.project-meta').textContent;
 const body=document.querySelector('.reader-body');body.replaceChildren();body.append(source.querySelector('p').cloneNode(true));const details=source.querySelector('details');if(details){const clone=details.cloneNode(true);clone.open=true;body.append(clone);}
 const link=source.querySelector('.project-image')||source.querySelector('.text-link');if(link){const a=document.createElement('a');a.href=link.getAttribute('href');a.target='_blank';a.rel='noopener';a.className='reader-document';a.textContent='Open original work (PDF)';body.append(a);}
 const preview=document.querySelector('.reader-preview');preview.replaceChildren();const art=source.querySelector('img')||source.querySelector('.quote');if(art){const clone=art.cloneNode(true);if(clone.tagName==='IMG')clone.loading='eager';preview.append(clone);}
 const visible=visibleBooks(),position=visible.indexOf(index);document.getElementById('reader-position').textContent=(position+1)+' / '+visible.length;document.getElementById('previous-book').disabled=position===0;document.getElementById('next-book').disabled=position===visible.length-1;reader.scrollTop=0;
}
document.getElementById('close-reader').addEventListener('click',()=>reader.close());reader.addEventListener('close',()=>{document.body.classList.remove('reading');bookOpener?.focus();});reader.addEventListener('click',e=>{if(e.target===reader){const r=reader.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)reader.close();}});
for(const [id,step] of [['previous-book',-1],['next-book',1]])document.getElementById(id).addEventListener('click',()=>{const visible=visibleBooks();const index=visible[visible.indexOf(selectedBook)+step];if(index!==undefined)showBook(index);});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{[...shelf.children].forEach(book=>{book.hidden=button.dataset.filter!=='all'&&book.dataset.category!==button.dataset.filter;});}));
// Drop the bottom book first so the collection builds into a stack.
let stackHasEntered=false;
const fallingBooks=new Set();
function settleBooks(){
 shelf.classList.remove('stack-waiting');
 for(const animation of fallingBooks)animation.cancel();
 fallingBooks.clear();
}
function dropBookStack(){
 settleBooks();
 if(paused||reduced.matches)return;
 const books=[...shelf.children].filter(book=>!book.hidden).reverse();
 books.forEach((book,index)=>{
  const animation=book.animate([
   {translate:'0 -280px',rotate:index%2?'8deg':'-7deg',opacity:0,offset:0,easing:'cubic-bezier(.55,0,.9,.5)'},
   {opacity:1,offset:.18},
   {translate:'0 5px',rotate:'1deg',opacity:1,offset:.64,easing:'ease-out'},
   {translate:'0 -20px',rotate:'-1.2deg',opacity:1,offset:.79,easing:'ease-in'},
   {translate:'0 2px',rotate:'.4deg',opacity:1,offset:.91,easing:'ease-out'},
   {translate:'0 0',rotate:'0deg',opacity:1,offset:1}
  ],{duration:850,delay:index*190,fill:'backwards'});
  fallingBooks.add(animation);
  animation.onfinish=()=>fallingBooks.delete(animation);
 });
}
if(!paused&&!reduced.matches)shelf.classList.add('stack-waiting');
const stackObserver=new IntersectionObserver(entries=>{
 if(entries.some(entry=>entry.isIntersecting)){
  stackHasEntered=true;dropBookStack();stackObserver.disconnect();
 }
},{threshold:.2});
stackObserver.observe(shelf);
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 if(stackHasEntered)dropBookStack();
}));
shelf.addEventListener('focusin',settleBooks);
shelf.addEventListener('click',settleBooks);
motion.addEventListener('click',()=>{if(paused)settleBooks();});
reduced.addEventListener('change',()=>{if(reduced.matches)settleBooks();});
