import { agent } from './veramo/setup.js';

// Resolved DID Document:
const resolvedDid = await agent.resolveDid({ didUrl: 'did:ethr:sepolia:0x0244044cc91d4ad84608dce0e74c3ddcbc7faccf85f83ed26ddd846b143ab7cff5' });
console.log('Resolved DID Document:', JSON.stringify(resolvedDid, null, 2));
