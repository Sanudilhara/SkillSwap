import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { randomBytes, randomUUID } from 'node:crypto';
import { seedStudents } from './seed.js';

const userSchema = new mongoose.Schema({ id:{type:String,unique:true}, email:{type:String,unique:true}, password:String, name:String, university:String, field:String, bio:String, teach:[String], learn:[String], category:String, color:String, initials:String, avatar:Number, picture:String });
const requestSchema = new mongoose.Schema({ id:{type:String,unique:true}, from:String, to:String, status:String, createdAt:String });
requestSchema.index({from:1,to:1},{unique:true});
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Connection = mongoose.models.Connection || mongoose.model('Connection', requestSchema);
export async function createApp({ mongoUri, secret = randomBytes(48).toString('hex') } = {}) {
  if (mongoUri) { await mongoose.connect(mongoUri); }
  const memory = !mongoUri;
  const users = new Map(); const requests = new Map();
  const allUsers = async () => memory ? [...users.values()] : User.find().lean();
  const getUser = async id => memory ? users.get(id) : User.findOne({id}).lean();
  const saveUser = async u => { if(memory) users.set(u.id,u); else await User.updateOne({id:u.id},{$set:u},{upsert:true}); return u; };
  const allRequests = async () => memory ? [...requests.values()] : Connection.find().lean();
  const saveRequest = async r => { if(memory) requests.set(r.id,r); else await Connection.updateOne({id:r.id},{$set:r},{upsert:true}); return r; };
  const clean = u => { if (!u) return null; const {password,email,_id,__v,...safe}=u; return safe; };
  if(memory) for(const student of seedStudents) await saveUser({...student,email:`${student.id}@example.test`});
  const app = express();
  app.use(cors({origin:process.env.CLIENT_ORIGIN || 'http://127.0.0.1:5173'}));
  app.use(express.json({limit:'1mb'}));
  app.get('/api/health', (req,res)=>res.json({status:'ok', mode:memory?'demo':'mongodb'}));
  const session = u => ({user:clean(u),token:jwt.sign({id:u.id},secret,{expiresIn:'7d'}),demo:memory});
  app.post('/api/auth/demo',async(req,res)=>{
    if(!memory) return res.status(404).json({error:'Demo mode is unavailable.'});
    const u={id:randomUUID(),email:`${randomUUID()}@demo.test`,name:'Alex Morgan',university:'University of Helsinki',field:'Computer Science',bio:'Curious about design, languages, and everything in between. Happy to share what I know!',teach:['Python','React'],learn:['UI/UX Design','Finnish'],color:'sage',initials:'AM'};
    await saveUser(u); res.json(session(u));
  });
  app.post('/api/auth/register',async(req,res,next)=>{try {
    const {name,email,password,university}=req.body;
    if(typeof name!=='string'||!name.trim()||name.length>80||typeof email!=='string'||!/^\S+@\S+\.\S+$/.test(email)||typeof password!=='string'||password.length<8||password.length>128) return res.status(400).json({error:'Enter a name, valid email, and a password of 8–128 characters.'});
    if((await allUsers()).some(u=>u.email===email.trim().toLowerCase())) return res.status(409).json({error:'This email is already registered.'});
    const u={id:randomUUID(),name:name.trim(),email:email.trim().toLowerCase(),password:await bcrypt.hash(password,12),university:typeof university==='string'?university.slice(0,120):'',bio:'',field:'',teach:[],learn:[],color:'sage',initials:name.trim().split(/\s+/).map(n=>n[0]).join('').slice(0,2)};
    await saveUser(u);res.status(201).json(session(u));
  }catch(e){next(e)}});
  app.post('/api/auth/login',async(req,res)=>{
    const {email,password}=req.body;
    const u=(await allUsers()).find(u=>u.email===String(email).trim().toLowerCase());
    if(!u?.password||typeof password!=='string'||!await bcrypt.compare(password,u.password)) return res.status(401).json({error:'Email or password is incorrect.'});
    res.json(session(u));
  });
  app.use('/api',async(req,res,next)=>{try{ const token=req.headers.authorization?.replace(/^Bearer /,''); const payload=jwt.verify(token||'',secret);req.user=await getUser(payload.id); if(!req.user) throw Error();next();}catch{res.status(401).json({error:'Please sign in to continue.'})}});
  app.get('/api/me',(req,res)=>res.json(clean(req.user)));
  app.put('/api/me',async(req,res)=>{
    const allowed={}; for(const key of ['name','university','field','bio','picture']) if(req.body[key]!==undefined){if(typeof req.body[key]!=='string'||req.body[key].length>(key==='bio'?1000:key==='picture'?500:120)) return res.status(400).json({error:'Please shorten your profile details.'});allowed[key]=req.body[key].trim();}
    if(allowed.name==='') return res.status(400).json({error:'Your name cannot be empty.'});
    if(allowed.picture && !/^https:\/\//.test(allowed.picture)) return res.status(400).json({error:'Use an HTTPS image URL.'});
    for(const key of ['teach','learn']) if(req.body[key]!==undefined){if(!Array.isArray(req.body[key])||req.body[key].length>15||req.body[key].some(s=>typeof s!=='string'||!s.trim()||s.length>40))return res.status(400).json({error:'Add up to 15 skills, each under 40 characters.'});allowed[key]=[...new Set(req.body[key].map(s=>s.trim()))];}
    res.json(clean(await saveUser({...req.user,...allowed})));
  });
  app.get('/api/students',async(req,res)=>{
    const norm=s=>s.toLowerCase();const matches=(a,b)=>a.filter(s=>b.some(t=>norm(t)===norm(s)));
    const list=(await allUsers()).filter(u=>u.id!==req.user.id).map(u=>({...clean(u),canLearn:matches(u.teach||[],req.user.learn||[]),canTeach:matches(u.learn||[],req.user.teach||[])})).map(u=>({...u,matchScore:u.canLearn.length+u.canTeach.length,mutual:u.canLearn.length>0&&u.canTeach.length>0}));
    res.json(list.sort((a,b)=>Number(b.mutual)-Number(a.mutual)||b.matchScore-a.matchScore));
  });
  app.get('/api/connections',async(req,res)=>{const list=await allRequests();res.json(await Promise.all(list.filter(r=>r.from===req.user.id||r.to===req.user.id).map(async r=>({...r,student:clean(await getUser(r.from===req.user.id?r.to:r.from)),incoming:r.to===req.user.id}))));});
  app.post('/api/connections',async(req,res)=>{
    const to=req.body.to;if(to===req.user.id||!await getUser(to))return res.status(400).json({error:'Choose another student to connect with.'});
    if((await allRequests()).some(r=>(r.from===req.user.id&&r.to===to)||(r.from===to&&r.to===req.user.id)))return res.status(409).json({error:'A connection request already exists.'});
    res.status(201).json(await saveRequest({id:randomUUID(),from:req.user.id,to,status:'pending',createdAt:new Date().toISOString()}));
  });
  app.patch('/api/connections/:id',async(req,res)=>{
    const r=(await allRequests()).find(r=>r.id===req.params.id);
    if(!r||r.to!==req.user.id)return res.status(403).json({error:'Only the recipient can respond to this request.'});
    if(r.status!=='pending'||!['accepted','rejected'].includes(req.body.status))return res.status(400).json({error:'This request cannot be updated.'});
    res.json(await saveRequest({...r,status:req.body.status}));
  });
  app.use('/api',(req,res)=>res.status(404).json({error:'API endpoint not found.'}));
  app.use((err,req,res,next)=>{console.error(err.message);res.status(err.status||500).json({error:err.code===11000?'This record already exists.':'Unable to complete the request.'})});
  return app;
}
