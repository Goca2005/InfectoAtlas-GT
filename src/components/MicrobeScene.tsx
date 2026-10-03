import { useEffect, useRef, useState } from 'react';
import type { ModelProfile } from '../data/modelProfiles';
import type {ProteinTrace} from '../services/experimentalStructure';

type SceneActions = { reset(): void; rotate(direction: number): void; zoom(factor: number): void; parts(values: string[], cut: boolean): void; spin(value: boolean): void; dispose(): void };
// The pinned, MIT-licensed Three.js modules are served locally and fetched only when this view opens.
async function buildScene(host: HTMLDivElement, profile: ModelProfile, onLost: () => void, structure?:ProteinTrace): Promise<SceneActions> {
  const moduleUrl = '/vendor/three/three.module.min.js';
  const controlsUrl = '/vendor/three/OrbitControls.js';
  const T = await import(/* @vite-ignore */ moduleUrl);
  const { OrbitControls } = await import(/* @vite-ignore */ controlsUrl);
  const renderer = new T.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.setClearColor(0x020b1b); renderer.localClippingEnabled = true;
  renderer.domElement.setAttribute('aria-label', profile.title + (structure ? ': estructura experimental interactiva' : ': modelo educativo interactivo'));
  renderer.domElement.setAttribute('role', 'img');
  host.appendChild(renderer.domElement);
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(40, 1, .1, 100); camera.position.set(0, 2, 9);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.minDistance = 4; controls.maxDistance = 18;
  controls.enablePan = false;
  scene.add(new T.HemisphereLight(0xb9e8ff, 0x0e142c, 2.4));
  const light = new T.DirectionalLight(0xffffff, 3); light.position.set(3, 5, 5); scene.add(light);
  const rim = new T.DirectionalLight(0x3b82f6, 3); rim.position.set(-4, 0, -3); scene.add(rim);
  const object = new T.Group(); scene.add(object);
  const buckets: Record<string, any> = {surface: new T.Group(), genome: new T.Group(), appendages: new T.Group()};
  Object.values(buckets).forEach(group => object.add(group));
  const materials: any[] = []; const geometries: any[] = [];
  const mat = (color: number, surface = false) => {
    const m = new T.MeshStandardMaterial({ color, metalness: .13, roughness: .35, side: T.DoubleSide });
    m.userData.surface = surface; materials.push(m); return m;
  };
  const colors = [0x22d3ee, 0xfbbf24, 0xa78bfa];
  const sphere = (bucket: string, radius: number, position: number[], scale = [1,1,1], color?: number) => {
    const g = new T.SphereGeometry(radius, 32, 24); geometries.push(g);
    const mesh = new T.Mesh(g, mat(color ?? colors[['surface','genome','appendages'].indexOf(bucket)], bucket === 'surface'));
    mesh.position.set(...position); mesh.scale.set(...scale); buckets[bucket].add(mesh); return mesh;
  };
  const tube = (bucket: string, points: number[][], radius: number, color?: number) => {
    const curve = new T.CatmullRomCurve3(points.map(p => new T.Vector3(...p)));
    const g = new T.TubeGeometry(curve, 64, radius, 10, false); geometries.push(g);
    const mesh = new T.Mesh(g, mat(color ?? colors[['surface','genome','appendages'].indexOf(bucket)], bucket === 'surface')); buckets[bucket].add(mesh); return mesh;
  };
  const helix = (radius: number, length: number, offset=0) => Array.from({length:90},(_,i)=>{const t=i/89;return [Math.sin(t*Math.PI*10+offset)*radius,(t-.5)*length,Math.cos(t*Math.PI*10+offset)*radius];});
  if(structure){
    const all=structure.chains.flatMap(c=>c.segments.flat()),box=new T.Box3();
    all.forEach(a=>box.expandByPoint(new T.Vector3(a.x,a.y,a.z)));
    const center=box.getCenter(new T.Vector3()),size=box.getSize(new T.Vector3()),scale=4/Math.max(size.x,size.y,size.z,1);
    structure.chains.forEach((chain,i)=>{const bucket=['surface','genome','appendages'][i%3];for(const segment of chain.segments){if(segment.length<2)continue;const points=segment.map(a=>[(a.x-center.x)*scale,(a.y-center.y)*scale,(a.z-center.z)*scale]);const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));const geometry=new T.TubeGeometry(curve,Math.max(8,points.length*2),.012,5,false);geometries.push(geometry);buckets[bucket].add(new T.Mesh(geometry,mat(colors[i%3],false)));}});
  }else switch (profile.kind) {
    case 'cocci': {
      const positions=[[-.65,.4,0],[.2,.65,.2],[.85,.1,-.25],[-.4,-.55,.4],[.5,-.65,.15],[-.9,-.05,-.6]];
      for(const p of positions){sphere('surface',.5,p);sphere('genome',.16,p);}
      sphere('appendages',.48,[.1,.05,.85],[1,1,1],0xa78bfa);break;
    }
    case 'bacteria': {
      const g = new T.CapsuleGeometry(.8, 2, 10, 32); geometries.push(g);
      buckets.surface.add(new T.Mesh(g,mat(colors[0],true))); tube('genome',helix(.35,1.8),.035);
      for(let i=0;i<16;i++) {const a=i*Math.PI/4; const y=(i%4-1.5)*.55; tube('appendages',[[Math.cos(a)*.8,y,Math.sin(a)*.8],[Math.cos(a)*1.22,y+.15,Math.sin(a)*1.22]],.025);}
      tube('appendages',Array.from({length:45},(_,i)=>[Math.sin(i*.3)*.3,1.8+i*.025,Math.cos(i*.3)*.3]),.035); object.rotation.z=.9; break;
    }
    case 'virus': {
      sphere('surface',1.2,[0,0,0]); tube('genome',helix(.5,1.5),.045);
      for(let i=0;i<52;i++){const y=1-(i+.5)*2/52; const a=i*Math.PI*(3-Math.sqrt(5)); const v=new T.Vector3(Math.cos(a)*Math.sqrt(1-y*y),y,Math.sin(a)*Math.sqrt(1-y*y)); const c=new T.CylinderGeometry(.045,.045,.3,8); geometries.push(c); const m=new T.Mesh(c,mat(colors[2])); m.position.copy(v.clone().multiplyScalar(1.32)); m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),v); buckets.appendages.add(m); sphere('appendages',.09,v.clone().multiplyScalar(1.51).toArray());} break;
    }
    case 'yeast': sphere('surface',1.25,[0,0,0],[1,1.15,1]); sphere('genome',.42,[-.25,.15,0],[1,1,1],0xc084fc); sphere('appendages',.65,[1.15,.95,0],[1,1.15,1],0x34d399); break;
    case 'protozoan': {
      const outer=sphere('surface',1.25,[0,0,0],[1.25,.8,.65],0x34d399);
      const pos=outer.geometry.attributes.position; const v=new T.Vector3();
      for(let i=0;i<pos.count;i++){v.fromBufferAttribute(pos,i); const wave=1+.13*Math.sin(v.x*5)*Math.cos(v.y*4); pos.setXYZ(i,v.x*wave,v.y*wave,v.z*wave);} outer.geometry.computeVertexNormals();
      sphere('genome',.35,[-.25,.05,0],[1,1,1],0xa78bfa);
      for(let i=0;i<5;i++) sphere('appendages',.13,[Math.cos(i*1.8)*.8,Math.sin(i*1.8)*.45,.25]); break;
    }
    case 'nematode': {
      const points=Array.from({length:60},(_,i)=>{const t=i/59;return [Math.sin(t*Math.PI*1.6)*.8,(t-.5)*4,.12*Math.cos(t*8)];}); const body=tube('surface',points,.16,0x2dd4bf);
      const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));const vertices=body.geometry.attributes.position;
      for(let ring=0;ring<=64;ring++){const center=curve.getPointAt(ring/64),factor=.15+.85*Math.pow(Math.sin(Math.PI*ring/64),.35);for(let side=0;side<=10;side++){const index=ring*11+side;const point=new T.Vector3().fromBufferAttribute(vertices,index).sub(center).multiplyScalar(factor).add(center);vertices.setXYZ(index,point.x,point.y,point.z);}}body.geometry.computeVertexNormals();tube('genome',points,.035);
      sphere('appendages',.1,points[0]); sphere('appendages',.1,points.at(-1)!); object.rotation.z=.45; break;
    }
    case 'cestode': {
      for(let i=0;i<14;i++){const g=new T.BoxGeometry(.38+i*.026,.23,.12);geometries.push(g);const m=new T.Mesh(g,mat(colors[0],true));m.position.set(Math.sin(i*.17)*.45,1.35-i*.26,0);buckets.surface.add(m);}
      tube('genome',[[0,1.35,0],[0,1.8,0]],.05); sphere('appendages',.25,[0,2,0]);
      for(let i=0;i<4;i++) sphere('appendages',.1,[Math.cos(i*Math.PI/2)*.22,2+Math.sin(i*Math.PI/2)*.22,.1],[1,1,.4],0xfbbf24); break;
    }
    case 'fluke': sphere('surface',1.3,[0,0,0],[.7,1.4,.16],0x34d399); sphere('genome',.7,[0,-.15,0],[.7,1,.13]); sphere('appendages',.15,[0,1.3,.23],[1,1,.4]); sphere('appendages',.18,[0,.85,.23],[1,1,.4]); break;
    case 'mite': case 'louse': {
      const mite=profile.kind==='mite';sphere('surface',1,[0,0,0],mite?[1,.85,.5]:[.65,1,.35]);
      if(!mite){sphere('genome',.45,[0,1,0],[1,.8,.7],0x38bdf8);sphere('genome',.35,[0,1.5,0],[1,1,.7],0x38bdf8);}else sphere('genome',.3,[0,0,0],[1,1,1]);
      for(let side of [-1,1])for(let i=0;i<(mite?4:3);i++){const y=mite?(.7-i*.45):(.8-i*.4);tube('appendages',[[side*.6,y,0],[side*1.12,y+.12,.1],[side*1.42,y-.35,.15]],.055);} break;
    }
  }
  const plane = new T.Plane(new T.Vector3(-1,0,0), 0);
  let spinning=false, visible=true, disposed=false, frame=0, last=0;
  const resize = new ResizeObserver(()=>{if(disposed)return;const width=Math.max(host.clientWidth,1),height=Math.max(host.clientHeight,1);renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();}); resize.observe(host);
  const intersect = new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);}); intersect.observe(host);
  const lost = () => {onLost();}; renderer.domElement.addEventListener('webglcontextlost',lost);
  const draw=(time:number)=>{if(disposed)return;frame=requestAnimationFrame(draw);if(!visible||document.hidden){last=time;return;}if(spinning)object.rotation.y+=Math.min((time-last)/1000,.05)*.28;last=time;controls.update();renderer.render(scene,camera);};frame=requestAnimationFrame(draw);
  return {
    reset(){object.rotation.y=0;controls.reset();},rotate(direction){object.rotation.y+=direction*.25;},zoom(factor){camera.position.multiplyScalar(factor);const length=camera.position.length();camera.position.multiplyScalar(Math.max(4,Math.min(18,length))/length);controls.update();},
    parts(values,cut){for(const [key,group] of Object.entries(buckets))group.visible=values.includes(key);for(const m of materials){m.clippingPlanes=m.userData.surface&&cut?[plane]:[];m.needsUpdate=true;}},spin(value){spinning=value;},
    dispose(){disposed=true;cancelAnimationFrame(frame);resize.disconnect();intersect.disconnect();controls.dispose();renderer.domElement.removeEventListener('webglcontextlost',lost);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();}
  };
}
export default function MicrobeScene({profile,structure}:{profile:ModelProfile;structure?:ProteinTrace}) {
  const host=useRef<HTMLDivElement>(null), actions=useRef<SceneActions|null>(null);
  const [error,setError]=useState(''),[ready,setReady]=useState(false),[spin,setSpin]=useState(false),[cut,setCut]=useState(false),[parts,setParts]=useState(['surface','genome','appendages']);
  useEffect(()=>{let cancelled=false;setReady(false);setError('');setSpin(false);setCut(false);setParts(['surface','genome','appendages']);
    if(host.current)buildScene(host.current,profile,()=>setError('Se perdió la conexión con el visor gráfico. Cierra y vuelve a abrir el modelo.'),structure).then(scene=>{if(cancelled){scene.dispose();return;}actions.current=scene;setReady(true);}).catch(()=>{if(!cancelled)setError('El visor requiere WebGL2. La descripción y las fuentes siguen disponibles.');});
    return()=>{cancelled=true;actions.current?.dispose();actions.current=null;};
  },[profile,structure]);
  useEffect(()=>actions.current?.parts(parts,cut),[parts,cut,ready]);
  useEffect(()=>actions.current?.spin(spin),[spin,ready]);
  const button='rounded-lg border border-sky-800 bg-slate-900 px-3 py-2 text-sm disabled:opacity-40 hover:bg-sky-950';
  return <section className="rounded-2xl border border-sky-900 bg-slate-950 text-slate-100 overflow-hidden">
    <div className="p-5 space-y-2"><p className="text-xs uppercase tracking-widest text-sky-300">{structure?'Estructura experimental · traza proteica':'Laboratorio 3D · Three.js'}</p><h3 className="text-xl font-bold">{profile.title}</h3><p className="text-sm text-slate-300">{profile.scope}</p><p className="text-xs text-slate-400">{structure?'Coordenadas experimentales de referencia. Los colores distinguen cadenas; no representan el color físico de la proteína.':'Modelo educativo de InfectoAtlas GT. No es una imagen diagnóstica. Colores y proporciones no equivalen a una muestra real.'}</p></div>
    <div className="relative"><div ref={host} className="h-80 sm:h-96 w-full" />{!ready&&!error&&<p role="status" className="absolute inset-0 flex items-center justify-center">Cargando visor…</p>}{error&&<p role="alert" className="absolute inset-0 bg-slate-950/95 p-6 flex items-center justify-center">{error}</p>}</div>
    <div className="p-5 space-y-4"><p className="text-xs text-slate-400">Arrastra para girar y usa la rueda o los botones para acercar. En pantalla táctil, usa dos dedos para el zoom.</p><div className="flex flex-wrap gap-2">
      <button className={button} disabled={!ready} onClick={()=>actions.current?.rotate(-1)}>Girar izquierda</button><button className={button} disabled={!ready} onClick={()=>actions.current?.rotate(1)}>Girar derecha</button>
      <button className={button} disabled={!ready} onClick={()=>actions.current?.zoom(.85)}>Acercar</button><button className={button} disabled={!ready} onClick={()=>actions.current?.zoom(1.15)}>Alejar</button>
      <button className={button} disabled={!ready} onClick={()=>actions.current?.reset()}>Restablecer vista</button><button className={button} disabled={!ready} aria-pressed={spin} onClick={()=>setSpin(!spin)}>{spin?'Pausar giro':'Activar giro'}</button>
    </div><div className="flex flex-wrap gap-4 text-sm">{profile.parts.map(([id,label,color])=><label key={id} className="flex items-center gap-2"><input type="checkbox" checked={parts.includes(id)} onChange={()=>setParts(parts.includes(id)?parts.filter(p=>p!==id):[...parts,id])}/><span aria-hidden style={{backgroundColor:color}} className="w-2 h-2 rounded-full"/>{label}</label>)}<label hidden={!!structure} className="flex items-center gap-2"><input type="checkbox" checked={cut} onChange={()=>setCut(!cut)}/>Corte didáctico de la superficie</label></div>
    <a className="text-sky-300 text-sm underline" href={profile.sourceUrl} target="_blank" rel="noopener noreferrer">Fuente sobre la biología representada</a></div>
  </section>;
}
