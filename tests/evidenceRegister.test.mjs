import test from 'node:test';
import assert from 'node:assert/strict';
import {EvidenceRegister,validateEvidence,resistancePercent} from '../src/services/evidenceRegister.ts';
import {LocalStorageRepository} from '../src/services/storageService.ts';
class Storage{map=new Map();getItem(k){return this.map.get(k)??null;}setItem(k,v){this.map.set(k,v);}removeItem(k){this.map.delete(k);}}
// Synthetic fixture exists only in this automated test; it is never bundled as surveillance data.
const fixture={kind:'amr',organism:'Test organism',country:'Guatemala',title:'Synthetic fixture',sourceUrl:'https://example.com/test-only',publisher:'Test publisher',sourceDate:'2025-01-01',sourceLocator:'Table 1',population:'Synthetic isolates',summary:'Test only',drug:'Test drug',specimen:'Synthetic blood isolates',periodStart:'2024-01-01',periodEnd:'2024-12-31',standard:'Test method',standardVersion:'1',tested:10,resistant:2};
test('AMR validates aggregate denominators, dates, territory, method and source URLs',()=>{
  assert.equal(resistancePercent(validateEvidence(fixture)),20);
  for(const v of [{tested:0},{resistant:11},{resistant:-1},{tested:1.1},{resistant:null},{periodStart:'2025-12-01'},{sourceDate:'2025-02-30'},{sourceUrl:'http://example.com/a'},{sourceUrl:'https://user:pass@example.com/a'},{country:'Unknown'},{patientName:'Do not collect'}])assert.throws(()=>validateEvidence({...fixture,...v}));
});
test('imports deduplicate, begin pending and preserve other namespaces in one write',()=>{
  const storage=new Storage();storage.setItem('infectoatlas_user_settings_v1',JSON.stringify({theme:'existing',infectoAtlasLiveV1:{followedIds:['existing']}}));const repo=new EvidenceRegister(storage);
  assert.deepEqual(repo.add([fixture,fixture]),{added:1,duplicates:1});assert.equal(repo.read()[0].review,'pending');
  assert.equal(repo.add([fixture]).added,0);repo.review(repo.read()[0].id,'accepted','Test reviewer','Checked denominator');
  assert.equal(repo.read()[0].reviews.length,1);assert.equal(repo.read()[0].review,'accepted');
  const saved=JSON.parse(storage.getItem('infectoatlas_user_settings_v1'));assert.equal(saved.theme,'existing');assert.deepEqual(saved.infectoAtlasLiveV1.followedIds,['existing']);
  assert.throws(()=>repo.review(repo.read()[0].id,'accepted','','Missing reviewer'));
});
test('an invalid batch or storage quota failure leaves all existing data intact',()=>{
  const storage=new Storage(),repo=new EvidenceRegister(storage);repo.add([fixture]);const before=storage.getItem('infectoatlas_user_settings_v1');
  assert.throws(()=>repo.add([{...fixture,title:'second'}, {...fixture,resistant:100}]));assert.equal(storage.getItem('infectoatlas_user_settings_v1'),before);
  storage.setItem=()=>{throw new Error('quota');};assert.throws(()=>repo.add([{...fixture,title:'second'}]),/quota/);assert.equal(storage.getItem('infectoatlas_user_settings_v1'),before);
});
test('corrupt settings or inconsistent review history fail closed without overwriting',()=>{
  const storage=new Storage(),repo=new EvidenceRegister(storage);storage.setItem('infectoatlas_user_settings_v1','{broken');assert.throws(()=>repo.add([fixture]));assert.equal(storage.getItem('infectoatlas_user_settings_v1'),'{broken');
  storage.map.clear();repo.add([fixture]);const settings=JSON.parse(storage.getItem('infectoatlas_user_settings_v1'));settings.evidenceRegisterV1.records[0].review='accepted';storage.setItem('infectoatlas_user_settings_v1',JSON.stringify(settings));assert.throws(()=>repo.read(),/inconsistentes/);
});
test('treatment versions retain predecessor, country and decisions without altering microorganisms',()=>{
  const {drug,specimen,periodStart,periodEnd,standard,standardVersion,tested,resistant,...base}=fixture;
  const source={...base,kind:'treatment',version:'1'},storage=new Storage(),repo=new EvidenceRegister(storage);repo.add([source]);const original=repo.read()[0];repo.review(original.id,'accepted','Reviewer','For review only');
  repo.add([{...source,version:'2',supersedes:original.id}]);assert.equal(repo.read().length,2);assert.equal(repo.read()[1].supersedes,original.id);assert.equal(repo.read()[1].review,'pending');
  assert.throws(()=>repo.add([{...source,version:'3',country:'México',supersedes:original.id}]));assert.equal(storage.getItem('infectoatlas_microorganisms_v3'),null);
});
test('global backup includes the complete evidence and review history',async()=>{
  const storage=new Storage(),repo=new EvidenceRegister(storage);repo.add([fixture]);repo.review(repo.read()[0].id,'accepted','Reviewer','Verified fixture');
  const backup=JSON.parse(await new LocalStorageRepository(storage).exportBackupJSON());
  assert.equal(backup.data.userSettings.evidenceRegisterV1.records[0].reviews.length,1);
});
