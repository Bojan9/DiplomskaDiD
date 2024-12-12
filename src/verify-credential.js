import { agent } from './veramo/setup.js';
async function main() {
    const result = await agent.verifyCredential({
        credential: {
            credentialSubject: {
                you: 'Rock',
                id: 'did:web:example.com',
            },
            issuer: {
                id: 'did:ethr:sepolia:0x0244044cc91d4ad84608dce0e74c3ddcbc7faccf85f83ed26ddd846b143ab7cff5',
            },
            type: ['VerifiableCredential'],
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            issuanceDate: '2024-12-11T00:10:59.000Z',
            proof: {
                type: 'JwtProof2020',
                jwt: 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6IlJvY2sifX0sInN1YiI6ImRpZDp3ZWI6ZXhhbXBsZS5jb20iLCJuYmYiOjE3MzM4NzU4NTksImlzcyI6ImRpZDpldGhyOnNlcG9saWE6MHgwMjQ0MDQ0Y2M5MWQ0YWQ4NDYwOGRjZTBlNzRjM2RkY2JjN2ZhY2NmODVmODNlZDI2ZGRkODQ2YjE0M2FiN2NmZjUifQ.uj1drnkZr9ZpjHt6sP4vdp4mMEQ9VDSRoqY2caCygeVyvEPhS2GO_OXJklAF8GKUSTPml9pUI3odzf6RGnzK3w',
            },
        },
    });
    console.log(`Credential verified`, result.verified);
}
main().catch(console.log);
