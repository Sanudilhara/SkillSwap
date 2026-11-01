import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './app.js';

test('accounts, reciprocal matching, profiles, and authorized connection lifecycle', async t => {
  const app = await createApp({secret:'test-secret-only'});
  const server = app.listen(0,'127.0.0.1');
  await new Promise(resolve=>server.once('listening',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const base=`http://127.0.0.1:${server.address().port}/api`;
  async function request(path,method='GET',body,token){const response=await fetch(base+path,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},...(body?{body:JSON.stringify(body)}:{})});return {status:response.status,data:await response.json()}}
  assert.equal((await request('/students')).status,401);
  assert.equal((await request('/auth/register','POST',{name:'Test',email:'bad',password:'short'})).status,400);
  const alice=await request('/auth/register','POST',{name:'Alice Student',email:'alice@test.edu',password:'long-password',university:'Test University'});
  assert.equal(alice.status,201);assert.ok(alice.data.token);assert.equal(alice.data.user.password,undefined);assert.equal(alice.data.user.email,undefined);
  const token=alice.data.token;
  assert.equal((await request('/auth/register','POST',{name:'Alice',email:'alice@test.edu',password:'long-password'})).status,409);
  assert.equal((await request('/auth/login','POST',{email:'alice@test.edu',password:'incorrect'})).status,401);
  assert.equal((await request('/auth/login','POST',{email:'ALICE@test.edu',password:'long-password'})).status,200);
  const edited=await request('/me','PUT',{teach:['Python','Python'],learn:['UI/UX Design'],bio:'Ready to exchange.'},token);
  assert.deepEqual(edited.data.teach,['Python']);assert.equal(edited.data.bio,'Ready to exchange.');
  assert.equal((await request('/me','PUT',{teach:'not-an-array'},token)).status,400);
  const students=await request('/students','GET',null,token);
  assert.ok(students.data.find(s=>s.name==='Oliver Laine').mutual);
  assert.ok(!students.data.some(s=>s.id===alice.data.user.id));
  const bob=await request('/auth/register','POST',{name:'Bob Student',email:'bob@test.edu',password:'long-password'});
  const sent=await request('/connections','POST',{to:bob.data.user.id},token);
  assert.equal(sent.status,201);
  assert.equal((await request('/connections','POST',{to:bob.data.user.id},token)).status,409);
  assert.equal((await request('/connections','POST',{to:alice.data.user.id},token)).status,400);
  assert.equal((await request(`/connections/${sent.data.id}`,'PATCH',{status:'accepted'},token)).status,403);
  const incoming=await request('/connections','GET',null,bob.data.token);
  assert.equal(incoming.data[0].incoming,true);assert.equal(incoming.data[0].student.name,'Alice Student');
  assert.equal((await request(`/connections/${sent.data.id}`,'PATCH',{status:'accepted'},bob.data.token)).status,200);
  assert.equal((await request(`/connections/${sent.data.id}`,'PATCH',{status:'rejected'},bob.data.token)).status,400);
  assert.equal((await request('/connections','GET',null,token)).data[0].status,'accepted');
  const demo=await request('/auth/demo','POST');assert.equal(demo.status,200);assert.equal(demo.data.demo,true);
});
