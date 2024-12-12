// Core interfaces
import {
    createAgent,
    IDIDManager,
    IResolver,
    IDataStore,
    IDataStoreORM,
    IKeyManager,
    ICredentialPlugin,
  } from '@veramo/core'
  
  // Core identity manager plugin
  import { DIDManager } from '@veramo/did-manager'
  
  // Ethr did identity provider
  import { EthrDIDProvider } from '@veramo/did-provider-ethr'
  
  // Core key manager plugin
  import { KeyManager } from '@veramo/key-manager'
  
  // Custom key management system for RN
  import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'
  
  // W3C Verifiable Credential plugin
  import { CredentialPlugin } from '@veramo/credential-w3c'
  
  // Custom resolvers
  import { DIDResolverPlugin } from '@veramo/did-resolver'
  import { Resolver } from 'did-resolver'
  import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
  import { getResolver as webDidResolver } from 'web-did-resolver'
  
  // Storage plugin using TypeOrm
  import { Entities, KeyStore, DIDStore, PrivateKeyStore, migrations } from '@veramo/data-store'
  
  // TypeORM is installed with `@veramo/data-store`
  import { DataSource } from 'typeorm'

  // Local sqlite database for demo purposes
const DATABASE_FILE = 'database.sqlite'

  // Project ID from infura https://www.infura.io
const INFURA_PROJECT_ID = '80d27038a04d4b8884462154afe08514'

  // Secret key for the KMS
const KMS_SECRET_KEY = 'c1d0cda1cbbaf54a402d0bb3442717ddf53f2a3a46f90baf1c7d469515212335'

const dbConnection = new DataSource({
    type: 'sqlite',
    database: DATABASE_FILE,
    synchronize: false,
    migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities,
  }).initialize()

  export const agent = createAgent<
  IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin
>({
  plugins: [
    new KeyManager({
      store: new KeyStore(dbConnection),
      kms: {
        local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
      },
    }),
    new DIDManager({
      store: new DIDStore(dbConnection),
      defaultProvider: 'did:ethr:sepolia',
      providers: {
        'did:ethr:sepolia': new EthrDIDProvider({
          defaultKms: 'local',
          network: 'sepolia',
          rpcUrl: 'https://sepolia.infura.io/v3/' + INFURA_PROJECT_ID,
        }),
      },
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
        ...webDidResolver(),
      }),
    }),
    new CredentialPlugin(),
  ],
})